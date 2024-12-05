from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
from app.dependencies.auth import get_current_user
from app.services.user_service import UserService
from app.schemas.user import UserCreate, UserResponse

router = APIRouter()

# Create User
@router.post("/users/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    if UserService.get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    return UserService.create_user(db, user.dict())

# Get All Users
@router.get("/users/", response_model=list[UserResponse])
def get_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return UserService.get_users(db, skip, limit)

# Get User by ID
@router.get("/users/{id}", response_model=UserResponse)
def get_user(id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    user = UserService.get_user_by_id(db, id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Update User
@router.put("/users/{id}", response_model=UserResponse)
def update_user(id: int, user: UserCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    existing_user = UserService.get_user_by_id(db, id)
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserService.update_user(db, existing_user, user.dict())

# Delete User
@router.delete("/users/{id}")
def delete_user(id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    user = UserService.get_user_by_id(db, id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    UserService.delete_user(db, user)
    return {"detail": "User deleted successfully"}

# Get Current User Profile
@router.get("/users/me/", response_model=UserResponse)
def get_current_user_profile(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    user = UserService.get_user_by_username(db, current_user)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# @router.post("/login/", response_model=TokenResponse)
# def login(request: LoginRequest, db: Session = Depends(get_db)):
#     # Fetch the user by username
#     user = UserService.get_user_by_username(db, username=request.username)
    
#     # Validate user credentials
#     if not user or not pwd_context.verify(request.password, user.password):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
    
#     # Generate JWT token
#     access_token = create_access_token(
#         data={"sub": user.username}, expires_delta=timedelta(minutes=30)
#     )
    
#     # Return the access token along with user role
#     return {
#         "access_token": access_token,
#         "token_type": "bearer",
#         "user_role": user.role
#     }