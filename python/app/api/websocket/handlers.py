from fastapi import WebSocket
from app.services.download.download import download_hf_repo_to_cache
from app.schemas.audio_file import AudioFile
from app.schemas.output_settings import OutputSettings
from app.schemas.transcription_config import TranscriptionConfig
from app.services.transcriptor.transcriptor import audio_to_lrc
from app.utils.fs import create_folder

async def ws_download(ws: WebSocket, data: dict):
  model_name = data["model_name"]
  await ws.send_json({"status": "start"})

  try:
    await download_hf_repo_to_cache(model_name, ws)
  except Exception as e:
    await ws.send_json({"status": "error", "message": str(e)})

async def ws_transcribe_audio_to_lrc(ws: WebSocket, data: dict):
  audio_files = [AudioFile(**f) for f in data["files"]]
  output_settings = OutputSettings(**data["outputConfig"])
  config = TranscriptionConfig(**data["transcriptionConfig"])

  for audio_file in audio_files:
    if output_settings.place_in_folder:
      output_settings.path = create_folder(
        output_settings.path,
        audio_file.name
      )

    try:
      await audio_to_lrc(audio_file, output_settings, config, ws)
    except Exception as e:
      await ws.send_json({"status": "error", "message": str(e)})

  await ws.send_json({"status": "complete"})