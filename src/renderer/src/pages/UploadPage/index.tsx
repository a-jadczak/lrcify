import { Box, Chip } from '@mui/material';
import Dropzone from '@renderer/components/Dropzone/Dropzone';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { useContext, useEffect } from 'react';
import { FilesContext } from '@renderer/contexts/FilesContext';
import StepperContext from '@renderer/contexts/StepperContext';
import './styles.css';

const UploadPage = (): React.JSX.Element => {
  const { files, deleteFile } = useContext(FilesContext)!;
  const { setNextStepAvailable } = useContext(StepperContext)!;

  useEffect(() => {
    setNextStepAvailable(files.length >= 1);
  }, [files]);

  return (
    <>
      <Dropzone />
      <Box className="chips-container">
        {files.map((file) => (
          <Chip
            className="chip"
            key={file.id}
            icon={<AudioFileIcon />}
            onDelete={() => deleteFile(file)}
            label={file.name}
          />
        ))}
      </Box>
    </>
  );
};

export default UploadPage;
