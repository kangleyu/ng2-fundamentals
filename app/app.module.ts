import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  EventService
} from './events/index';

import { EventsAppComponent } from './events-app-component';
import { NavBarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.service';

import { ToastrService } from './common/toastr.service';

import { appRoutes } from './routes';

@NgModule({
  imports: [ 
    BrowserModule, 
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ 
    EventsAppComponent, 
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component
  ],
  providers: [
    EventService,
    ToastrService,
    EventRouteActivator,
    EventListResolver,
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