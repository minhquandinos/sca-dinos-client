import { Provider } from '@angular/core';

import { SignupEmailVerificationApi } from './signup-email-verification.api';
import { SignupEmailVerificationService } from './signup-email-verification.service';

export const SIGNUP_VERIFICATION_PROVIDER: Provider[] = [SignupEmailVerificationApi, SignupEmailVerificationService];
