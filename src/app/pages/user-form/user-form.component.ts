import { Component, inject, input, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  imports: [FormField],
  selector: 'app-user-form',
  styleUrl: './user-form.component.css',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {

  _id = input<string>();

  userService = inject(UsersService);
  router = inject(Router);

  title = signal<string>('NUEVO USUARIO');
  buttonText = signal<string>('Guardar');

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



  readonly userForm = form(this.user, form => {
    // validaciones
    required(form.first_name, { message: 'El nombre es obligatorio' });

    required(form.last_name, { message: 'El apellido es obligatorio' });

    required(form.email, { message: 'El email es obligatorio' });
    //pattern(form.email, /^\w+\@[a-zA-Z_.]+?\.[a-zA-Z]$/, { message: 'El email no es válido' });
    pattern(form.email, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'El email no es válido' });

    required(form.image, { message: 'La imagen es obligatoria' });
    pattern(form.image, /^(http|https):\/\/[^ "]+$/, { message: 'La ruta de la imagen no es válida' });

  });

  async ngOnInit() {
    const id = this._id();
    if(id){
      this.title.set('EDITAR USUARIO');
      this.buttonText.set('Actualizar');
      const user = await this.userService.getUserById(id);
      this.user.set(user);
    }
  }


  async sendUser(event: Event) {
    const id = this._id();
    event.preventDefault();
    console.log('Formulario enviado:', this.userForm().value());

    if(!id){
      const response = await this.userService.createUser(this.userForm().value());
      console.log('Usuario creado:', response);
      if(response.id){
        toast.success('Usuario creado correctamente');
        this.router.navigate(['/home']);
        this.resetForm();
      }
    }else{
      const response = await this.userService.updateUser(id, this.userForm().value());
      //console.log('Usuario actualizado:', response);
      if(response){
        toast.success('Usuario actualizado correctamente');
        this.router.navigate(['/home']);
        this.resetForm();
      }
    }

    
    
  }

  private resetForm(){
    this.userForm().reset({
      "_id": "",
      "id": 0,
      "first_name": "",
      "last_name": "",
      "username": "",
      "email": "",
      "image": "",
      "password": ""
    });
  }
}
