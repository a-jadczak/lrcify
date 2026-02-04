def bytes_to_megabytes(size_bytes: int) -> float:
  """Convert bytes to megabytes."""
  return size_bytes / 1e6

def percent(part: int, total: int) -> float:
  """Calculate percentage value."""
  return (part / total) * 100 if total else 0.0
