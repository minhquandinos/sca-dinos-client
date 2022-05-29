import { FileExtensionEnum, FileGroupEnum } from './available-file.enum';

export const FILE_EXTENSION_MIME = Object.freeze({
    [FileGroupEnum.All]: '*/*',
    [FileGroupEnum.AllImage]: 'image/*',
    [FileExtensionEnum.CSV]: 'text/csv',
    [FileExtensionEnum.PNG]: 'image/png',
    [FileExtensionEnum.JPEG]: 'image/jpeg',
    [FileExtensionEnum.PDF]: 'application/pdf',
    [FileExtensionEnum.DOC]: 'application/msword',
    [FileExtensionEnum.DOCX]: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    [FileExtensionEnum.XLS]: 'application/vnd.ms-excel',
    [FileExtensionEnum.XLSX]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    [FileExtensionEnum.TXT]: 'text/plain',
    [FileExtensionEnum.ZIP]: 'application/zip'
});
