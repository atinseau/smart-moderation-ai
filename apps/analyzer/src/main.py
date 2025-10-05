import uvicorn
from services.config import Config
from core.app import app

if __name__ == "__main__":
    uvicorn.run(
        app,
        port=Config.port()
    )
