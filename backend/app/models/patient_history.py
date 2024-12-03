from sqlalchemy import Column, Integer, String, ForeignKey, Text, TIMESTAMP
from sqlalchemy.orm import relationship
from app.dependencies.database import Base
from datetime import datetime

class PatientHistory(Base):
    __tablename__ = "patient_history"

    history_id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.patient_id"))
    medical_history = Column(Text, nullable=False)
    diagnosis = Column(Text, nullable=False)
    treatment = Column(Text, nullable=False)
    recorded_by = Column(Integer, ForeignKey("users.user_id"))
    recorded_at = Column(TIMESTAMP, default=datetime.utcnow)
    report_id = Column(String, nullable=True)  # MongoDB report ID
