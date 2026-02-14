from app.constants.hf_repo import REPO, MODEL_FILE_NAME
from app.utils.conversions import bytes_to_megabytes
from app.utils.sha import sha256_file
from app.helpers.path_helpers import get_model_path
from app.helpers.model_helpers import get_model_info, get_models

def get_models_data():
  faster_whisper_models = get_models()
  models = [m.modelId for m in faster_whisper_models if "faster-whisper" in m.modelId]
  model_data = []

  for i in range(len(models)):
    model_name = models[i].removeprefix(REPO)
    weight = bytes_to_megabytes(get_model_total_weight(model_name))
    model_data.append({ "name": model_name, "weight": round(weight, 1), "unit": "MB" })

  model_data.sort(key=lambda model: model["weight"], reverse=True)

  return model_data

def get_model_total_weight(model_name):
  info = get_model_info(model_name)
  total_size = sum(f.size for f in info.siblings)

  return total_size

def get_model_sha256(model_name):
  info = get_model_info(model_name)
  if info is None:
    return None

  for file in info.siblings:
    if file.rfilename == MODEL_FILE_NAME:
      return file.lfs.sha256 
    
  return None

def is_model_installed(model_name):
  cache_path = get_model_path(model_name) 

  if not cache_path.exists():
    return False

  excepted_model_sha = get_model_sha256(model_name)
  saved_model_sha = sha256_file(cache_path)
  
  return excepted_model_sha == saved_model_sha
