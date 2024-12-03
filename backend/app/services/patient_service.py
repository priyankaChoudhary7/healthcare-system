from sqlalchemy.orm import Session
from app.models.patient import Patient
from app.models.patient_history import PatientHistory

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
    def create_patient_history(db: Session, history_data: dict, report_id: str):
        history_data["report_id"] = report_id
        db_history = PatientHistory(**history_data)
        db.add(db_history)
        db.commit()
        db.refresh(db_history)
        return db_history

    @staticmethod
    def get_patient_history(db: Session, patient_id: int):
        return db.query(PatientHistory).filter(PatientHistory.patient_id == patient_id).all()