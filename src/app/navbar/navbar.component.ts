import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from '../services/firebase.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth, 
    public firebaseService:FirebaseService,
    public flash:FlashMessagesService,
    private router: Router ) {}
  

      // this.user = afAuth.authState;
 
  ngOnInit() {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  };
  
  logout() {
    this.afAuth.auth.signOut()
    .then(() => {
    this.flash.show('Successfully logged out', {
        cssClass: 'alert-success', timeout:3000
      });
    })
    .then(() => {
      this.router.navigate(['./'])
    })
  };
  

  }

