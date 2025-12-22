from typing import List
from fastapi import APIRouter
from app.api.routes.helpers.languages import code_to_name
from faster_whisper import WhisperModel
from app.schemas.transcription_config import TranscriptionConfig
from app.services.transcriptor.transcriptor import audio_to_lrc

router = APIRouter(prefix="/transcription")

model_instance = WhisperModel("base")

@router.get("/supported-languages")
def get_model_languages():
  languages = model_instance.supported_languages
  languages_with_codes = [{"iso": c, "name": code_to_name(c)} for c in languages if code_to_name(c)]

  return languages_with_codes

@router.post("/transcribe")
def transcribe_audio_to_lrc(audio_files: List[str], place_in_folder: bool, include_source_files: bool, config: TranscriptionConfig):
  pass