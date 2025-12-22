export const getFileName = (path: string): string => path.split(/[/\\]/).pop()!;
export const getFileExtension = (path: string): string =>
  path.split('.').pop()?.toLowerCase() || '';
export const splitFileExtension = (name: string): string => {
  const parts = name.split('.');
  return parts.length > 1 ? parts.slice(0, -1).join('.') : parts[0];
};
export const isEmpty = (str: string | null): boolean => str == null || str.trim().length === 0;
