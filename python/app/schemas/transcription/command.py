from .audio import AudioFile
from .output import OutputSettings
from .config import TranscriptionConfig
from pydantic import BaseModel, Field

class TranscribeAudioCommand(BaseModel):
  files: list[AudioFile]
  output_config: OutputSettings = Field(alias="outputConfig")
  transcription_config: TranscriptionConfig= Field(alias="transcriptionConfig")
