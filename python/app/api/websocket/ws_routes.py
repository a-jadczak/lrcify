import json
from typing import List
from fastapi import APIRouter, WebSocket
from app.services.download.download import download_hf_repo_to_cache
from app.schemas.transcription_config import TranscriptionConfig
from app.schemas.output_settings import OutputSettings
from app.utils.fs import create_folder
from app.schemas.audio_file import AudioFile
from app.services.transcriptor.transcriptor import audio_to_lrc

router = APIRouter(prefix="/ws")

@router.websocket("/download/{model_name}")
async def ws_download(websocket: WebSocket, model_name: str):
  await websocket.accept()
  await websocket.send_text(json.dumps({ "status": "start" }))

  try:
    await download_hf_repo_to_cache(model_name, websocket)
  except Exception as e:
    await websocket.send_text(json.dumps({"status": "error", "message": str(e)}))


@router.websocket("/transcribe")
async def transcribe_audio_to_lrc(websocket: WebSocket, audio_files: List[AudioFile], output_settings: OutputSettings, config: TranscriptionConfig):
  
  for audio_file in audio_files:
    if output_settings.place_in_folder:
      output_settings.path = create_folder(output_settings.path, audio_file.name)

    try:
      await audio_to_lrc(audio_file, output_settings, config, websocket)
    except Exception as e:
      await websocket.send_text(json.dumps({"status": "error", "message": str(e)}))
  
  await websocket.send_text(json.dumps({"status": "complete"}))

