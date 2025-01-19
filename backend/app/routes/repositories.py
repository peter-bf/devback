from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Repository
from database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/repositories")
def get_developers(db: Session = Depends(get_db)):
    return db.query(Repository).all()

@router.get("/repositories/{repo_id}")
def get_repository(repo_id: int, db: Session = Depends(get_db)):
    repository = db.query(Repository).filter(Repository.id == repo_id).first()
    if not repository:
        raise HTTPException(status_code=404, detail="Repository not found")
    return repository

# Add a Repository to the Database
@router.post("/repositories")
def add_repo(repo_id: int, name: str, icon: str, desc: str, db: Session = Depends(get_db)):
    existing_repo = db.query(Repository).filter_by(repo_id=repo_id).first()
    if existing_repo:
        return {"message": "Repository already exists", "repository": existing_repo}

    new_repo = Repository(repo_id=repo_id, name=name, icon=icon, desc=desc)
    db.add(new_repo)
    db.commit()
    db.refresh(new_repo)

    return {"message": "Repository added successfully", "repository": new_repo}