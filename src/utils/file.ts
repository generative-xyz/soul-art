import { ERC721_SUPPORTED_EXTENSIONS, IMAGE_EXTENSIONS, SUPPORTED_FILE_EXT } from '@/constants/file';
import { MediaType } from '@/enums/file';

export const getFileExtensionByFileName = (fileName: string): string | null => {
  const fileExt = fileName.split('.').pop();
  return fileExt ?? null;
};

export const fileToBase64 = (file: File | Blob): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const blobToFile = (fileName: string, fileBlob: Blob): File => {
  return new File([fileBlob], fileName, {
    type: fileBlob.type,
  });
};

export const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const getMediaTypeFromFileExt = (ext: string): MediaType | null => {
  const supportedFile = SUPPORTED_FILE_EXT.find(item => {
    return item.ext.toLowerCase() === ext.toLowerCase();
  });
  if (supportedFile) {
    return supportedFile.mediaType;
  }
  return null;
};

export const getFileNameFromUrl = (url: string): string => {
  return url.substring(url.lastIndexOf('/') + 1, url.length);
};

export const isImageFile = (file: File): boolean => {
  const fileName = file.name;
  const fileExt = getFileExtensionByFileName(fileName);
  if (!fileExt) {
    return false;
  }
  return IMAGE_EXTENSIONS.includes(fileExt);
};

export const readFileAsText = (file: File | Blob): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsText(file);
  });
};

export const isERC721SupportedExt = (fileExt: string | null | undefined): boolean => {
  if (!fileExt) {
    return false;
  }

  return ERC721_SUPPORTED_EXTENSIONS.some((ext: string) => ext.toLowerCase() === fileExt.toLowerCase());
};
