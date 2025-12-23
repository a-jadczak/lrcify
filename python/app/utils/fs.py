from pathlib import Path
from pathlib import Path
from mutagen import File

def create_folder(path: Path, folder_name: str) -> Path:
  folder = path / folder_name
  folder.mkdir(parents=True, exist_ok=True)
  return folder

def copy_file(src_path: Path, dst_path: Path) -> None:
  src = Path(src_path)
  dst = Path(dst_path)
  dst.parent.mkdir(parents=True, exist_ok=True) 

  with src.open("rb") as f_src, dst.open("wb") as f_dst:
    f_dst.write(f_src.read())

def audio_length(path: Path) -> int:
  audio = File(path)
  return audio.info.length