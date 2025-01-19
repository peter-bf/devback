from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

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
    icon = Column(String)  # URL for profile picture
    num_commits = Column(Integer, default=0)
    languages = Column(String)  # Store languages as a comma-separated string
    top_repos = Column(String)  # Store top repositories as a comma-separated string

    repositories = relationship("Repository", secondary=developer_repository_association, back_populates="contributors")
    commits = relationship("Commit", back_populates="developer")

# Repository Model
class Repository(Base):
    __tablename__ = "repositories"

    repo_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    icon = Column(String)  # URL for repository logo/icon
    desc = Column(String)

    contributors = relationship("Developer", secondary=developer_repository_association, back_populates="repositories")
    commits = relationship("Commit", back_populates="repository")

# Commit Model
class Commit(Base):
    __tablename__ = "commits"

    commit_id = Column(Integer, primary_key=True, index=True)
    dev_id = Column(Integer, ForeignKey("developers.dev_id"), nullable=False)
    repo_id = Column(Integer, ForeignKey("repositories.repo_id"), nullable=False)
    desc = Column(String)
    time = Column(DateTime, default=datetime.utcnow)

    developer = relationship("Developer", back_populates="commits")
    repository = relationship("Repository", back_populates="commits")
