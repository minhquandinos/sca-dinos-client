export interface AuthEndpointsModel {
    signupTwoFa: string;
    signupAdvertiser: string;
    signupAffiliate: string;
    getToken: string;
    login: string;
    loginTwoFa: string;
    loginRemote: string;
    loginBy: string;
    passwordReset: string;
    passwordResetCheck: string;
    passwordChange: string;
}

export const AUTH_API_ENDPOINTS: Readonly<AuthEndpointsModel> = {
    signupTwoFa: '/users-two-fa/signup',
    signupAdvertiser: '/signup/advertiser',
    signupAffiliate: '/signup/affiliate',
    getToken: '/user/get-token',
    login: '/user/login',
    loginTwoFa: '/user/two-fa-login',
    loginRemote: '/user/remote-login',
    loginBy: 'login-by',
    passwordReset: '/user/password-reset',
    passwordResetCheck: '/user/password-reset-check',
    passwordChange: '/user/password-change/{passwordResetToken}'
} as const;
