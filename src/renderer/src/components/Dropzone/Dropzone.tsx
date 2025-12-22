import './Dropzone.css';
import Upload from '@mui/icons-material/Upload';
import { Box, Typography } from '@mui/material';
import { FilesContext } from '@renderer/contexts/FilesContext';
import { getFileExtension, splitFileExtension } from '@renderer/utils/stringUtils';
import { useCallback, useContext, useState } from 'react';
import AudioFile from 'src/types/AudioFile';
import uniqid from 'uniqid';

const Dropzone = (): React.JSX.Element => {
  const { addFiles } = useContext(FilesContext)!;
  const [dragging, setDragging] = useState(false);

  const uploadFiles = useCallback(async () => {
    const result = await window.api.pickFiles();

    if (!result.canceled) {
      const files = result.files.map((file: AudioFile) => ({
        ...file,
        name: splitFileExtension(file.name)
      }));
      console.log(files);
      addFiles(files);
    }
  }, [addFiles]);

  const createAudioFiles = (files: File[]): AudioFile[] => {
    return files.map((file) => ({
      id: `file-${uniqid()}`,
      name: splitFileExtension(file.name),
      size: file.size,
      type: getFileExtension(file.name),
      // For safety purposes, getting a file path is not allowed so we have to create an custom URL to be able to read file
      path: URL.createObjectURL(file)
    }));
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer?.files || []);
      addFiles(createAudioFiles(files));
      setDragging(false);
    },
    [addFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragging(false), []);

  return (
    <Box className="dropzone-container">
      <Box
        onClick={uploadFiles}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragLeave}
        className={`dropzone ${dragging && 'dragging'}`}
      >
        <Upload sx={{ fontSize: '3.5em' }} />
        <Typography component={'span'}>Drag and drop audio files or click here</Typography>
      </Box>
    </Box>
  );
};

export default Dropzone;
