from pydantic import BaseModel

class AudioFile(BaseModel):
  id: str
  path: str
  name: str
  size: int
  type: str