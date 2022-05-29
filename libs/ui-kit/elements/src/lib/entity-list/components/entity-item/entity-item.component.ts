import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

import { EntityItemTemplateDirective } from '../../entity-item-template.directive';

@Component({
    selector: 'app-entity-item',
    templateUrl: './entity-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityItemComponent implements OnInit {
    @Input() label: string;

    @Input() value: unknown;

    @Input() className: string;

    @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(EntityItemTemplateDirective, { static: true }) itemTemplateDir: EntityItemTemplateDirective;

    constructor() {}

    ngOnInit(): void {}

    clickHandler() {
        this.toggle.emit(this.value);
    }

    get itemTpl(): TemplateRef<any> {
        return this.itemTemplateDir && this.itemTemplateDir.tpl;
    }

    get itemTplContext(): unknown {
        return { $implicit: this.value };
    }
}
