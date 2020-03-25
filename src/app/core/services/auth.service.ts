import { Injectable } from '@angular/core';

import { LoginSession } from '../models/login-session';
import { AuthMemoryService } from './auth-memory.service';

@Injectable({
  providedIn: 'root',
  useClass: AuthMemoryService
})
export abstract class AuthService {

  abstract login(username: string, password: string): boolean;

  abstract logout(): void;

  abstract getLoggedSession(): LoginSession;
}
