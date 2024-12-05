from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
from app.dependencies.mongodb import mongodb
from app.dependencies.auth import get_current_user
from app.services.patient_service import PatientService
from app.schemas.patient_history import PatientHistoryCreate, PatientHistoryResponse

router = APIRouter()

@router.post("/patients/history/", response_model=PatientHistoryResponse)
async def create_patient_history(
    history: PatientHistoryCreate,
    # file: UploadFile,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    # Save uploaded report file as binary
    # file_content = await file.read()
    history_data = history.dict()
    # history_data["report_file"] = file_content
    return PatientService.create_patient_history(db, history_data)

@router.get("/patients/history/report/{report_id}", response_model=dict)
def get_report(report_id: str):
    collection = mongodb.get_collection("patient_reports")
    report = collection.find_one({"_id": ObjectId(report_id)})

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    # Convert ObjectId and format the response
    report["_id"] = str(report["_id"])
    return report

@router.get("/patients/history/{id}")
def get_patient_history(
    id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)
):
    history = PatientService.get_patient_histories(db, id)
    if not history:
        raise HTTPException(status_code=404, detail="Patient history not found")
    return history


@router.delete("/patients/history/{id}")
def delete_patient_history(
    id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)
):
    PatientService.delete_patient_history(db, id)
    return {"detail": "Patient history deleted successfully"}

# Update Patient History
@router.put("/patients/history/{id}", response_model=PatientHistoryResponse)
def update_patient_history(id: int, history: PatientHistoryCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    existing_history = PatientService.get_patient_history_by_id(db, id)
    if not existing_history:
        raise HTTPException(status_code=404, detail="Patient history not found")
    return PatientService.update_patient_history(db, existing_history, history.dict())

# Delete Patient History
@router.delete("/patients/history/{id}")
def delete_patient_history(id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    history = PatientService.get_patient_history_by_id(db, id)
    if not history:
        raise HTTPException(status_code=404, detail="Patient history not found")
    PatientService.delete_patient_history(db, history)
    return {"detail": "Patient history deleted successfully"}
