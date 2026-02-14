from pathlib import Path
import aiohttp
from huggingface_hub import hf_hub_url
from fastapi import WebSocket
from app.constants.hf_repo import MODEL_FILE_NAME
from app.helpers.path_helpers import get_model_dir
from app.helpers.model_helpers import get_model_info, get_repo_id
from app.utils.conversions import bytes_to_megabytes, percent as calc_percent

def push_to_end(file_list, name):
  """Pushes a specific element to the end of a list"""
  other_files = [f for f in file_list if f.rfilename != name]
  model_file = [f for f in file_list if f.rfilename == name]
  return other_files + model_file

async def download_file(f, snapshot_dir: Path, total_size: int, websocket: WebSocket, repo_id: str):
  """Asynchronously downloads a single file and sends progress over WebSocket"""
  full_path = snapshot_dir / f.rfilename
  full_path.parent.mkdir(parents=True, exist_ok=True)

  url = hf_hub_url(repo_id, f.rfilename)
  downloaded = 0

  async with aiohttp.ClientSession() as session:
    async with session.get(url) as resp:
      resp.raise_for_status()
      with open(full_path, "wb") as fd:
        async for chunk in resp.content.iter_chunked(1024 * 1024):
          fd.write(chunk)
          downloaded += len(chunk)

          percent = calc_percent(downloaded, total_size)
          await websocket.send_json({
            "status": "progress",
            "downloaded": round(bytes_to_megabytes(downloaded), 2),
            "percent": percent
          })

  return downloaded


async def download_hf_repo_to_cache(model_name: str, websocket: WebSocket):
  """Downloads all files for a model from HF hub with live WebSocket updates"""
  info = get_model_info(model_name)
  repo_id = get_repo_id(model_name)

  snapshot_dir = get_model_dir(model_name)
  snapshot_dir.mkdir(parents=True, exist_ok=True)

  # Sum total size of all files
  total_size = sum(f.size for f in info.siblings)

  # Push the largest file (model.bin) to the end
  file_queue = push_to_end(info.siblings, MODEL_FILE_NAME)

  for file in file_queue:
    await download_file(file, snapshot_dir, total_size, websocket, repo_id)
  
  # Notify completion
  await websocket.send_json({"status": "completed"})
