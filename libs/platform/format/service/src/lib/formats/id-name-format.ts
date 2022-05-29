import { BaseFormat } from './base-format';

export class IdNameFormat extends BaseFormat<string> {
    constructor(private readonly value: string, private readonly id: number) {
        super();
    }

    format(): string {
        if (this.id) {
            return `#${this.id}  ${this.value}`;
        }
        return `#${this.value.replace(' ', '  ')}`;
    }
}
