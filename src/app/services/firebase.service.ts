import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Location } from '@angular/common';

@Injectable()
export class FirebaseService {
listings: FirebaseListObservable<any[]>;
listing: FirebaseObjectObservable<any>;

auth: firebase.auth.Auth;
isLogged: boolean = false;

  constructor(private af: AngularFireDatabase, private angularFireAuth: AngularFireAuth, public location: Location) {
    this.auth = angularFireAuth.auth;
    
    this.listings = af.list('/listings');
    this.auth.onAuthStateChanged( (user: firebase.User) => {
            
            if ( user ) {
                this.isLogged = true;
            }
            else {
                this.isLogged = false;
            }
        }, e => {

        });
   }

   goBack(){
     this.location.back();
   }

    getListing(){
      this.listings = this.af.list("listings") as FirebaseListObservable<Listing[]>
      return this.listings;
  }
    getListingDetails(id){
      this.listing = this.af.object("/listings/"+id) as FirebaseObjectObservable<Listing>
      return this.listing;
    } 
    addListing(listing){

      this.listings.push(listing)
      
    }
    editlisting(key, listing){
      this.listings.update(key,listing)
      .then(res => {
        return res
      })
      .catch(e => console.log(e.message))
      
    }
    deleteListing(key){
      return this.listings.remove(key);
    }
}
interface Listing {
  $key?:string;
  title?:string;
  type?:string;
  image?:string;
  city?:string;
  owner?:string;
  bedrooms?:string;
}