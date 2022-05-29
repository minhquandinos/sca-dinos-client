import { AcceptFileExtensionType, FILE_EXTENSION_MIME } from '@scaleo/platform/data';

// TODO NX remove any
export const acceptMimesUtil = (accept: AcceptFileExtensionType): string => {
    const fileExtensionMime = FILE_EXTENSION_MIME;

    if (Array.isArray(accept)) {
        return accept
            .map((elem: any) => {
                const mime = (fileExtensionMime as any)[elem];
                if (mime) {
                    return mime;
                }

                return undefined;
            })
            .join(',');
    }

    if (typeof accept === 'string') {
        const mime = (fileExtensionMime as any)[accept];
        if (mime) {
            return mime;
        }
    }

    return undefined;
};
