from typing import List
from fastapi import APIRouter
from app.api.rest.helpers.languages import code_to_name
from faster_whisper import WhisperModel
from app.schemas.transcription.config import TranscriptionConfig
from app.services.transcriptor.transcriptor import audio_to_lrc

router = APIRouter(prefix="/transcription")

model_instance = WhisperModel("base")

@router.get("/supported-languages")
def get_model_languages():
  languages = model_instance.supported_languages
  languages_with_codes = [{"iso": c, "name": code_to_name(c)} for c in languages if code_to_name(c)]

  return languages_with_codes