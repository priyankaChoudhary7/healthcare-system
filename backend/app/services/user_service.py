from sqlalchemy.orm import Session
from app.models.user import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserService:
    @staticmethod
    def create_user(db: Session, user_data: dict):
        hashed_password = pwd_context.hash(user_data['password'])
        db_user = User(
            full_name=user_data['full_name'],
            username=user_data['username'],
            password=hashed_password,
            email=user_data['email'],
            contact_number=user_data.get('contact_number'),
            role=user_data['role']
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def get_user_by_username(db: Session, username: str):
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def get_user_by_id(db: Session, user_id: int):
        return db.query(User).filter(User.user_id == user_id).first()

    @staticmethod
    def get_users(db: Session, skip: int = 0, limit: int = 10):
        return db.query(User).offset(skip).limit(limit).all()

    @staticmethod
    def update_user(db: Session, db_user: User, user_data: dict):
        for key, value in user_data.items():
            if key == "password":  # Hash the password before updating
                value = pwd_context.hash(value)
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def delete_user(db: Session, db_user: User):
        db.delete(db_user)
        db.commit()
