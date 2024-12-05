import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth_router, user_router, patient_router, auth_router, patient_history_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router, prefix="/api", tags=["Auth"])
app.include_router(user_router.router, prefix="/api", tags=["Users"])
app.include_router(patient_router.router, prefix="/api", tags=["Patients"])
app.include_router(patient_history_router.router, prefix="/api", tags=["Patients History"])

@app.get("/")
async def root():
    return {"message": "Welcome to Health Care System API Server :)"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)