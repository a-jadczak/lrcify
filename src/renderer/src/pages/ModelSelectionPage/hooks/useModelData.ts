import { sendWebSocketMessage } from '@renderer/utils/webSocket';
import ModelData from '@renderer/types/ModelData';
import { useEffect, useState } from 'react';
import DownloadProgress from 'src/renderer/src/types/DownloadProgress';

type ModelInstalled = 'yes' | 'no' | 'awaiting';

interface UseModelDataResult {
  modelsData: ModelData[] | undefined;
  selectedModel: ModelData | null | undefined;
  isInstalling: boolean;
  isModelInstalled: ModelInstalled | undefined;
  downloadProgress: DownloadProgress;
  setModel: (modelName: string) => void;
  installModel: () => void;
}

const useModelData = (): UseModelDataResult => {
  const [modelsData, setModelsData] = useState<ModelData[]>();
  const [selectedModel, setSelectedModel] = useState<ModelData | null>();

  const [isInstalling, setIsInstalling] = useState<boolean>(false);
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

    sendWebSocketMessage({
      type: 'download',
      model_name: selectedModel.name
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
    downloadProgress,
    setModel,
    selectedModel,
    installModel
  };
};

export default useModelData;
