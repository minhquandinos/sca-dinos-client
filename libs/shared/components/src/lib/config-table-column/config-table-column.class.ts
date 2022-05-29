import { HttpClient } from '@angular/common/http';

/*
 * @deprecated
 * */
export class ConfigTableColumnClass {
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    public listToTree(params: any): any[] {
        const newParameters: any = [];
        params.forEach((param: any) => {
            const group = newParameters.find((p: any) => p.title === param.group);
            if (!group && (!!param.level == false || param.level === 1)) {
                newParameters.push({
                    title: param.group,
                    key: param.group.replace(/ /g, '_').toLowerCase(),
                    groupSort: param.groupSort,
                    reportSort: param.reportSort,
                    items: [
                        {
                            ...param,
                            children: []
                        }
                    ]
                });
            }

            if (group && (!!param.level === false || param.level === 1)) {
                group.items.push({
                    ...param,
                    children: []
                });
            }
        });

        params.forEach((param: any) => {
            if (!!param.parent && param.level > 1) {
                newParameters.forEach((p: any) => {
                    const findIndex = p.items.findIndex((p2: any) => p2.key === param.parent);
                    if (!!findIndex && findIndex !== -1) {
                        p.items[findIndex].children.push(param);
                    }
                });
            }
        });

        return newParameters
            .sort((a: any, b: any) => a.groupSort - b.groupSort)
            .map((obj: any) => {
                obj.items.sort((a1: any, b1: any) => a1.sort - b1.sort);
                return obj;
            });
    }
}
