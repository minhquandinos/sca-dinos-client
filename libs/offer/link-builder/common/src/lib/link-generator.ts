import { FormGroup } from '@angular/forms';

interface SubIdModel {
    key: string;
    value: string;
}

export class LinkGenerator {
    public generateLink(form: FormGroup, domain?: string, defaultLinkId?: number): string {
        const linksParams = this.transformFormValueToLinkParams(form, defaultLinkId);
        return `${domain}/click?${linksParams}`;
    }

    public generateImpressionsUrl(form: FormGroup, domain: string, defaultLinkId?: number): string {
        const linksParams = this.transformFormValueToLinkParams(form, defaultLinkId);
        const url = `${domain}/imp?${linksParams}`;
        return `<img src="${url}" height="1" width="1" />`;
    }

    private transformFormValueToLinkParams(form: FormGroup, defaultLinkId?: number): string {
        const value = form.getRawValue();
        let valueForLink: string[] = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const k in value) {
            if (!value[k]) {
                delete value[k];
            }
        }
        Object.keys(value).forEach((k) => {
            if (k === 'sub_ids') {
                const subids = this.generateSubIds(value[k]);
                valueForLink = [...valueForLink, ...subids];
            } else if (!(defaultLinkId && k === 'link_id' && value[k] === defaultLinkId)) {
                const item = `${k}=${value[k]}`;
                valueForLink.push(item);
            }
        });
        return valueForLink.join('&');
    }

    private generateSubIds(subIds: SubIdModel[] = []): string[] {
        return subIds.filter((subId) => subId.value).map((subId: SubIdModel) => `${subId.key}=${subId.value}`);
    }
}
