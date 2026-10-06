import { Box, Typography } from '@mui/material';
import '@/renderer/src/pages/OutputFileConfigurationPage/styles.css';
import { useContext, useEffect, useState } from 'react';
import { FilesContext } from '@/renderer/src/contexts/FilesContext';
import { isEmpty } from '@/renderer/src/utils/stringUtils';
import StepperContext from '@/renderer/src/contexts/StepperContext';
import DirectoryInput from '@/renderer/src/pages/OutputFileConfigurationPage/components/DirectoryInput';
import FileItem from '@/renderer/src/pages/OutputFileConfigurationPage/components/FileItem';
import OutputOptions from '@/renderer/src/pages/OutputFileConfigurationPage/components/OutputOptions';
import { FullTranscriptionConfigContext } from '@/renderer/src/contexts/TranscribeConfigContext';

const OutputFileConfigurationPage = (): React.JSX.Element => {
  const { files } = useContext(FilesContext)!;
  const { setNextStepAvailable } = useContext(StepperContext)!;
  const { setOutputConfig } = useContext(FullTranscriptionConfigContext)!;

  const [placeInFolders, setPlaceInFolders] = useState(true);
  const [includeSourceFiles, setIncludeSourceFiles] = useState(true);
  const [outputPath, setOutputPath] = useState('');

  const setSelectedPath = async (): Promise<void> => {
    const dir = await window.api.pickDirectory();

    if (dir.canceled) return;

    setOutputPath(dir.filePaths[0]);
    setNextStepAvailable(!isEmpty(dir.filePaths[0]));
  };

  useEffect(() => {
    setOutputConfig({ placeInFolders, includeSourceFiles, outputPath });
  }, [placeInFolders, includeSourceFiles, outputPath, setOutputConfig]);

  useEffect(() => {
    setNextStepAvailable(!isEmpty(outputPath));
  }, []);

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
