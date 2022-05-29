export abstract class BaseFormat<T> {
    abstract format(...args: any[]): T;
}
