from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx  # For making HTTP requests

router = APIRouter()

# Devnet API URL
DEVNET_API_URL = "http://127.0.0.1:5050"

class TransferRequest(BaseModel):
    address: str  # Address to mint coins to
    amount: int  # Amount of coins to mint


@router.post("/transfer")
async def transfer_funds(request: TransferRequest):
    if request.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be greater than 0")

    try:
        async with httpx.AsyncClient() as client:
            # Call the /mint endpoint
            mint_response = await client.post(
                f"{DEVNET_API_URL}/mint",
                json={
                    "address": request.address,
                    "amount": request.amount,
                },
            )
            if mint_response.status_code != 200:
                raise HTTPException(
                    status_code=400,
                    detail=f"Minting failed: {mint_response.json()}",
                )
            return {
                "status": "success",
                "address": request.address,
                "amount": request.amount,
                "message": "Transfer successful",
            }
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"HTTP Request Error: {e}")