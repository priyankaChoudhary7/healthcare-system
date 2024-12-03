from pydantic import BaseModel
from datetime import date

class PatientCreate(BaseModel):
    patient_name: str
    patient_email: str = None
    contact_number: str = None
    address: str = None
    date_of_birth: date = None
    added_by: int

class PatientResponse(PatientCreate):
    patient_id: int

    class Config:
        from_attributes = True  # Enable ORM mode for SQLAlchemy models compatibility
        json_encoders = {
            date: lambda v: v.isoformat()  # Serialize date as ISO 8601 string
        }