from fastapi import FastAPI
import uvicorn
from app.routers import user_router, patient_router

app = FastAPI()

app.include_router(user_router.router, prefix="/api")
app.include_router(patient_router.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)