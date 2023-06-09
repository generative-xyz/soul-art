import { MediaType } from '@/enums/file';

export const BLOCK_CHAIN_FILE_LIMIT = 330000;

export const ZIP_MIMES = [
  'application/zip',
  'application/x-zip-compressed',
  'multipart/x-zip',
];

export const NAIVE_MIMES: Record<string, string> = {
  html: 'text/html',
  js: 'text/javascript',
  css: 'text/css',
  csv: 'text/csv',
  json: 'application/json',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  png: 'image/png',
  svg: 'image/svg+xml',
};

export const JS_EXTENSION = 'js';
export const HTML_EXTENSION = 'html';
export const CSS_EXTENSION = 'css';
export const GLB_EXTENSION = 'glb';
export const JSON_EXTENSION = 'json';
export const ZIP_EXTENSION = 'zip';
export const STATIC_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png'];
export const IMAGE_EXTENSIONS = [
  'apng',
  'avif',
  'gif',
  'jpg',
  'jpeg',
  'jfif',
  'pjpeg',
  'pjp',
  'png',
  'svg',
  'webp',
  'bmp',
  'ico',
  'cur',
  'tif',
  'tiff',
];

export const SUPPORTED_FILE_EXT: Array<{ mediaType: MediaType; ext: string }> = [
  {
    mediaType: MediaType.IMAGE,
    ext: 'jpg',
  },
  {
    mediaType: MediaType.IMAGE,
    ext: 'jpeg',
  },
  {
    mediaType: MediaType.IMAGE,
    ext: 'png',
  },
  {
    mediaType: MediaType.IMAGE,
    ext: 'gif',
  },
  {
    mediaType: MediaType.IMAGE,
    ext: 'svg',
  },
  {
    mediaType: MediaType.IMAGE,
    ext: 'webp',
  },
  {
    mediaType: MediaType.IMAGE,
    ext: 'apng',
  },
  {
    mediaType: MediaType.MODEL_3D,
    ext: 'glb',
  },
  {
    mediaType: MediaType.VIDEO,
    ext: 'mp4',
  },
  {
    mediaType: MediaType.VIDEO,
    ext: 'webm',
  },
  {
    mediaType: MediaType.AUDIO,
    ext: 'flac',
  },
  {
    mediaType: MediaType.AUDIO,
    ext: 'mp3',
  },
  {
    mediaType: MediaType.AUDIO,
    ext: 'wav',
  },
  {
    mediaType: MediaType.IFRAME,
    ext: 'html',
  },
  {
    mediaType: MediaType.PDF,
    ext: 'pdf',
  },
  {
    mediaType: MediaType.TEXT,
    ext: 'json',
  },
  {
    mediaType: MediaType.TEXT,
    ext: 'txt',
  },
];

export const ERC721_SUPPORTED_EXTENSIONS = [
  ...STATIC_IMAGE_EXTENSIONS,
  ZIP_EXTENSION,
];
