import { Injectable } from '@angular/core';
import { setPersistence } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { Auth, user, User, browserSessionPersistence, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;

  constructor(private firebaseAuth: Auth) { 
    this.user$ = user(this.firebaseAuth);
    this.setSessionStoragePersistence();
  }

  private setSessionStoragePersistence():void{
    setPersistence(this.firebaseAuth, browserSessionPersistence);
  }

  //Metodo para el login
  login(email:string, password:string) : Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, email, password)
      .then(() => {
        console.log('Usuario atentificado correctamente')
      });
      return from(promise);
  }

  //Método para el logout
  logout():Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      sessionStorage.clear();
    });
    return from(promise);
  }

}
