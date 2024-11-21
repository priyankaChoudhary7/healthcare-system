from pydantic import BaseModel

class UserCreate(BaseModel):
    full_name: str
    username: str
    password: str
    email: str
    contact_number: str = None
    role: str

class UserResponse(BaseModel):
    user_id: int
    full_name: str
    username: str
    email: str
    contact_number: str = None
    role: str

    class Config:
        from_attributes = True  # Enable ORM mode for SQLAlchemy models compatibility