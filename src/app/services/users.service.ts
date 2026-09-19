import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs'
import { IResponse, IUser } from '../interfaces/iuser.interface';

@Service()
export class UsersService {
    private apiUrl: string = 'https://peticiones.online/api/users';
    private httpClient = inject(HttpClient);
    //https://peticiones.online/api/users?page=2

    async getAllUsers(page: number = 1){
        return await firstValueFrom(this.httpClient.get<IResponse>(`${this.apiUrl}?page=${page}`));
    }

    async getUserById(_id: string) {
        return await firstValueFrom(this.httpClient.get<IUser>(`${this.apiUrl}/${_id}`));
    }

    async createUser(user: IUser) {
        return await firstValueFrom(this.httpClient.post<IUser>(this.apiUrl, user));
    }

}
