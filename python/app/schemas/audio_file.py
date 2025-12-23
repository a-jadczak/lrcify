from dataclasses import dataclass

@dataclass
class AudioFile:
  path: str
  name: str
  type: str