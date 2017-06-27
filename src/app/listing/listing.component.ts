import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  id: any;
  listing: any;
  imageUrl: any;
  

  constructor(
    private firebaseService:FirebaseService,
    private router:Router,
    private routes:ActivatedRoute
    ) {
      // if(!firebaseService.isLogged) {
      //   router.navigate(['/']);
      // }
      // console.log(firebaseService.isLogged);
     }

  ngOnInit() {
    this.id = this.routes.snapshot.params['id'];

    this.firebaseService.getListingDetails(this.id)
    .subscribe(listing => {
      this.listing = listing;
    },e => {
      console.log("No Data Found");
    });
    
}
  goBack() {
  this.firebaseService.goBack()
}
  onDelete(){
    this.firebaseService.deleteListing(this.listing);
    
    this.router.navigate(['/listings']);
  }  
}
