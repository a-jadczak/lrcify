import { useEffect, useState } from 'react';
import TranscriptionConfig from 'src/types/TranscriptionConfig';
import Language from 'src/types/Language';

const useTranscribeSettings = () => {
  const [transcribeSettings, setTranscribeSettings] = useState<TranscriptionConfig>();
  const [isCudaAvailable, setIsCudaAvailable] = useState<boolean>();
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    Promise.all([window.api.getLanguages(), window.api.getIsCudaAvailable()])
      .then(([langs, cuda]) => {
        setLanguages(langs);
        console.log(cuda);
        setIsCudaAvailable(cuda);
      })
      .catch((err) => console.error('Error:', err));
  }, []);

  return { transcribeSettings, setTranscribeSettings, languages, isCudaAvailable };
};

export default useTranscribeSettings;
