from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db
from app.routes import developers, repositories

app = FastAPI()

# Initialize Database
init_db()

# Configure CORS
origins = [
    "http://localhost:3000",  # React frontend
    "http://127.0.0.1:3000",   # Alternative localhost access
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow only specific origins
    allow_credentials=True,  # Allow credentials (cookies, authentication)
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Root Endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the API"}

# Include Routers
app.include_router(developers.router, prefix="/api", tags=["Developers"])
app.include_router(repositories.router, prefix="/api", tags=["Repositories"])
