import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class OtherOffersService {
    constructor(private formBuilder: FormBuilder) {}

    public addOffer(id?: number): FormGroup {
        return this.formBuilder.group({
            offer_id: id || null
        });
    }
}
