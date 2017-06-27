import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  form: FormGroup;
  title:any;
  city:any;
  owner:any;
  bedrooms:any;
  type:any;
  image:any;
  price:any;
  folder: any;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router,
    private fb:FormBuilder,
    ) {
      this.folder = 'listingimages';
      this.form = fb.group({
            title:['', Validators.required],
            city:['', Validators.required],
            owner:['', Validators.required],
            bedrooms:['', Validators.required],
            type:['Estate', Validators.required],
            price:['', Validators.required],
            image:['', Validators.required]
        });
     }

  ngOnInit() {
  }
  onChangeFileUpload(fileInput) {
      let file = fileInput.files[0];

      let storageRef = firebase.storage().ref();
      let path = `/${this.folder}/${file.name}`;
      let iRef = storageRef.child(path);

      iRef.put(file).then((snapshot) => {
          this.form.patchValue({
              image: snapshot.downloadURL
          })
      });
   
  }
  onSubmit() {
    let listing = {
      title: this.form.value.title,
      city: this.form.value.city,
      owner: this.form.value.owner,
      bedrooms: this.form.value.bedrooms,
      type: this.form.value.type,
      price: this.form.value.price,
      image: this.form.value.image
    }
    this.firebaseService.addListing(listing);
    this.router.navigate(['listings']);
  }
    
      
    
  // onAddSubmit(){
  //   let listing = {
  //     title: this.title,
  //     city: this.city,
  //     owner: this.owner,
  //     bedrooms: this.bedrooms,
  //     type: this.type,
  //     price: this.price,
  //   }
  //     this.firebaseService.addListing(listing);
  //     this.router.navigate(['listings']);

  // }

  goBack() {
  this.firebaseService.goBack()
}
}
