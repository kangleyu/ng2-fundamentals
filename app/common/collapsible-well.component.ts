import { Component, Input } from '@angular/core';

@Component({
  selector: 'collapsible-well',
  templateUrl: 'app/common/collapsible-well.component.html'
})
export class CollapsibleWellComponent {
  @Input() title: string;
  visible: boolean = false;

  toggleContent() {
    this.visible = !this.visible;
  }
}