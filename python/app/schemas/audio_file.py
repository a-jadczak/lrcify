from dataclasses import dataclass

@dataclass
class AudioFile:
  id: str
  path: str
  name: str
  size: int
  type: str