import { ElementRef } from '@angular/core';

export const formUtil = ((): any => {
    const scrollToFirstInvalidControl = (
        formContainer: ElementRef,
        options?: {
            focus?: boolean;
        }
    ): void => {
        setTimeout(() => {
            const firstInvalidControl = formContainer.nativeElement.querySelector('.ng-invalid');
            if (firstInvalidControl) {
                firstInvalidControl.scrollIntoView({ block: 'center', behavior: 'smooth' });

                if (options?.focus) {
                    firstInvalidControl.focus();
                }
            }
        }, 0);
    };

    return {
        scrollToFirstInvalidControl
    };
})();
