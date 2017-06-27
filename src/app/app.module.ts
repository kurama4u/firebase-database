import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FirebaseService } from './services/firebase.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { environment } from './../environments/environment';
import { ListingComponent } from './listing/listing.component';
import { ListingsComponent } from './listings/listings.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'listings', component: ListingsComponent},
  {path: 'listing/:id', component: ListingComponent},
  {path: 'add-listing', component: AddListingComponent},
  {path: 'edit-listing/:id', component: EditListingComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ListingComponent,
    ListingsComponent,
    AddListingComponent,
    EditListingComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    FlashMessagesModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    

  ],
  providers: [FirebaseService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
