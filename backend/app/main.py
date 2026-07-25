from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import router as upload_router
from app.api.target import router as target_router
from app.api.train import router as train_router
from app.api.analysis import router as analysis_router


app = FastAPI(
    title="FailureMap",
    description="AI-powered ML model failure analysis platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(upload_router, prefix="/api")
app.include_router(target_router, prefix="/api")
app.include_router(train_router, prefix="/api")
app.include_router(analysis_router, prefix="/api")


@app.get("/")
def root():
    return {
        "application": "FailureMap",
        "version": "0.1.0",
        "status": "running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }