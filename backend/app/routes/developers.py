
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import Developer
from app.database import SessionLocal

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# GET all developers without limits
@router.get("/developers")
def get_developers(db: Session = Depends(get_db)):
    developers = db.query(Developer).all()
    if not developers:
        raise HTTPException(status_code=404, detail="No developers found.")
    return developers  # Returns raw SQLAlchemy objects


# GET a specific developer by ID
@router.get("/developers/{developer_id}")
def get_developer(developer_id: int, db: Session = Depends(get_db)):
    developer = db.query(Developer).filter(Developer.dev_id == developer_id).first()
    if not developer:
        raise HTTPException(status_code=404, detail="Developer not found.")
    return developer

# POST a new developer
@router.post("/developers")
def create_developer(developer: dict, db: Session = Depends(get_db)):
    new_developer = Developer(**developer)
    db.add(new_developer)
    db.commit()
    db.refresh(new_developer)
    return new_developer


# DELETE a developer by ID
@router.delete("/developers/{developer_id}", status_code=204)
def delete_developer(developer_id: int, db: Session = Depends(get_db)):
    developer = db.query(Developer).filter(Developer.id == developer_id).first()
    if not developer:
        raise HTTPException(status_code=404, detail="Developer not found.")
    db.delete(developer)
    db.commit()
