import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[ui-custom-toast-component]',
    templateUrl: `./custom-toast.component.html`,
    animations: [
        trigger('flyInOut', [
            state(
                'inactive',
                style({
                    top: '-64px'
                })
            ),
            transition(
                'inactive => active',
                animate(
                    '400ms ease-out',
                    keyframes([
                        style({
                            top: '-64px'
                        }),
                        style({
                            top: 0
                        })
                    ])
                )
            ),
            transition(
                'active => removed',
                animate(
                    '400ms ease-out',
                    keyframes([
                        style({
                            top: 0
                        }),
                        style({
                            top: '-64px'
                        })
                    ])
                )
            )
        ])
    ],
    preserveWhitespaces: false
})
export class CustomToastComponent extends Toast {
    // used for demo purposes
    undoString = 'undo';

    // constructor is only necessary when not using AoT
    constructor(protected toastrService: ToastrService, public toastPackage: ToastPackage) {
        super(toastrService, toastPackage);
    }

    action(event: Event) {
        event.stopPropagation();
        this.undoString = 'undid';
        this.toastPackage.triggerAction();
        return false;
    }
}
