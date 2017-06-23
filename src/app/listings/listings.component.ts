import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})

export class ListingsComponent implements OnInit {

 listings: any;

  constructor(private firebaseService:FirebaseService,private router:Router) {
    if(!firebaseService.isLogged) {
        router.navigate(['/']);
      }
  }
 

 ngOnInit(){
    this.firebaseService.getListing().subscribe(listings => {
    this.listings = listings;
  });
 }
  

}
