import { BaseStatusIdEnum, BaseStatusNameEnum, BaseStatusTranslateEnum } from '../../enums/statusses';

export const BASE_STATUS_TRANSLATE_MAP = Object.freeze({
    [BaseStatusIdEnum.Active]: BaseStatusTranslateEnum.Active,
    [BaseStatusIdEnum.Pending]: BaseStatusTranslateEnum.Pending,
    [BaseStatusIdEnum.Inactive]: BaseStatusTranslateEnum.Inactive
});

export const baseMatchStatus = (status: BaseStatusNameEnum | BaseStatusIdEnum): any =>
    entityStatusMatch<BaseStatusNameEnum, BaseStatusIdEnum>(BaseStatusNameEnum, BaseStatusIdEnum, status);

// TODO NX fixed any
export const entityStatusMatch = <StatusNameEnum, StatusIdEnum>(
    statusNameEnum: unknown, // TODO StatusNameEnum,
    statusIdEnum: unknown, // TODO StatusIdEnum,
    status: StatusNameEnum | StatusIdEnum
): StatusNameEnum | StatusIdEnum => {
    const map = Object.keys(statusNameEnum).reduce((obj: any, item: any) => {
        const key: any = (statusNameEnum as any)[item];
        obj[key] = (statusIdEnum as any)[item];

        return obj;
    }, {});

    if (typeof status === 'string') {
        return map[status as any];
    }

    if (typeof status === 'number') {
        const mapReverse = Object.fromEntries(Object.entries(map).map((elem) => elem.reverse()));
        return mapReverse[status];
    }

    return undefined;
};
