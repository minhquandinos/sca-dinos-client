import { ReturnConcreteType } from '@scaleo/core/data';

import { MANAGER_NAVIGATION_PATH } from './manager-navigation';
import { ManagerPathResolverService } from './services/manager-navigation.service';

export type ManagerNavigationPathType = ReturnConcreteType<typeof MANAGER_NAVIGATION_PATH>;

export type ManagerPathResolverType = ReturnConcreteType<ManagerPathResolverService>;
