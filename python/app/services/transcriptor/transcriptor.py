import asyncio
import os
from pathlib import Path
import shutil
from faster_whisper import WhisperModel
from app.schemas.transcription.config import TranscriptionConfig
from app.services.transcriptor.helpers.time import calculate_timestamp, format_time
from app.schemas.transcription.audio import AudioFile
from app.schemas.transcription.output import OutputSettings
from fastapi import WebSocket
from app.utils.fs import audio_length, copy_file, safe_copy_file

# USER DATA FROM FRONT END:
# - model
# - device
# - language
# - beam_size
# - output_path

# - place in holders
# - include source files

# - audio files

async def audio_to_lrc(audio_file: AudioFile, 
                       output_settings: OutputSettings,
                       output_path: str,
                       config: TranscriptionConfig,
                       model: WhisperModel, 
                       ws: WebSocket):
  final_output_path = Path(os.path.join(output_path, f"{audio_file.name}.lrc"))

  if output_settings.include_source_files:
    shutil.copy2(audio_file.path, output_path)

  await ws.send_json({
    "status": "starting-translating", 
    "track": audio_file.name,
    "totalLength": format_time(audio_length(audio_file.path)),
  })

  segments, info = model.transcribe(
    audio_file.path,
    beam_size=config.beam_size,
    language=None if config.language == "auto" else config.language,
    task="transcribe"
  )

  with open(final_output_path, "w", encoding="utf-8") as f:
    for segment in segments:
      start = segment.start
      timestamp = calculate_timestamp(start)
      lyrics = f"{timestamp} {segment.text.strip()}"
      f.write(f"{lyrics}\n")
      print(f"{lyrics}")

      await ws.send_json({
        "status": "translating",
        "lyrics": lyrics,
        "elapsedTime": format_time(start),
      })
      
      await asyncio.sleep(0) # WS flush
    
  await ws.send_json({
    "status": "translated"
  })
  