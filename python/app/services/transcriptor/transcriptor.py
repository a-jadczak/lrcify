import json
from faster_whisper import WhisperModel
from app.schemas.transcription_config import TranscriptionConfig
from app.services.transcriptor.helpers.time import calculate_timestamp
from app.schemas.audio_file import AudioFile
from app.schemas.output_settings import OutputSettings
from fastapi import WebSocket
from app.utils.fs import audio_length, copy_file

# USER DATA FROM FRONT END:
# - model
# - device
# - language
# - beam_size
# - output_path

# - place in holders
# - include source files

# - audio files

async def audio_to_lrc(audio_file: AudioFile, output_settings: OutputSettings, config: TranscriptionConfig, websocket: WebSocket):
  final_output_path = output_settings.path / f"{audio_file.name}.lrc"

  if output_settings.include_source_files:
    target_path = output_settings.path / f"{audio_file.name}.{audio_file.type}"
    copy_file(audio_file.path, target_path)

  await websocket.send_text(json.dumps({
    "status": "strating-translating", 
    "track": audio_file.name,
    "total-length": audio_length(audio_file.path) / 60,
  }))

  model = WhisperModel(config.model_path, config.device, compute_type="float32")
  segments, info = model.transcribe(audio_file.path, config.beam_size, config.language, task="transcribe")

  with open(final_output_path, "w", encoding="utf-8") as f:
    for segment in segments:
      start = segment.start

      timestamp = calculate_timestamp(start)
      text = f"{timestamp}{segment.text.strip()}"

      f.write(f"{text}\n")
      print(f"{text}")
      await websocket.send_text(json.dumps({
        "status": "translating", 
        "text": text, 
      }))
    
  await websocket.send_text(json.dumps({
    "status": "translated"
  }))
  