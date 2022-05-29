import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { LinkComponent } from './link/link.component';
import { LinkGroupComponent } from './link-group.component';

@NgModule({
    declarations: [LinkGroupComponent, LinkComponent],
    exports: [LinkGroupComponent, LinkComponent],
    imports: [CommonModule, SharedModule, UiSvgIconModule]
})
export class LinkGroupModule {}
