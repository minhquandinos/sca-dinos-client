import { Component, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { WindowRefService } from '@scaleo/core/window-ref/service';
import { DropdownEntityMenuModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'shared-layout-help-menu',
    templateUrl: './help-menu.component.html'
})
export class HelpMenuComponent {
    @HostBinding('class') hostClass = 'help-menu';

    readonly menu: DropdownEntityMenuModel[] = [
        {
            title: this.translate.stream('interface.header.help.help_site'),
            action: (): void => this.openLink(this.links.helpSite),
            icon: 'ic_question'
        },
        {
            title: this.translate.stream('interface.header.help.api_docs'),
            action: (): void => this.openLink(this.links.apiDocs),
            icon: 'ic_language',
            showDivider: true
        },
        {
            title: this.translate.stream('interface.header.help.feature_roadmap'),
            action: (): void => this.openLink(this.links.featureRoadmap),
            icon: 'ic_calendar'
        },
        {
            title: this.translate.stream('interface.header.help.suggest_a_feature'),
            action: (): void => this.openLink(this.links.suggestFeature),
            icon: 'ic_send'
        },
        {
            title: this.translate.stream('interface.header.help.what_new'),
            action: (): void => this.openLink(this.links.whatNew),
            icon: 'ic_speaker'
        }
        // {
        //     title: this.translate.stream('interface.header.help.chat_with_us'),
        //     action: (): any => this.openLink(this.links.chatWithUs),
        //     icon: 'ic_chat',
        //     showDivider: true
        // }
    ];

    private readonly links = {
        helpSite: 'https://help.scaleo.io',
        apiDocs: 'https://developers.scaleo.io',
        featureRoadmap: 'https://roadmap.scaleo.io/',
        suggestFeature: 'https://roadmap.scaleo.io/tabs/2-planned/submit-idea',
        whatNew: 'https://help.scaleo.io/category/467-release-notes',
        chatWithUs: ''
    };

    constructor(private readonly windowRefService: WindowRefService, private readonly translate: TranslateService) {}

    private openLink(link: string): void {
        this.windowRefService.nativeWindow.open(link);
    }
}
