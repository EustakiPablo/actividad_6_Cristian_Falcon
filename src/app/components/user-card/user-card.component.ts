import { Component, inject, input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { toast } from 'ngx-sonner';

@Component({
  imports: [RouterLink],
  selector: 'app-user-card',
  styleUrl: './user-card.component.css',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  user = input.required<IUser>();
  userService = inject(UsersService);

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
          const response = await this.userService.deleteUser(this.user()._id);
          if (response._id) {
            toast.warning(`Usuario ${this.user().first_name} ${this.user().last_name} eliminado correctamente`);
          }
        }
      });
    }
}
