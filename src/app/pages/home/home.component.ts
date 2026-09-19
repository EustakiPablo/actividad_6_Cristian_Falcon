import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  imports: [UserCardComponent],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly usersService = inject(UsersService);

  currentPage: number = 1;
  totalPages: number = 0;

  users = signal<IUser[]>([]);

  

  async loadUsers() {
    const response = await this.usersService.getAllUsers(this.currentPage);
    this.totalPages = response.total_pages;
    this.users.set(response.results);
  }


  ngOnInit() {
    this.loadUsers();
  }
  
}
