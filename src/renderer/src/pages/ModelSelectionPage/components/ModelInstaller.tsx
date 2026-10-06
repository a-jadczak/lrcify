import { Alert, Box, Button, Typography } from '@mui/material';
import LinearProgressWithLabel from '@renderer/components/LinearProgressWithLabel';
import type DownloadProgress from '@renderer/types/DownloadProgress';

interface ModelInstallerProps {
  downloadProgress: DownloadProgress;
  weight: string | undefined;
  isInstalling: boolean;
  installError: string | null;
  installModel: () => void;
}

const ModelInstaller = ({
  weight,
  downloadProgress,
  isInstalling,
  installError,
  installModel
}: ModelInstallerProps): React.JSX.Element => {
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
      {installError && <Alert severity="error">{installError}</Alert>}
    </>
  );
};

export default ModelInstaller;
