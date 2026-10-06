import { sendWebSocketMessage } from '@/renderer/src/utils/webSocket';
import ModelData from '@/renderer/src/types/ModelData';
import { useEffect, useState } from 'react';
import DownloadProgress from '@/renderer/src/types/DownloadProgress';

type ModelInstalled = 'yes' | 'no' | 'awaiting';

interface UseModelDataResult {
  modelsData: ModelData[] | undefined;
  selectedModel: ModelData | null | undefined;
  isInstalling: boolean;
  installError: string | null;
  isModelInstalled: ModelInstalled | undefined;
  downloadProgress: DownloadProgress;
  setModel: (modelName: string) => void;
  installModel: () => void;
}

const useModelData = (): UseModelDataResult => {
  const [modelsData, setModelsData] = useState<ModelData[]>();
  const [selectedModel, setSelectedModel] = useState<ModelData | null>();

  const [isInstalling, setIsInstalling] = useState<boolean>(false);
  const [installError, setInstallError] = useState<string | null>(null);
  const [isModelInstalled, setIsModelInstalled] = useState<ModelInstalled>();

  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>({
    downloaded: 0,
    percent: 0
  });

  useEffect(() => {
    window.api
      .getModels()
      .then((models) => {
        setModelsData(models);
      })
      .catch((err) => console.error('Error:', err));
  }, []);

  const setModel = (modelName: string): void => {
    setSelectedModel(modelsData?.find((model) => model.name === modelName));

    setIsModelInstalled('awaiting');
    window.api
      .getIsModelInstalled(modelName)
      .then((value) => setIsModelInstalled(value ? 'yes' : 'no'));
  };

  useEffect(() => {
    const off = window.ws.onMessage((data: string) => {
      console.log('Renderer:', data);
      const { status, downloaded, percent } = JSON.parse(data);

      switch (status) {
        case 'progress':
          setDownloadProgress({ downloaded, percent });
          break;
        case 'completed':
          onInstalled();
          break;
        case 'error':
          console.error('WS error');
          setIsInstalling(false);
          break;
      }
    });

    return off;
  }, []);

  const installModel = (): void => {
    if (!selectedModel) return;

    setIsInstalling(true);
    setInstallError(null);

    void sendWebSocketMessage({
      type: 'download',
      model_name: selectedModel.name
    }).catch((error: unknown) => {
      console.error('Could not start model download:', error);
      setInstallError('Could not connect to the backend. Start it and try again.');
      setIsInstalling(false);
    });
  };

  const onInstalled = (): void => {
    setIsInstalling(false);
    setIsModelInstalled('yes');
    setDownloadProgress({ downloaded: 0, percent: 0 });
  };

  return {
    modelsData,
    isModelInstalled,
    isInstalling,
    installError,
    downloadProgress,
    setModel,
    selectedModel,
    installModel
  };
};

export default useModelData;
