from dataclasses import dataclass

@dataclass
class OutputSettings:
  path: str
  include_source_files: bool
  place_in_folder: bool