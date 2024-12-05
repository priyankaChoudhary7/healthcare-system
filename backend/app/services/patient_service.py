from sqlalchemy.orm import Session
from app.models.patient import Patient
from app.models.patient_history import PatientHistory
from app.dependencies.mongodb import mongodb
from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException


class PatientService:
    @staticmethod
    def create_patient(db: Session, patient_data: dict):
        db_patient = Patient(**patient_data)
        db.add(db_patient)
        db.commit()
        db.refresh(db_patient)
        return db_patient

    @staticmethod
    def get_patient_by_id(db: Session, patient_id: int):
        return db.query(Patient).filter(Patient.patient_id == patient_id).first()

    @staticmethod
    def get_patients(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Patient).offset(skip).limit(limit).all()

    @staticmethod
    def update_patient(db: Session, db_patient: Patient, patient_data: dict):
        for key, value in patient_data.items():
            setattr(db_patient, key, value)
        db.commit()
        db.refresh(db_patient)
        return db_patient

    @staticmethod
    def delete_patient(db: Session, db_patient: Patient):
        db.delete(db_patient)
        db.commit()

    @staticmethod
    def create_patient_history(db: Session, history_data: dict):
        # Extract MongoDB content
        print(history_data)
        report_obj = {
            "report_content": history_data.pop("report_content"),
            "report_title": history_data.pop("report_title"),
            # "report_file": history_data.pop("report_file"),
        }
        print(history_data)
        collection = mongodb.get_collection("patient_reports")
        report_obj["created_at"] = datetime.utcnow()

        # Save to MongoDB
        result = collection.insert_one(report_obj)
        report_id = str(result.inserted_id)

        # Add report_id to PostgreSQL history data
        history_data["report_id"] = report_id

        # Save to PostgreSQL
        db_history = PatientHistory(**history_data)
        db.add(db_history)
        db.commit()
        db.refresh(db_history)
        return db_history

    @staticmethod
    def get_patient_histories(db: Session, patient_id: int):
        return (
            db.query(PatientHistory)
            .filter(PatientHistory.patient_id == patient_id)
            .all()
        )

    @staticmethod
    def get_patient_history_by_id(db: Session, history_id: int):
        # Fetch from PostgreSQL
        db_history = (
            db.query(PatientHistory)
            .filter(PatientHistory.history_id == history_id)
            .first()
        )
        if not db_history:
            return None

        # Fetch report from MongoDB
        collection = mongodb.get_collection("patient_reports")
        report = collection.find_one({"_id": ObjectId(db_history.report_id)})

        # Combine and return
        return {
            "history_id": db_history.history_id,
            "patient_id": db_history.patient_id,
            "medical_history": db_history.medical_history,
            "diagnosis": db_history.diagnosis,
            "treatment": db_history.treatment,
            "recorded_by": db_history.recorded_by,
            "recorded_at": db_history.recorded_at,
            "report_id": db_history.report_id,
            "report_content": (
                {
                    "title": report["title"],
                    "content": report["content"],
                    "created_at": report["created_at"],
                }
                if report
                else None
            ),
        }

    @staticmethod
    def update_patient_history(
        db: Session, db_history: PatientHistory, history_data: dict
    ):
        for key, value in history_data.items():
            setattr(db_history, key, value)
        db.commit()
        db.refresh(db_history)
        return db_history

    @staticmethod
    def delete_patient_history(db: Session, history_id: int):
        # Fetch from PostgreSQL
        db_history = (
            db.query(PatientHistory)
            .filter(PatientHistory.history_id == history_id)
            .first()
        )
        if not db_history:
            raise HTTPException(status_code=404, detail="Patient history not found")

        # Delete from MongoDB
        collection = mongodb.get_collection("patient_reports")
        collection.delete_one({"_id": ObjectId(db_history.report_id)})

        # Delete from PostgreSQL
        db.delete(db_history)
        db.commit()
