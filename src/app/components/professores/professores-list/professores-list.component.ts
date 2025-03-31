import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Professor } from '@models/professor.model';

@Component({
  selector: 'app-professores-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './professores-list.component.html',
  styleUrl: './professores-list.component.scss'
})
export class ProfessoresListComponent {

  lista: Professor[] = [];
  
  // Usando inject para injeção de dependência
  private router = inject(Router);

  constructor() {
    this.findAll();
  }

  findAll(): void {
    // Array fake de professores
    this.lista = [
      { id: 1, nome: 'Carlos Silva', especialidade: 'Matemática', idade: 45 },
      { id: 2, nome: 'Ana Oliveira', especialidade: 'História', idade: 38 },
      { id: 3, nome: 'Roberto Santos', especialidade: 'Física', idade: 52 }
    ];
  }

  delete(professor: Professor): void {
    const indice = this.lista.findIndex(x => x.id === professor.id);
    if (confirm('Deseja deletar esse professor?')) {
      this.lista.splice(indice, 1);
    }
  }

  editar(professor: Professor): void {
    this.router.navigate(['/admin/professores/edit', professor.id]);
  }

  novo(): void {
    this.router.navigate(['/admin/professores/new']);
  }
}