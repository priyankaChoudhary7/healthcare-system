from sqlalchemy.orm import Session
from app.models.patient import Patient

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
    
    