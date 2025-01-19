from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import Developer
from ..database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/developers")
def get_developers(db: Session = Depends(get_db)):
    return db.query(Developer).all()

@router.get("/developers/{developer_id}")
def get_developer(developer_id: int, db: Session = Depends(get_db)):
    developer = db.query(Developer).filter(Developer.dev_id == developer_id).first()
    if not developer:
        raise HTTPException(status_code=404, detail="Developer not found")
    return developer

# Add a Developer to the Database
@router.post("/developers")
def add_dev(dev_id: int, name: str, icon: str, db: Session = Depends(get_db)):
    existing_dev = db.query(Developer).filter_by(dev_id=dev_id).first()
    if existing_dev:
        return {"message": "Developer already exists", "developer": existing_dev}

    new_dev = Developer(dev_id=dev_id, name=name, icon=icon, num_commits=0, languages="", top_repos="")
    db.add(new_dev)
    db.commit()
    db.refresh(new_dev)

    return {"message": "Developer added successfully", "developer": new_dev}