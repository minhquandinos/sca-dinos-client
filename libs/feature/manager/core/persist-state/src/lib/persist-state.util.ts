// import { PersistStateInterface } from '@scaleo/core/state/persist-state';
// import { RoleEnum } from '@scaleo/platform/role/models';
//
// import { INCLUDE_PERSIST_STATE, KEY_PERSIST_STATE } from './manager-persist-state-config';
//
// export class PersistStateUtil implements PersistStateInterface {
//     static preStorageUpdate(storeName: string, state: any, role: RoleEnum): any {
//         const stateClass = INCLUDE_PERSIST_STATE[storeName];
//
//         if (stateClass && role) {
//             const newStorageState = stateClass(storeName, state).storageState();
//             const getRoleStore = JSON.parse(localStorage.getItem(`${KEY_PERSIST_STATE}__${role}`)) || {};
//
//             localStorage.setItem(`${KEY_PERSIST_STATE}__${role}`, JSON.stringify({ ...getRoleStore, [storeName]: newStorageState }));
//             return newStorageState;
//         }
//
//         return state;
//     }
//
//     static preStoreUpdate(storeName: string, state: any, initialState: any, role: RoleEnum): any {
//         const getRoleStore = JSON.parse(localStorage.getItem(`${KEY_PERSIST_STATE}__${role}`));
//         const stateClass = INCLUDE_PERSIST_STATE[storeName];
//
//         if (stateClass && role) {
//             return stateClass(storeName, state).restoreState(initialState, getRoleStore);
//         }
//
//         return state;
//     }
// }
