from fastapi import FastAPI
from .routes.main import main_router

app = FastAPI()

app.include_router(main_router)
