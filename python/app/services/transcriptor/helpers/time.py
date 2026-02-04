def calculate_timestamp(start: float):
  minutes = int(start // 60)
  seconds = int(start % 60)
  hundredths = int((start - int(start)) * 100)
  
  return f"[{minutes:02d}:{seconds:02d}.{hundredths:02d}]"

def format_time(s: float) -> str:
  minutes = int(s // 60)
  seconds = int(s % 60)

  return f"{minutes:02d}:{seconds:02d}"