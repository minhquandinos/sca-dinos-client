import { BaseObjectModel } from '@scaleo/core/data';

export const validationErrorInterpolation = (() => {
    const emailAlreadyTaken = (error: string): BaseObjectModel | string => {
        if (!error) {
            return undefined;
        }
        const email = error.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)?.[0];
        return email ? { email } : undefined;
    };

    const goalIdAlreadyTaken = (error: string): BaseObjectModel | undefined => {
        if (!error) {
            return undefined;
        }
        const goalId = error.match(/\d+/g)?.[0];
        return goalId ? { goalId } : undefined;
    };

    return {
        emailAlreadyTaken,
        goalIdAlreadyTaken
    };
})();
