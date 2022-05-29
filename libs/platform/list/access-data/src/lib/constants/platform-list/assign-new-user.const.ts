import { AssignNewUserIdEnum, AssignNewUserTranslateEnum } from '../../enums/platform-list';
import { PlatformListsFormatModel } from '../../models/platform-list.model';

export const ASSIGN_NEW_USER_TRANSLATE_MAP = {
    [AssignNewUserIdEnum.All]: AssignNewUserTranslateEnum.All,
    [AssignNewUserIdEnum.Random]: AssignNewUserTranslateEnum.Random
} as const;

export const ASSIGN_NEW_USER_MAP: PlatformListsFormatModel[] = [
    {
        id: AssignNewUserIdEnum.All,
        title: 'All Selected Managers'
    },
    {
        id: AssignNewUserIdEnum.Random,
        title: 'Random Manager'
    }
];
