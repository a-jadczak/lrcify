import { useEffect, useState } from 'react';
import Language from 'src/types/Language';

const useTranscriptionEnvironment = () => {
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

  return { languages, isCudaAvailable };
};

export default useTranscriptionEnvironment;
