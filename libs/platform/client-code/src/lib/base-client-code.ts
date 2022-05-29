export abstract class BaseClientCode {
    protected insertDom(code: string): void {
        const fragment = document.createRange().createContextualFragment(code);
        document.querySelector('body').appendChild(fragment);
    }

    protected abstract get script(): string;
}
