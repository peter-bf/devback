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
