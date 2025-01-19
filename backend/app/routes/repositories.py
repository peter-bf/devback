from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import Repository
from app.database import SessionLocal

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# GET all repositories without limits
@router.get("/repositories")
def get_repositories(db: Session = Depends(get_db)):
    repositories = db.query(Repository).all()
    if not repositories:
        raise HTTPException(status_code=404, detail="No repositories found.")
    return repositories

# GET a specific repository by ID
@router.get("/repositories/{repository_id}")
def get_repository(repository_id: int, db: Session = Depends(get_db)):
    repository = db.query(Repository).filter(Repository.repo_id == repository_id).first()
    if not repository:
        raise HTTPException(status_code=404, detail="Repository not found.")
    return repository

# POST a new repository
@router.post("/repositories")
def create_repository(repository: dict, db: Session = Depends(get_db)):
    new_repository = Repository(**repository)
    db.add(new_repository)
    db.commit()
    db.refresh(new_repository)
    return new_repository

# DELETE a repository by ID
@router.delete("/repositories/{repository_id}", status_code=204)
def delete_repository(repository_id: int, db: Session = Depends(get_db)):
    repository = db.query(Repository).filter(Repository.repo_id == repository_id).first()
    if not repository:
        raise HTTPException(status_code=404, detail="Repository not found.")
    db.delete(repository)
    db.commit()
