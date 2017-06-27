import { Form } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
   form: FormGroup;
    title:any;
    city:any;
    owner:any;
    bedrooms:any;
    type:any;
    image:any;
    price:any;
    folder: any;
 
    category_key: string;

  constructor(
    private firebaseService:FirebaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb:FormBuilder
    ) {
      this.form = fb.group({
            title:['', Validators.required],
            city:['', Validators.required],
            owner:['', Validators.required],
            bedrooms:['', Validators.required],
            type:['Estate', Validators.required],
            price:['', Validators.required],
            image:['', Validators.required]
      });
      this.activatedRoute.params.subscribe((params: Params) => {
      this.firebaseService.getListingDetails(params["id"])
         .subscribe(res => {
           this.category_key = params["id"]
      this.form.patchValue({
            title:[res.title],
            city:[res.city],
            owner:[res.owner],
            bedrooms:[res.bedrooms],
            type:[res.type],
            price:[res.price],
            image:[res.image]             
        });
         });
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
    this.firebaseService.editlisting(this.category_key, listing)
    this.router.navigate(['listings']);
  }
}
