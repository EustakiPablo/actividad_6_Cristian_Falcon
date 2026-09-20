import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { NgxSonnerToaster } from 'ngx-sonner';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavComponent, NgxSonnerToaster],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('actividad_6_cristian_falcon');
}
