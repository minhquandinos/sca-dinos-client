import { Pipe, PipeTransform } from '@angular/core';

// import { SignUpFieldsEnum } from '../../../../affiliates/page/src/lib/components/affiliate-signup/sign-up-fields.enum';
// import { SignUpFieldForAdvertiserEnum } from '../../../../../../../../apps/scaleo/src/app/panel/admin/settings/advertisers/advertiser-signup/sign-up-field-for-advertiser.enum';

enum SignUpFieldForAdvertiserEnum {
    Email = 10,
    Password = 11
}

enum SignUpFieldsEnum {
    Email = 6,
    Password = 7
}

@Pipe({
    name: 'scaleoMngSettingsForbiddenFieldsForRemove'
})
export class ForbiddenFieldsForRemovePipe implements PipeTransform {
    transform(value: number, type: 'affiliate' | 'advertiser'): boolean {
        let forbiddenFieldForRemove: number[] = [];

        if (type === 'advertiser') {
            forbiddenFieldForRemove = [SignUpFieldForAdvertiserEnum.Email, SignUpFieldForAdvertiserEnum.Password];
        }

        if (type === 'affiliate') {
            forbiddenFieldForRemove = [SignUpFieldsEnum.Email, SignUpFieldsEnum.Password];
        }

        return !forbiddenFieldForRemove.includes(+value);
    }
}
