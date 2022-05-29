import { FileExtensionEnum } from '@scaleo/platform/data';

export type FileFormatType = 'csv' | 'xls' | 'xlsx'; //FileFormatType

export type SheetExtensionType = FileExtensionEnum.CSV | FileExtensionEnum.XLSX | FileExtensionEnum.XLS | string; // ExportFileFormatType
