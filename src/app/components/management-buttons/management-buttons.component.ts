import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-management-buttons',
  templateUrl: './management-buttons.component.html',
  styleUrls: ['./management-buttons.component.scss'],
})
export class ManagementButtonsComponent {
  @Input() tattoMakerId: number = 0;
}
