export class StringUtil {
    static matchNum(value: string | unknown): number | undefined {
        const num = typeof value === 'string' ? value?.match(/\d+/g) : undefined;
        return num ? +num?.[0] : undefined;
    }
}
