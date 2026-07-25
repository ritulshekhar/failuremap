from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import (
    router as upload_router,
)

from app.api.target import (
    router as target_router,
)

from app.api.train import (
    router as train_router,
)

from app.api.explain import (
    router as explain_router,
)

app = FastAPI(
    title="FailureMap",
    description="AI-powered ML Model Failure Analysis Platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    upload_router,
    prefix="/api",
)

app.include_router(
    target_router,
    prefix="/api",
)

app.include_router(
    train_router,
    prefix="/api",
)

app.include_router(
    explain_router,
    prefix="/api",
)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "Welcome to FailureMap API 🚀",
        "version": "0.1.0",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "FailureMap Backend",
        "version": "0.1.0",
    }