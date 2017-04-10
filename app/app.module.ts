import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  EventService,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe
} from './events/index';

import { EventsAppComponent } from './events-app-component';
import { NavBarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.service';

import { CollapsibleWellComponent } from "./common/collapsible-well.component";

import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import { AuthService } from './user/auth.service';

import { appRoutes } from './routes';

declare let toastr: Toastr;

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ 
    EventsAppComponent, 
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    EventRouteActivator,
    EventListResolver,
    AuthService,
    { provide: 'canDeactiveCreateEvent', useValue: checkDirtyState }
  ],
  bootstrap: [ EventsAppComponent ]
})
export class AppModule {
  
}

function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    console.log('dirty');
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}