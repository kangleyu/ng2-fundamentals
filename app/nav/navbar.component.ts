import { Component } from "@angular/core";
import { EventService, ISession } from "../events/shared/index";
import { AuthService } from "../user/auth.service";

@Component({
  selector: "nav-bar",
  templateUrl: "app/nav/navbar.component.html",
  styles: [`
    .nav.navbar-nav { font-size: 15px }
    #searchForm { margin-right: 100px; }
    @media (max-width: 1200px) { #searchForm { display:none }}
    li > a.active { color: #f97924; }
  `],
})
export class NavBarComponent {
  public searchTerm: string = "";
  public foundSessions: ISession[];

  constructor(
    private auth: AuthService,
    private eventService: EventService) {

  }

  public searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe((sessions) => {
      this.foundSessions = sessions;
    });
  }
}
