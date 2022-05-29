import { validationErrorInterpolation } from './translate-validation-error-interpolation.const';
import { TranslateValidationErrorsEnum, ValidationErrorsTranslateEnum } from './translate-validation-errors.enum';

export const VALIDATION_ERROR_MESSAGES: { [key: string]: RegExp } = {
    [TranslateValidationErrorsEnum.EmailAlreadyTaken]: /has already been taken/,
    [TranslateValidationErrorsEnum.GoalIdAlreadyTaken]: /Goal ID \d+ has already been taken./,
    [TranslateValidationErrorsEnum.BlankEmail]: /has already been taken/,
    [TranslateValidationErrorsEnum.IncorrectEmail]: /Incorrect email or password./,
    [TranslateValidationErrorsEnum.BlankPassword]: /Password cannot be blank./,
    [TranslateValidationErrorsEnum.NoUser]: /User not found/,
    [TranslateValidationErrorsEnum.ValidEmail]: /Email is not a valid email address./,
    [TranslateValidationErrorsEnum.AccountIsPendingApproval]: /Account is pending approval/,
    [TranslateValidationErrorsEnum.UnavailableLogin]: /Too many requests/,
    [TranslateValidationErrorsEnum.PaymentMethodBlank]: /Payment Methods Info cannot be blank./,
    [TranslateValidationErrorsEnum.AmountShouldHigherPaymentThreshold]: /Amount should be higher than payment method min. threshold/
};

export const VALIDATION_ERROR_MESSAGES_TRANSLATE_MAP = {
    [TranslateValidationErrorsEnum.EmailAlreadyTaken]: ValidationErrorsTranslateEnum.EmailAlreadyTaken,
    [TranslateValidationErrorsEnum.GoalIdAlreadyTaken]: ValidationErrorsTranslateEnum.GoalIdAlreadyTaken,
    [TranslateValidationErrorsEnum.BlankEmail]: ValidationErrorsTranslateEnum.BlankEmail,
    [TranslateValidationErrorsEnum.IncorrectEmail]: ValidationErrorsTranslateEnum.IncorrectEmail,
    [TranslateValidationErrorsEnum.BlankPassword]: ValidationErrorsTranslateEnum.BlankPassword,
    [TranslateValidationErrorsEnum.NoUser]: ValidationErrorsTranslateEnum.NoUser,
    [TranslateValidationErrorsEnum.ValidEmail]: ValidationErrorsTranslateEnum.ValidEmail,
    [TranslateValidationErrorsEnum.AccountIsPendingApproval]: ValidationErrorsTranslateEnum.AccountIsPendingApproval,
    [TranslateValidationErrorsEnum.UnavailableLogin]: ValidationErrorsTranslateEnum.UnavailableLogin,
    [TranslateValidationErrorsEnum.PaymentMethodBlank]: ValidationErrorsTranslateEnum.PaymentMethodBlank,
    [TranslateValidationErrorsEnum.AmountShouldHigherPaymentThreshold]: ValidationErrorsTranslateEnum.AmountShouldHigherPaymentThreshold
} as const;

export const INTERPOLATION_KEY: { [key: string]: any } = {
    [TranslateValidationErrorsEnum.EmailAlreadyTaken]: validationErrorInterpolation.emailAlreadyTaken,
    [TranslateValidationErrorsEnum.GoalIdAlreadyTaken]: validationErrorInterpolation.goalIdAlreadyTaken
};
