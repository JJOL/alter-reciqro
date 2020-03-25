import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AuthMemoryService } from './auth-memory.service';

describe('AuthMemoryService', () => {

  let authService: AuthService;

  // beforeEach(() => TestBed.configureTestingModule({
  //   providers: [AuthService]
  // }));

  // beforeEach(inject([AuthService], auth => authService = auth));

  beforeEach(() => {
    // authService = new AuthMemoryService();
    authService = TestBed.get(AuthService);
  })

  it('should allow login known user', () => {
    const username = 'jjol';
    const password = 'Machango12';

    const result = authService.login(username, password);

    expect(result).toBe(true);
  });

  it('should not allow login unknown user', () => {
    const username = 'perro1';
    const password = 'Queso';

    const result = authService.login(username, password);

    expect(result).toBe(false);
  });

  it('should return a logged session from a logged user', () => {
    const username = 'jjol';
    const password = 'Machango12';

    authService.login(username, password);
    const session = authService.getLoggedSession();

    expect(session.isUserLogged).toBe(true);
  });

  it('should return a not logged session from a non logged user', () => {
    const session = authService.getLoggedSession();

    expect(session.isUserLogged).toBe(false);
  });

  it('should logout users', () => {
    const username = 'jjol';
    const password = 'Machango12';

    authService.login(username, password);
    const loginSession = authService.getLoggedSession();
    expect(loginSession.isUserLogged).toBe(true);

    authService.logout();
    const logoutSession = authService.getLoggedSession();
    expect(logoutSession.isUserLogged).toBe(false);
  });


});
