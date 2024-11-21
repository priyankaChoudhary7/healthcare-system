from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.patient_service import PatientService
from app.models.patient import Patient
from app.dependencies.database import get_db
from app.schemas.patient import PatientCreate, PatientResponse
from typing import List

router = APIRouter()

@router.post("/patients/", response_model=PatientResponse)
def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    return PatientService.create_patient(db=db, patient_data=patient.dict())

@router.get("/patients/", response_model=List[PatientResponse])
def read_patients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    patients = PatientService.get_patients(db, skip=skip, limit=limit)
    return patients

@router.get("/patients/{patient_id}", response_model=PatientResponse)
def read_patient(patient_id: int, db: Session = Depends(get_db)):
    db_patient = PatientService.get_patient_by_id(db, patient_id=patient_id)
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient