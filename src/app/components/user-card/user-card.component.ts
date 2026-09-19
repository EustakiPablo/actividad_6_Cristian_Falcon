import { Component, input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  imports: [],
  selector: 'app-user-card',
  styleUrl: './user-card.component.css',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  user = input.required<IUser>();
  
}
