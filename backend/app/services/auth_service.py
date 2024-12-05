from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.services.user_service import UserService
from app.dependencies.auth import create_access_token
from passlib.context import CryptContext
from app.schemas.auth import LoginRequest, TokenResponse

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    @staticmethod
    def login(db: Session, request: LoginRequest) -> TokenResponse:
        # Fetch the user by username
        user = UserService.get_user_by_username(db, request.username)
        if not user or not pwd_context.verify(request.password, user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Generate a JWT token
        access_token = create_access_token(data={"sub": user.username})

        # Return the token and the user's role
        return TokenResponse(access_token=access_token, token_type="bearer", user_role=user.role)
