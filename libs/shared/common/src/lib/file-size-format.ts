type FileSizeType = 'BT' | 'KB' | 'MB' | 'GB' | 'TB' | 'auto';

export enum FileSizeEnum {
    BT = 'BT',
    KB = 'KB',
    MB = 'MB',
    GB = 'GB',
    TB = 'TB',
    Auto = 'auto'
}

// TODO think about places for this file
export class FileSizeFormat {
    private kb = 1024;

    private readonly _sizes = [FileSizeEnum.BT, FileSizeEnum.KB, FileSizeEnum.MB, FileSizeEnum.GB, FileSizeEnum.TB];

    private readonly _sizeFormat: FileSizeType = 'auto';

    constructor(private bytes: number, private format?: FileSizeType) {
        if (format) {
            this._sizeFormat = format;
        }
    }

    get size(): number {
        return this.calculateSize;
    }

    get sizeFormat(): string {
        return this.calculateFormat;
    }

    private get calculateSize(): number {
        if (this.bytes === 0) {
            return 0;
        }

        const kb = 1024;

        switch (this._sizeFormat) {
            case FileSizeEnum.KB:
                return this.bytes / kb;
            case FileSizeEnum.MB:
                return this.bytes / kb ** 2;
            case FileSizeEnum.GB:
                return this.bytes / kb ** 3;
            case FileSizeEnum.TB:
                return this.bytes / kb ** 4;
            case FileSizeEnum.Auto:
            default:
                return this.calcSize;
        }
    }

    private get calculateFormat(): string {
        if (this._sizeFormat === 'auto') {
            return this._sizes[this.calcUnit];
        }

        return this._sizeFormat;
    }

    private get calcUnit() {
        return Math.floor(Math.log(this.bytes) / Math.log(this.kb));
    }

    private get calcSize(): number {
        // eslint-disable-next-line no-restricted-properties
        return parseFloat((this.bytes / Math.pow(this.kb, this.calcUnit)).toFixed(0));
    }
}
