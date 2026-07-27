from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from configs.config import cfg
from src.api.routes import router
from src.database.database import create_tables
from src.auth.routes import router as auth_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield

app = FastAPI(
    title="Advanced AI Medical Intelligence Platform",
    version="1.0",
    lifespan=lifespan,
)

app.include_router(auth_router)
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.mount(
    "/gradcam",
    StaticFiles(directory=str(cfg.GRADCAM_DIR)),
    name="gradcam",
)


@app.get("/")
def root():

    return {
        "message": "Advanced AI Medical Intelligence Platform API",
        "status": "Running",
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }

from src.database.database import create_tables

