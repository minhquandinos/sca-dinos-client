import { Filter2Interface, LocalStorageFilterInterface } from './filter2.interface';

export class LocalStorageClass {
    storageName: string;

    constructor(storageName: string) {
        this.storageName = storageName;
    }

    private static clearEmptyValue(data: Filter2Interface): Filter2Interface {
        const copyData = JSON.parse(JSON.stringify(data));

        if (copyData.params) {
            // delete copyData.params.page;
            delete copyData.params.search;
            delete copyData.params.rangeFrom;
            delete copyData.params.rangeTo;
            delete copyData.params.page;
        }

        Object.keys(copyData).forEach((key) => {
            const childObj = Object.keys(copyData[key]);
            if (childObj.length > 0) {
                childObj.forEach((key2) => {
                    if (!copyData[key][key2]) {
                        delete copyData[key][key2];
                    }
                });
            } else {
                delete copyData[key];
            }
        });

        return copyData;
    }

    parse(): Filter2Interface {
        const data = this.get();
        if (data) {
            const filters: Filter2Interface = {};

            if (data.params) {
                filters.params = {
                    ...data.params
                };
            }

            if (data.payload) {
                filters.payload = { ...data.payload };
            }

            return filters || null;
        }

        return null;
    }

    get(): LocalStorageFilterInterface {
        return JSON.parse(localStorage.getItem(this.storageName));
    }

    store(data: Filter2Interface): void {
        const copyData = LocalStorageClass.clearEmptyValue(data);

        localStorage.setItem(this.storageName, JSON.stringify(copyData));
    }
}
