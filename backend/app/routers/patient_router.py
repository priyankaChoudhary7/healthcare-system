from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
from app.dependencies.auth import get_current_user
from app.services.patient_service import PatientService
from app.schemas.patient import PatientCreate, PatientResponse

router = APIRouter()

# Create Patient
@router.post("/patients/", response_model=PatientResponse)
def create_patient(patient: PatientCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return PatientService.create_patient(db, patient.dict())

# Get All Patients
@router.get("/patients/", response_model=list[PatientResponse])
def get_patients(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return PatientService.get_patients(db, skip, limit)

# Get Patient by ID
@router.get("/patients/{id}", response_model=PatientResponse)
def get_patient(id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    patient = PatientService.get_patient_by_id(db, id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

# Update Patient
@router.put("/patients/{id}", response_model=PatientResponse)
def update_patient(id: int, patient: PatientCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    existing_patient = PatientService.get_patient_by_id(db, id)
    if not existing_patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return PatientService.update_patient(db, existing_patient, patient.dict())

# Delete Patient
@router.delete("/patients/{id}")
def delete_patient(id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    patient = PatientService.get_patient_by_id(db, id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    PatientService.delete_patient(db, patient)
    return {"detail": "Patient deleted successfully"}
