import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; // Import firebase app
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly authState$: Observable<firebase.User | null>;

  constructor(public afAuth: AngularFireAuth) {
    this.authState$ = this.afAuth.authState;
  }

  // Sign in with Google
  googleSignIn(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  // Sign out
  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    // Optionally, you can redirect or perform other actions after sign-out
  }
}
