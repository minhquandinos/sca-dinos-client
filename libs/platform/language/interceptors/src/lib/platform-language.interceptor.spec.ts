import { TestBed } from '@angular/core/testing';

import { PlatformLanguageInterceptor } from './platform-language.interceptor';

describe('PlatformLanguageInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PlatformLanguageInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PlatformLanguageInterceptor = TestBed.inject(PlatformLanguageInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
