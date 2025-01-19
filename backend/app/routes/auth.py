from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from authlib.integrations.starlette_client import OAuth
from starlette.requests import Request
from starlette.responses import RedirectResponse
from dotenv import load_dotenv
import os
from ..database import SessionLocal
from ..models import Developer

load_dotenv()

router = APIRouter()

# OAuth Setup
oauth = OAuth()
oauth.register(
    name="github",
    client_id=os.getenv("GITHUB_CLIENT_ID"),
    client_secret=os.getenv("GITHUB_CLIENT_SECRET"),
    access_token_url="https://github.com/login/oauth/access_token",
    authorize_url="https://github.com/login/oauth/authorize",
    client_kwargs={"scope": "user:email"},
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/auth/login")
def login_with_github(request: Request):
    redirect_uri = os.getenv("GITHUB_REDIRECT_URI")
    return oauth.github.authorize_redirect(request, redirect_uri)

@router.get("/auth/callback")
async def github_callback(request: Request, db: Session = Depends(get_db)):
    # Get GitHub user token
    token = await oauth.github.authorize_access_token(request)
    user_info = await oauth.github.parse_id_token(request, token)

    # Get user data from GitHub API
    resp = await oauth.github.get("https://api.github.com/user", token=token)
    profile = resp.json()

    if not profile:
        raise HTTPException(status_code=400, detail="Failed to fetch user profile")

    # Check if the user already exists in the database
    developer = db.query(Developer).filter(Developer.github_id == profile["id"]).first()
    if not developer:
        # Create a new developer profile
        developer = Developer(
            github_id=profile["id"],
            username=profile["login"],
            email=profile.get("email"),
            bio=profile.get("bio"),
            avatar_url=profile.get("avatar_url"),
            location=profile.get("location"),
            public_repos=profile.get("public_repos"),
            followers=profile.get("followers"),
            following=profile.get("following"),
            github_url=profile.get("html_url"),
        )
        db.add(developer)
        db.commit()
        db.refresh(developer)

    # Fetch and process commits
    await fetch_and_process_commits(developer, token, db)

    # Redirect or return success message
    return RedirectResponse(url=f"/profile/{developer.id}")

async def fetch_and_process_commits(developer, token, db):
    # Fetch commits from GitHub API
    commits_url = f"https://api.github.com/users/{developer.username}/events"
    resp = await oauth.github.get(commits_url, token=token)
    events = resp.json()

    for event in events:
        if event["type"] == "PushEvent":
            for commit in event["payload"]["commits"]:
                # Check if the commit already exists in the database
                commit_entry = db.query(Commit).filter(Commit.commit_id == commit["sha"]).first()
                if commit_entry:
                    continue

                # Check if the repository exists
                repo_data = event["repo"]
                repo = db.query(Repository).filter(Repository.name == repo_data["name"]).first()
                if not repo:
                    # Fetch repository details
                    repo_details_url = f"https://api.github.com/repos/{repo_data['name']}"
                    repo_resp = await oauth.github.get(repo_details_url, token=token)
                    repo_details = repo_resp.json()

                    # Only add repositories with 5+ stars
                    if repo_details["stargazers_count"] >= 5:
                        repo = Repository(
                            name=repo_details["name"],
                            description=repo_details.get("description"),
                            language=repo_details.get("language"),
                            stars=repo_details["stargazers_count"],
                            forks=repo_details["forks_count"],
                            repo_url=repo_details["html_url"],
                            developer_id=developer.id,
                        )
                        db.add(repo)
                        db.commit()
                        db.refresh(repo)

                # Add commit to the database
                commit_entry = Commit(
                    commit_id=commit["sha"],
                    description=commit.get("message"),
                    timestamp=event["created_at"],
                    developer_id=developer.id,
                    repository_id=repo.id if repo else None,
                )
                db.add(commit_entry)

    db.commit()
    # Get GitHub user token
    token = await oauth.github.authorize_access_token(request)
    user_info = await oauth.github.parse_id_token(request, token)
    
    # Get user data from GitHub API
    resp = await oauth.github.get("https://api.github.com/user", token=token)
    profile = resp.json()
    
    if not profile:
        raise HTTPException(status_code=400, detail="Failed to fetch user profile")
    
    # Check if the user already exists in the database
    developer = db.query(Developer).filter(Developer.github_id == profile["id"]).first()
    if not developer:
        # Create a new developer profile
        developer = Developer(
            github_id=profile["id"],
            username=profile["login"],
            email=profile.get("email"),
            bio=profile.get("bio"),
            avatar_url=profile.get("avatar_url"),
            location=profile.get("location"),
            public_repos=profile.get("public_repos"),
            followers=profile.get("followers"),
            following=profile.get("following"),
            github_url=profile.get("html_url"),
        )
        db.add(developer)
        db.commit()
        db.refresh(developer)

    # Redirect or return success message
    return RedirectResponse(url=f"/profile/{developer.id}")