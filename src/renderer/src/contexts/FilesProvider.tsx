import { getFileName, splitFileExtension } from '@/renderer/src/utils/stringUtils';
import { useState } from 'react';
import type { JSX, ReactNode } from 'react';
import type AudioFile from '@/types/AudioFile';
import { FilesContext } from '@/renderer/src/contexts/FilesContext';

export const FilesProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [files, setFilesState] = useState<AudioFile[]>([]);

  const setFiles = (newFiles: AudioFile[]): void => {
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

  const addFiles = (newFiles: AudioFile[]): void => {
    setFiles([...files, ...newFiles]);
  };
  const deleteFile = (fileToDelete: AudioFile): void =>
    setFilesState(files.filter((file) => file.id !== fileToDelete.id));
  const clearFiles = (): void => setFilesState([]);
  const getFileNames = (): string[] => files.map((file) => getFileName(file.path));

  return (
    <FilesContext.Provider
      value={{
        files,
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
