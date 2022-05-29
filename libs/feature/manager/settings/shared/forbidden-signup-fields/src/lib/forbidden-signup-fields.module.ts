import { NgModule } from '@angular/core';

import { ForbiddenFieldsForRemovePipe } from './forbidden-fields-for-remove.pipe';

@NgModule({
    declarations: [ForbiddenFieldsForRemovePipe],
    exports: [ForbiddenFieldsForRemovePipe]
})
export class ForbiddenSignupFieldsModule {}
