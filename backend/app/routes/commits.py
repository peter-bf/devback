from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from ..models import Commit, Developer, Repository
from ..database import SessionLocal

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

### ✅ 1. Get All Commits
@router.get("/commits")
def get_commits(db: Session = Depends(get_db)):
    return db.query(Commit).all()

### ✅ 2. Get a Specific Commit
@router.get("/commits/{commit_id}")
def get_commit(commit_id: int, db: Session = Depends(get_db)):
    commit = db.query(Commit).filter(Commit.id == commit_id).first()
    if not commit:
        raise HTTPException(status_code=404, detail="Commit not found")
    return commit

### ✅ 3. Get All Commits by a Developer
@router.get("/developers/{dev_id}/commits")
def get_commits_by_developer(dev_id: int, db: Session = Depends(get_db)):
    developer = db.query(Developer).filter(Developer.dev_id == dev_id).first()
    if not developer:
        raise HTTPException(status_code=404, detail="Developer not found")
    
    return db.query(Commit).filter(Commit.dev_id == dev_id).all()

### ✅ 4. Get All Commits in a Repository
@router.get("/repositories/{repo_id}/commits")
def get_commits_by_repository(repo_id: int, db: Session = Depends(get_db)):
    repository = db.query(Repository).filter(Repository.repo_id == repo_id).first()
    if not repository:
        raise HTTPException(status_code=404, detail="Repository not found")
    
    return db.query(Commit).filter(Commit.repo_id == repo_id).all()

### ✅ 5. Add a New Commit
@router.post("/commits")
def add_commit(dev_id: int, repo_id: int, desc: str, db: Session = Depends(get_db)):
    developer = db.query(Developer).filter(Developer.dev_id == dev_id).first()
    repository = db.query(Repository).filter(Repository.repo_id == repo_id).first()
    
    if not developer:
        raise HTTPException(status_code=404, detail="Developer not found")
    if not repository:
        raise HTTPException(status_code=404, detail="Repository not found")

    new_commit = Commit(dev_id=dev_id, repo_id=repo_id, desc=desc, time=datetime.utcnow())
    db.add(new_commit)
    db.commit()
    db.refresh(new_commit)
    
    return {"message": "Commit added successfully", "commit": new_commit}
