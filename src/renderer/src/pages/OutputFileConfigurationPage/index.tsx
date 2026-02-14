import { Box, Typography } from '@mui/material';
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import { FilesContext } from '@renderer/contexts/FilesContext';
import { isEmpty } from '@renderer/utils/stringUtils';
import StepperContext from '@renderer/contexts/StepperContext';
import DirectoryInput from './components/DirectoryInput';
import FileItem from './components/FileItem';
import OutputOptions from './components/OutputOptions';
import { FullTranscriptionConfigContext } from '@renderer/contexts/TranscribeConfigContext';

const OutputFileConfigurationPage = () => {
  const { files } = useContext(FilesContext)!;
  const { setNextStepAvailable } = useContext(StepperContext)!;
  const { setOutputConfig } = useContext(FullTranscriptionConfigContext)!;

  const [placeInFolders, setPlaceInFolders] = useState(true);
  const [includeSourceFiles, setIncludeSourceFiles] = useState(true);
  const [outputPath, setOutputPath] = useState('');

  const setSelectedPath = async () => {
    const dir = await window.api.pickDirectory();

    if (dir.canceled) return;

    setOutputPath(dir.filePaths[0]);
    setNextStepAvailable(!isEmpty(dir.filePaths[0]));
  };

  useEffect(() => {
    console.log({ placeInFolders, includeSourceFiles, outputPath });
    setOutputConfig({ placeInFolders, includeSourceFiles, outputPath });
  }, [placeInFolders, includeSourceFiles, outputPath]);

  useEffect(() => {
    setNextStepAvailable(!isEmpty(outputPath));
  }, []);

  // TODO: Refactor ouput options
  return (
    <>
      <Typography component="h2" variant="h4">
        Output Settings
      </Typography>

      <OutputOptions
        placeInFolders={placeInFolders}
        setPlaceInFolders={setPlaceInFolders}
        includeSourceFiles={includeSourceFiles}
        setIncludeSourceFiles={setIncludeSourceFiles}
      />

      <DirectoryInput outputPath={outputPath} onSelect={setSelectedPath} />

      <Box className="file-tree-result">
        {files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            placeInFolders={placeInFolders}
            includeSourceFiles={includeSourceFiles}
          />
        ))}
      </Box>
    </>
  );
};

export default OutputFileConfigurationPage;
