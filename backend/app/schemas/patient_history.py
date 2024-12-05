from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any

class PatientHistoryCreate(BaseModel):
    patient_id: int
    medical_history: str
    diagnosis: str
    treatment: str
    recorded_by: int
    report_title: str
    report_content: str

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
