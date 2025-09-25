import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly afAuth = inject(Auth);
  readonly user$: Observable<User | null> = authState(this.afAuth);


  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }


  logout() {
    return signOut(this.afAuth);
  }
}
