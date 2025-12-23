import { getFileName, splitFileExtension } from './../utils/stringUtils';
import { createContext, useState, ReactNode } from 'react';
import AudioFile from 'src/types/AudioFile';

interface FilesContextType {
  files: AudioFile[];
  outputPath: string;
  setOutputPath: (path: string) => void;
  setFiles: (files: AudioFile[]) => void;
  addFiles: (files: AudioFile[]) => void;
  deleteFile: (file: AudioFile) => void;
  clearFiles: () => void;
  getFileNames: () => string[];
}

export const FilesContext = createContext<FilesContextType | undefined>(undefined);

export const FilesProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFilesState] = useState<AudioFile[]>([]);
  const [outputPath, setOutputPath] = useState<string>('');

  const setFiles = (newFiles: AudioFile[]) => {
    const filesCopy = [...newFiles];

    for (let i = 0; i < filesCopy.length; i++) {
      for (let j = 0; j < filesCopy.length; j++) {
        if (filesCopy[i].name === filesCopy[j].name && filesCopy[i].id !== filesCopy[j].id) {
          filesCopy[j].name = `${splitFileExtension(filesCopy[j].name)} - Copy`;
        }
      }
    }
    console.log(filesCopy);
    setFilesState(filesCopy);
  };

  const addFiles = (newFiles: AudioFile[]) => {
    setFiles([...files, ...newFiles]);
  };
  const deleteFile = (fileToDelete: AudioFile) =>
    setFilesState(files.filter((file) => file.id !== fileToDelete.id));
  const clearFiles = () => setFilesState([]);
  const getFileNames = () => files.map((file) => getFileName(file.path));

  return (
    <FilesContext.Provider
      value={{
        files,
        outputPath,
        setOutputPath,
        setFiles,
        addFiles,
        deleteFile,
        clearFiles,
        getFileNames
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};
