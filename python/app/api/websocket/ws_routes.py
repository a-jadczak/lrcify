import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.api.websocket.handlers import ws_download, ws_transcribe_audio_to_lrc

router = APIRouter()

handlers = {
  "download": ws_download,
  "transcribe": ws_transcribe_audio_to_lrc
}

@router.websocket("/ws")
async def ws_endpoint(ws: WebSocket):
  await ws.accept()

  try:
    while True:
      data = json.loads(await ws.receive_text())
      msg_type = data.get("type")

      handler = handlers.get(msg_type)
      if handler:
        await handler(ws, data)
      else:
        await ws.send_json({
          "type": "error",
          "reason": "unknown_type"
        })

  except WebSocketDisconnect:
    pass
