from fastapi import APIRouter
import ctranslate2

router = APIRouter(prefix="/cuda")

@router.get("/")
def is_cuda_available():
  try:
    available = ctranslate2.get_cuda_device_count() > 0
    return available
  except Exception:
    return False

