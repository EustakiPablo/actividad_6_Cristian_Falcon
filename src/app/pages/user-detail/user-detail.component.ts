import { Component, inject, input, signal } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { toast } from 'ngx-sonner';




@Component({
  imports: [RouterLink],
  selector: 'app-user-detail',
  styleUrl: './user-detail.component.css',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent {
  _id = input.required<string>();
  userService = inject(UsersService);
  router = inject(Router);
  user = signal<IUser>({
    "_id": "",
    "id": 0,
    "first_name": "",
    "last_name": "",
    "username": "",
    "email": "",
    "image": "",
    "password": ""
  });

  async ngOnInit() {
    const user = await this.userService.getUserById(this._id());
    this.user.set(user);
    console.log(user);
  }


  delete(){
    Swal.fire({
      title: `¿Estás seguro de que deseas eliminar a ${this.user().first_name} ${this.user().last_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.userService.deleteUser(this._id());
        if (response._id) {
          toast.warning(`Usuario ${this.user().first_name} ${this.user().last_name} eliminado correctamente`)
          this.router.navigate(['/home']);
        }
      }
    });
  }
}
