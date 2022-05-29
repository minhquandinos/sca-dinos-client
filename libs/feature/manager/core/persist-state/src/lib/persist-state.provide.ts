// import { Provider } from '@angular/core';
// import { persistState } from '@datorama/akita';
// import { debounceTime } from 'rxjs/operators';
//
// import { INCLUDE_PERSIST_STATE, KEY_PERSIST_STATE } from './manager-persist-state-config';
// import { PersistStateUtil } from './persist-state.util';
//
// const storage = persistState({
//     key: KEY_PERSIST_STATE,
//     include: Object.keys(INCLUDE_PERSIST_STATE),
//     // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
//     preStorageUpdate(storeName: string, state: any) {
//         return PersistStateUtil.preStorageUpdate(storeName, state, (window as any)?.['__persist_role']);
//     },
//     // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
//     preStoreUpdate(storeName, state: any, initialState: any) {
//         return PersistStateUtil.preStoreUpdate(storeName, state, initialState, (window as any)?.['__persist_role']);
//     },
//     preStorageUpdateOperator: () => debounceTime(300)
// });

// eslint-disable-next-line @typescript-eslint/naming-convention
// export const PersistStateStorageProvider: Provider = {
//     provide: 'persistStorage',
//     useValue: storage,
//     multi: true
// };
