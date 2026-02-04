from fastapi import APIRouter
import torch

router = APIRouter(prefix="/cuda")

@router.get("/")
def is_cuda_available():
  available = torch.cuda.is_available() 
  return available
