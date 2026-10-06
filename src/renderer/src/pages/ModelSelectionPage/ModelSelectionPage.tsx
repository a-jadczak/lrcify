import { useContext, useEffect, useState } from 'react';
import StepperContext from '@/renderer/src/contexts/StepperContext';
import useTranscriptionEnvironment from '@/renderer/src/pages/ModelSelectionPage/hooks/useTranscriptionEnvironment';
import useModelData from '@/renderer/src/pages/ModelSelectionPage/hooks/useModelData';
import ModelSelect from '@/renderer/src/pages/ModelSelectionPage/components/ModelSelect';
import ModelInstaller from '@/renderer/src/pages/ModelSelectionPage/components/ModelInstaller';
import ModelSettings from '@/renderer/src/pages/ModelSelectionPage/components/ModelSettings';
import { CircularProgress } from '@mui/material';
import { FullTranscriptionConfigContext } from '@/renderer/src/contexts/TranscribeConfigContext';
import ModelConfig from '@/renderer/src/pages/ModelSelectionPage/types/ModelConfig';

const ModelSelectionPage = (): React.JSX.Element => {
  const { setNextStepAvailable, setPreviousStepAvailable } = useContext(StepperContext)!;
  const { setTranscriptionConfig } = useContext(FullTranscriptionConfigContext)!;

  const { languages, isCudaAvailable } = useTranscriptionEnvironment();
  const {
    selectedModel,
    modelsData,
    installModel,
    downloadProgress,
    isInstalling,
    installError,
    isModelInstalled,
    setModel
  } = useModelData();

  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    languageISO: 'auto',
    device: 'cpu',
    beamSize: 4
  });

  useEffect(() => {
    setNextStepAvailable(selectedModel != null && !isInstalling && isModelInstalled === 'yes');
  }, [selectedModel, isInstalling, isModelInstalled, setNextStepAvailable]);

  useEffect(() => {
    setPreviousStepAvailable(!isInstalling);
  }, [isInstalling, setPreviousStepAvailable]);

  useEffect(() => {
    if (modelConfig && selectedModel) {
      setTranscriptionConfig({ ...modelConfig, model: selectedModel.name });
    }
  }, [modelConfig, selectedModel, setTranscriptionConfig]);

  return (
    <>
      <ModelSelect modelsData={modelsData} setModel={setModel} isInstalling={isInstalling} />

      {isModelInstalled === 'awaiting' ? (
        <CircularProgress />
      ) : (
        selectedModel &&
        (isModelInstalled === 'yes' ? (
          <ModelSettings
            modelConfig={modelConfig}
            setModelConfig={setModelConfig}
            isCudaAvailable={isCudaAvailable}
            languages={languages}
          />
        ) : (
          <ModelInstaller
            weight={`${selectedModel.weight} ${selectedModel.unit}`}
            isInstalling={isInstalling}
            installError={installError}
            installModel={installModel}
            downloadProgress={downloadProgress!}
          />
        ))
      )}
    </>
  );
};

export default ModelSelectionPage;
