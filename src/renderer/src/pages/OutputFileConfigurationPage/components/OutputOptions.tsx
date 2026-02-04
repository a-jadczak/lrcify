import { FC } from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

interface OutputOptionsProps {
  placeInFolders: boolean;
  setPlaceInFolders: React.Dispatch<React.SetStateAction<boolean>>;
  includeSourceFiles: boolean;
  setIncludeSourceFiles: React.Dispatch<React.SetStateAction<boolean>>;
}

const OutputOptions: FC<OutputOptionsProps> = ({
  placeInFolders,
  setPlaceInFolders,
  includeSourceFiles,
  setIncludeSourceFiles
}) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Checkbox onChange={() => setPlaceInFolders((prev) => !prev)} checked={placeInFolders} />
      }
      label="Place in folders"
    />
    <FormControlLabel
      control={
        <Checkbox
          onChange={() => setIncludeSourceFiles((prev) => !prev)}
          checked={includeSourceFiles}
        />
      }
      label="Include source files"
    />
  </FormGroup>
);

export default OutputOptions;
