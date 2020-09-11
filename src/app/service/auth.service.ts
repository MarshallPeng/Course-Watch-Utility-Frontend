import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {auth} from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user$: Observable<any>;
    isLoading;
    userDetails: firebase.User = null;
    hasError;


    constructor(private afAuth: AngularFireAuth, private router: Router) {
        this.isLoading = true;
        this.hasError = false;
        this.user$ = this.afAuth.authState;
        this.user$.subscribe(user => {
            this.isLoading = false;
            if (user) {
                this.userDetails = user;
            } else {
                this.userDetails = null;
            }
        });
    }

    register(email, password) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                window.alert('You have been successfully registered!');
                console.log(result.user);
            }).catch((error) => {
                window.alert(error.message + ' Please make sure that email and password are filled in above');
            });
    }

    signIn(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.hasError = false;
                this.router.navigate(['/home']);
            }).catch((error) => {
                this.hasError = true;
            });
    }

    signOut() {
        return this.afAuth.auth.signOut().then((result) => {
            window.alert('Successfully Signed Out');
            this.router.navigate(['/home']);
        }).catch((error) => {
            window.alert(error.message);
        });
    }

    fbLogin() {
        return this.authLogin(new auth.FacebookAuthProvider());
    }

    googleLogin() {
        return this.authLogin(new auth.GoogleAuthProvider());
    }

    authLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                console.log('You have been successfully logged in!');
            }).catch((error) => {
                console.log(error);
            });
    }

}
