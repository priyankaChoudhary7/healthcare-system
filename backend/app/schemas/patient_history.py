from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PatientHistoryCreate(BaseModel):
    patient_id: int
    medical_history: str
    diagnosis: str
    treatment: str
    recorded_by: int
    report_content: dict  # For storing the MongoDB report

class PatientHistoryResponse(BaseModel):
    history_id: int
    patient_id: int
    medical_history: str
    diagnosis: str
    treatment: str
    recorded_by: int
    recorded_at: datetime
    report_id: Optional[str] = None

    class Config:
        from_attributes = True
