import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { UserApiService } from './core/services/user-api.service';
import { UserService } from './core/services/user.service';
import { AuthService } from './core/services/auth.service';

export function initializeApp(userApiService: UserApiService, userService: UserService, authService: AuthService) {
  return () => {
    userApiService.fetchUserDataByToken().subscribe((user) => {
      if (!user) {
        authService.setIsAuth(false)
        return
      }
      userService.setUser(user)
      authService.setIsAuth(true)
    });
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [UserApiService, UserService, AuthService],
      multi: true,
    },
  ]
};
