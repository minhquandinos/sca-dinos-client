import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'offerDistributionAbTestingCountLetter'
})
export class OfferDistributionAbTestingCountLetterPipe implements PipeTransform {
    transform(index: number): string {
        return OfferDistributionAbTestingCountLetterPipe.letter(index);
    }

    private static letter(index: number): string {
        const ordA = 'a'.charCodeAt(0);
        const ordZ = 'z'.charCodeAt(0);
        const len = ordZ - ordA + 1;

        let s = '';
        while (index >= 0) {
            s = String.fromCharCode((index % len) + ordA) + s;
            index = Math.floor(index / len) - 1;
        }
        return s.toUpperCase();
    }
}
