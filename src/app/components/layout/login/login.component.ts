import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Objeto para armazenar username e password
  login = {
    username: '',
    password: ''
  };

  // Injete o Router para poder navegar após o login
  constructor(private router: Router) {}

  // Método para "logar"
  logar() {
    console.log('Fazer login com:', this.login);

    // Simular uma checagem
    if (this.login.username === 'admin' && this.login.password === 'admin') {
      // Redireciona para o "admin" (ou "admin/alunos")
      this.router.navigate(['/admin/alunos']);
    } else {
      alert('Credenciais inválidas');
    }
  }
}
