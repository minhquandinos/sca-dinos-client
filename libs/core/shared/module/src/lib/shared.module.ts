import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'ng2-tooltip-directive';
import { AutosizeModule } from 'ngx-autosize';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgSelectModule,
        TooltipModule.forRoot({
            'tooltip-class': 'custom-tooltip',
            placement: 'bottom',
            'show-delay': 0,
            'hide-delay': 100,
            'animation-duration': 100
        }),
        UiSwitchModule.forRoot({
            size: 'medium',
            color: '#ffffff',
            switchColor: '#ffffff',
            defaultBgColor: '#ffffff',
            defaultBoColor: '#dde3e7',
            checkedLabel: '',
            uncheckedLabel: ''
        }),
        TranslateModule,
        AutosizeModule,
        NgxPermissionsModule.forChild()
    ],
    exports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        TooltipModule,
        UiSwitchModule,
        TranslateModule,
        NgxPermissionsModule
    ]
})
export class SharedModule {}
