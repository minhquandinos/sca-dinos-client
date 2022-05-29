import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '@scaleo/core/shared/module';
import { ValidationMessage2SharedModule } from '@scaleo/shared/components/validation-message2';

import { WysiwygEditorComponent } from './wysiwyg-editor.component';

@NgModule({
    declarations: [WysiwygEditorComponent],
    imports: [CommonModule, QuillModule, SharedModule, ValidationMessage2SharedModule],
    exports: [WysiwygEditorComponent]
})
export class WysiwygEditorModule {}
