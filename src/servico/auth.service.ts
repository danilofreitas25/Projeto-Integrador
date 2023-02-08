import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularAuth: AngularFireAuth
  ) { }

  //Autenticar um usuario existente
    loginUser(user){
      return this.angularAuth.signInWithEmailAndPassword(user.email, user.password);
    }

    //create user
    createUser(user){
      return this.angularAuth.createUserWithEmailAndPassword(user.email, user.password);
    }

    //logout do usuario
    logoutUser(){
      return this.angularAuth.signOut();
    }
  
    //Obtem informações do usuario
    getAuth(){
      return this.angularAuth;
    }

    
}
