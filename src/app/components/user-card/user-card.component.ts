import { Component, input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-user-card',
  styleUrl: './user-card.component.css',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  user = input.required<IUser>();
  
}
