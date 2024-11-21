from pydantic import BaseModel

class PatientCreate(BaseModel):
    patient_name: str
    patient_email: str = None
    contact_number: str = None
    address: str = None
    date_of_birth: str = None
    added_by: int

class PatientResponse(PatientCreate):
    patient_id: int

    class Config:
        from_attributes = True  # Enable ORM mode for SQLAlchemy models compatibility