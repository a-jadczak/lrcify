import { Box } from '@mui/material';
import IconLabel from '@renderer/components/IconLabel/IconLabel';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import AudioFile from 'src/types/AudioFile';
import { splitFileExtension } from '@renderer/utils/stringUtils';

interface FileItemProps {
  file: AudioFile;
  placeInFolders: boolean;
  includeSourceFiles: boolean;
}

const FileItem: React.FC<FileItemProps> = ({ file, placeInFolders, includeSourceFiles }) => {
  const { id, name, type } = file;
  return (
    <Box key={id}>
      {placeInFolders && <IconLabel text={name} icon={<FolderIcon />} />}
      <Box className={`${placeInFolders && 'folder'}`}>
        <IconLabel text={`${splitFileExtension(name)}.lrc`} icon={<DescriptionIcon />} />
        {includeSourceFiles && <IconLabel text={`${name}.${type}`} icon={<AudioFileIcon />} />}
      </Box>
    </Box>
  );
};

export default FileItem;
