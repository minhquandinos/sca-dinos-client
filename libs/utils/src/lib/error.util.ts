export class ErrorUtil {
    static errorMessage(error: { [key: string]: string }, key: string): string {
        return error[key];
    }

    static hasError(error: { [key: string]: string }, key: string): boolean {
        return !!error[key];
    }
}
