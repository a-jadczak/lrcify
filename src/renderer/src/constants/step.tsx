import OutputFileConfigurationPage from '@/renderer/src/pages/OutputFileConfigurationPage/OutputFileConfigurationPage';
import ModelSelectionPage from '@/renderer/src/pages/ModelSelectionPage/ModelSelectionPage';
import TranslationPage from '@/renderer/src/pages/TranslationPage/TranslationPage';
import CompletionPage from '@/renderer/src/pages/CompletionPage/CompletionPage';
import UploadPage from '@/renderer/src/pages/UploadPage/UploadPage';
import Step from '@/types/Step';

export const steps: Step[] = [
  {
    name: 'Upload',
    component: <UploadPage />,
    backButton: true
  },
  {
    name: 'Output',
    component: <OutputFileConfigurationPage />,
    backButton: true
  },
  {
    name: 'Model',
    component: <ModelSelectionPage />,
    backButton: true
  },
  {
    name: 'Translation',
    component: <TranslationPage />,
    backButton: false
  },
  {
    name: 'Finish',
    component: <CompletionPage />,
    backButton: false
  }
];
