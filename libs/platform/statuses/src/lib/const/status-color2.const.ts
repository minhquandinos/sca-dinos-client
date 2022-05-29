import { ScaleoStatusesType } from '@scaleo/platform/list/access-data';

import { StatusInterface } from '../classes/status.interface';
import { StatusFactory } from '../classes/status-factory';

export const statusColor2Creator = (type: keyof Record<ScaleoStatusesType, string>, status: string | number): StatusInterface => {
    const newStatus = typeof status === 'string' ? status.toLowerCase() : status;
    const statusDotColor = new StatusFactory(type, newStatus);
    return statusDotColor?.create();
};
