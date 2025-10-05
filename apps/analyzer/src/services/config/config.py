import os

class Config:
    """General config for global variables."""

    @staticmethod
    def port() -> int:
        port_env = os.getenv("PORT")
        if port_env is None:
            raise ValueError("PORT environment variable is not set")
        return int(port_env)
