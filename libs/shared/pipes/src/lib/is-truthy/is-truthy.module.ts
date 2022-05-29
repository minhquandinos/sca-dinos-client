import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IsTruthyPipe } from './is-truthy.pipe';

@NgModule({
    declarations: [IsTruthyPipe],
    exports: [IsTruthyPipe],
    imports: [CommonModule]
})
export class IsTruthyModule {}
