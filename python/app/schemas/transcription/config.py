from typing import Literal
from pydantic import BaseModel, Field

class TranscriptionConfig(BaseModel):
  model_path: str = Field(alias="model")
  device: Literal['cuda', 'cpu']
  language: str = Field(alias="languageISO")
  beam_size: int = Field(alias="beamSize")