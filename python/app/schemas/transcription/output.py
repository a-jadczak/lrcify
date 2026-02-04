from pydantic import BaseModel, Field

class OutputSettings(BaseModel):
  path: str = Field(alias="outputPath")
  include_source_files: bool = Field(alias="includeSourceFiles")
  place_in_folder: bool = Field(alias="placeInFolders")