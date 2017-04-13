import { Routes } from "@angular/router";

import {
  CreateEventComponent,
  CreateSessionComponent,
  EventDetailsComponent,
  EventListResolver,
  EventResolver,
  EventRouteActivator,
  EventsListComponent,
} from "./events/index";

import { Error404Component } from "./errors/404.service";

export const appRoutes: Routes = [
  { path: "events/new", component: CreateEventComponent, canDeactivate: ["canDeactiveCreateEvent"] },
  { path: "events", component: EventsListComponent, resolve: { events: EventListResolver } },
  { path: "events/:id", component: EventDetailsComponent, resolve: { event: EventResolver } },
  { path: "events/session/new", component: CreateSessionComponent },
  { path: "404", component: Error404Component },
  { path: "", redirectTo: "/events", pathMatch: "full" },

  { path: "user", loadChildren: "app/user/user.module#UserModule" },
];
