from fastapi import FastAPI
from app.database import init_db
from app.routes import developers, repositories

app = FastAPI()

# Initialize Database
init_db()

# Include Routers
app.include_router(developers.router, prefix="/api", tags=["Developers"])
app.include_router(repositories.router, prefix="/api", tags=["Repositories"])
