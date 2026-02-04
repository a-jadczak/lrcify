from fastapi import APIRouter
from app.utils.conversions import bytes_to_megabytes
from app.services.model_info.model_info import get_models_data, get_model_total_weight, is_model_installed as model_is_installed

router = APIRouter(prefix="/models")

@router.get("/")
def get_models():
  models = get_models_data()
  return models


@router.get("/{model_name}/weight")
def get_model_weight(model_name: str):
  model_weight = bytes_to_megabytes(get_model_total_weight(model_name))
  return model_weight

@router.get("/{model_name}/is-installed")
def is_model_installed(model_name: str):
  is_installed = model_is_installed(model_name)
  
  return is_installed
