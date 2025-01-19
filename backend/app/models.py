from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

# Many-to-many association table between Developers and Repositories
developer_repository_association = Table(
    "developer_repository",
    Base.metadata,
    Column("dev_id", Integer, ForeignKey("developers.dev_id"), primary_key=True),
    Column("repo_id", Integer, ForeignKey("repositories.repo_id"), primary_key=True),
)

# Developer Model
class Developer(Base):
    __tablename__ = "developers"

    dev_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    icon = Column(String)  # URL for profile picture/avatar
    num_commits = Column(Integer, default=0)  # Total number of commits
    languages = Column(String)  # Languages used, stored as a comma-separated string
    top_repos = Column(String)  # Top repositories by activity/stars, comma-separated string

    # Many-to-many relationship with Repository
    repositories = relationship(
        "Repository", secondary=developer_repository_association, back_populates="contributors"
    )
    # One-to-many relationship with Commit
    commits = relationship("Commit", back_populates="developer")

# Repository Model
class Repository(Base):
    __tablename__ = "repositories"

    repo_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)  # Repository name
    icon = Column(String)  # URL for repository logo/icon
    desc = Column(String)  # Description of the repository
    stars = Column(Integer, default=0)  # Star count for filtering top repos
    forks = Column(Integer, default=0)  # Fork count for additional stats
    language = Column(String)  # Primary language of the repository
    repo_url = Column(String)  # URL to the repository on GitHub

    # Many-to-many relationship with Developer
    contributors = relationship(
        "Developer", secondary=developer_repository_association, back_populates="repositories"
    )
    # One-to-many relationship with Commit
    commits = relationship("Commit", back_populates="repository")

# Commit Model
class Commit(Base):
    __tablename__ = "commits"

    commit_id = Column(Integer, primary_key=True, index=True)
    dev_id = Column(Integer, ForeignKey("developers.dev_id"), nullable=False)  # Developer ID
    repo_id = Column(Integer, ForeignKey("repositories.repo_id"), nullable=False)  # Repository ID
    desc = Column(String)  # Commit description/message
    time = Column(DateTime, default=datetime.utcnow)  # Commit timestamp

    # Relationships
    developer = relationship("Developer", back_populates="commits")
    repository = relationship("Repository", back_populates="commits")