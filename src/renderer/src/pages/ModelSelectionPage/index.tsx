import { useContext, useEffect, useState } from 'react';
import StepperContext from '@renderer/contexts/StepperContext';
import useTranscriptionEnvironment from '@renderer/pages/ModelSelectionPage/hooks/useTranscriptionEnvironment';
import useModelData from '@renderer/pages/ModelSelectionPage/hooks/useModelData';
import ModelSelect from './components/ModelSelect';
import ModelInstaller from './components/ModelInstaller';
import ModelSettings from './components/ModelSettings';
import { CircularProgress } from '@mui/material';
import { FullTranscriptionConfigContext } from '@renderer/contexts/TranscribeConfigContext';
import ModelConfig from './types/ModelConfig';

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
  }, [selectedModel, isInstalling, isModelInstalled]);

  useEffect(() => {
    setPreviousStepAvailable(!isInstalling);
  }, [isInstalling]);

  useEffect(() => {
    if (modelConfig && selectedModel) {
      console.log({ ...modelConfig, model: selectedModel.name });
      setTranscriptionConfig({ ...modelConfig, model: selectedModel.name });
    }
  }, [modelConfig]);

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
            installModel={installModel}
            downloadProgress={downloadProgress!}
          />
        ))
      )}
    </>
  );
};

export default ModelSelectionPage;
