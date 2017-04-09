import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'event-thumbnail',
  templateUrl: 'app/events/event-thumbnail.component.html',
  styles: [`
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
    .thumbnail { min-height: 210px; }
  `]
})
export class EventThumbnailComponent {
  @Input() event: any;
}