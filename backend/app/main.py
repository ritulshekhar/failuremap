from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from app.api.upload import (
    router as upload_router
)

from app.api.target import (
    router as target_router
)

app = FastAPI(
    title="FailureMap"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    upload_router
)

app.include_router(
    target_router
)

from app.api.train import (
    router as train_router
)

app.include_router(
    train_router
)

@app.get("/")
def root():

    return {
        "status": "running"
    }