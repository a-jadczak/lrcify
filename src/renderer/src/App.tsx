import Stepper from '@/renderer/src/components/Stepper';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { FilesProvider } from '@/renderer/src/contexts/FilesProvider';
import theme from '@/renderer/src/theme/theme';
import { steps } from '@/renderer/src/constants/step';
import { TranscriptionConfigProvider } from '@/renderer/src/contexts/TranscriptionConfigProvider';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FilesProvider>
        <TranscriptionConfigProvider>
          <main>
            <Stepper steps={steps} />
          </main>
        </TranscriptionConfigProvider>
      </FilesProvider>
    </ThemeProvider>
  );
}

export default App;
