import os
from pathlib import Path
from pathlib import Path
from mutagen import File
import shutil

def create_folder(path, folder_name) -> str:
  folder_path = os.path.join(str(path), str(folder_name))
  os.makedirs(folder_path, exist_ok=True)
  return folder_path

def copy_file(src_path: str, dst_path: str) -> None:
  src = Path(src_path)
  dst = Path(dst_path)

  dst.parent.mkdir(parents=True, exist_ok=True)

  shutil.copy2(src, dst)

def safe_copy_file(src_path: Path, dst_folder: Path, name: str, ext: str) -> Path:
  dst_folder.mkdir(parents=True, exist_ok=True)
  safe_name = name.replace(" ", "_").replace("(", "").replace(")", "")
  dst_path = dst_folder / f"{safe_name}.{ext}"
  shutil.copy2(src_path, dst_path)
  return dst_path

def audio_length(path: Path) -> float:
  path = Path(path)
  if not path.exists():
    return 0.0
  try:
    audio = File(path)
    if audio is None or audio.info is None:
      return 0.0
    return float(audio.info.length)
  except Exception as e:
    print(f"WARNING: Could not read audio length for {path}: {e}")
    return 0.0