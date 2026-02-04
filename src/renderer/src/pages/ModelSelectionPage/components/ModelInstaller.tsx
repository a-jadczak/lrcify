import { Box, Button, Typography } from '@mui/material';
import LinearProgressWithLabel from '@renderer/components/LinearProgressWithLabel/LinearProgressWithLabel';
import { useEffect } from 'react';

interface ModelInstallerProps {
  downloadProgress: DownloadProgress;
  weight: string | undefined;
  isInstalling: boolean;
  installModel: () => void;
}

const ModelInstaller = ({
  weight,
  downloadProgress,
  isInstalling,
  installModel
}: ModelInstallerProps) => {
  useEffect(() => {
    if (isInstalling) console.log(isInstalling);
    else console.log('err');
  }, [isInstalling]);

  return (
    <>
      <Box component={'p'} sx={{ marginTop: '1em' }}>
        {isInstalling ? (
          <>
            Downloading ({downloadProgress.downloaded} MB / {weight})
          </>
        ) : (
          <>
            Model weight:{' '}
            <Typography component={'span'} sx={{ color: 'text.secondary' }}>
              {weight}
            </Typography>
          </>
        )}
      </Box>
      <Box sx={{ marginTop: '.5em' }}>
        {isInstalling ? (
          <LinearProgressWithLabel value={downloadProgress.percent} />
        ) : (
          <Button onClick={installModel} size="small" variant="contained" color="success">
            Install
          </Button>
        )}
      </Box>
    </>
  );
};

export default ModelInstaller;
