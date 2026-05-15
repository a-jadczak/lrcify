from faster_whisper import WhisperModel

_model_cache: dict[tuple[str, str, str], WhisperModel] = {}

def get_whisper_model(model_path: str, device: str, compute_type: str) -> WhisperModel:
  cache_key = (model_path, device, compute_type)

  if cache_key not in _model_cache:
    _model_cache[cache_key] = WhisperModel(
      model_path,
      device,
      compute_type=compute_type
    )

  return _model_cache[cache_key]
