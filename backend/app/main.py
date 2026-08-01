from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.ai_analysis import router as ai_analysis_router
from app.api.upload import router as upload_router
from app.api.target import router as target_router
from app.api.train import router as train_router
from app.api.explain import router as explain_router
from app.api.failure_map import router as failure_map_router
from app.api.failure_regions import router as failure_regions_router
from app.api.visualizations import router as visualizations_router
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI(
    title="FailureMap API",
    description="An AI-powered platform for identifying machine learning failure regions.",
    version="0.6.1",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "Welcome to FailureMap API 🚀",
        "version": "0.6.1",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


app.include_router(
    upload_router,
    prefix="/api",
    tags=["Upload"],
)

app.include_router(
    target_router,
    prefix="/api",
    tags=["Target"],
)

app.include_router(
    train_router,
    prefix="/api",
    tags=["Training"],
)

app.include_router(
    explain_router,
    prefix="/api",
    tags=["Explainability"],
)

app.include_router(
    failure_map_router,
    prefix="/api",
    tags=["Failure Map"],
)

app.include_router(
    failure_regions_router,
    prefix="/api",
    tags=["Failure Regions"],
)

app.include_router(
    visualizations_router,
    prefix="/api",
    tags=["Visualizations"],
)

app.include_router(
    ai_analysis_router,
    prefix="/api",
    tags=["AI Analysis"],
)

OUTPUT_DIR = "outputs"

os.makedirs(
    OUTPUT_DIR,
    exist_ok=True,
)

app.mount(
    "/outputs",
    StaticFiles(
        directory=OUTPUT_DIR
    ),
    name="outputs",
)