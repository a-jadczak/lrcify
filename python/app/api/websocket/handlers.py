from fastapi import WebSocket
from app.services.download.download import download_hf_repo_to_cache
from app.services.transcriptor.transcriptor import audio_to_lrc
from app.utils.fs import create_folder
from app.schemas.transcription.command import TranscribeAudioCommand

async def ws_download(ws: WebSocket, data: dict):
  model_name = data["model_name"]
  await ws.send_json({"status": "start"})

  try:
    await download_hf_repo_to_cache(model_name, ws)
  except Exception as e:
    await ws.send_json({"status": "error", "message": str(e)})

async def ws_transcribe_audio_to_lrc(ws: WebSocket, data: dict):
  cmd = TranscribeAudioCommand.model_validate(data)

  audio_files = cmd.files
  output_settings = cmd.output_config.model_copy(deep=True)
  config = cmd.transcription_config

  for audio_file in audio_files:
    output_path = create_folder(output_settings.path, audio_file.name) if output_settings.place_in_folder else output_settings.path 

    # try:
    await audio_to_lrc(audio_file, output_settings, output_path, config, ws)
    # except Exception as e:
    #   await ws.send_json({"status": "error", "file": audio_file.name, "message": str(e)})

  await ws.send_json({"status": "completed"})