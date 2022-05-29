import { FileExtensionEnum, FileGroupEnum } from './available-file.enum';

export type FileExtensionType = keyof Record<FileExtensionEnum, string>;

type FileGroupType = keyof Record<FileGroupEnum, string>;

export type AcceptFileExtensionType = FileExtensionType | FileGroupType | Array<FileExtensionType | FileGroupType>;
