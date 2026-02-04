import { Box } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

interface DirectoryInputProps {
  outputPath: string;
  onSelect: () => void;
}

const DirectoryInput: React.FC<DirectoryInputProps> = ({
  outputPath,
  onSelect
}): React.JSX.Element => (
  <Box className="input-group">
    <Box
      className="icon"
      sx={{
        '&:hover > *': { transform: 'scale(1.1)' }
      }}
    >
      <CreateNewFolderIcon
        sx={{ transition: 'transform 0.35s ease' }}
        fontSize="large"
        onClick={onSelect}
      />
    </Box>
    <input
      className="path-input"
      value={outputPath}
      type="text"
      placeholder="C:\Users\Home"
      readOnly
    />
  </Box>
);

export default DirectoryInput;
