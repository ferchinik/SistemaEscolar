import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Curso } from '@models/curso.model';

@Component({
  selector: 'app-cursos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cursos-list.component.html',
  styleUrl: './cursos-list.component.scss'
})
export class CursosListComponent {

  lista: Curso[] = [];
  
  // Usando inject em vez de constructor injection
  private router = inject(Router);

  constructor() {
    this.findAll();
  }

  findAll(): void {
    // Array fake de cursos
    this.lista = [
      { id: 1, nome: 'Matemática', descricao: 'Álgebra, geometria e cálculo' },
      { id: 2, nome: 'Português', descricao: 'Gramática e literatura' },
      { id: 3, nome: 'Ciências', descricao: 'Biologia, química e física' }
    ];
  }

  delete(curso: Curso): void {
    const indice = this.lista.findIndex(x => x.id === curso.id);
    if (confirm('Deseja deletar esse curso?')) {
      this.lista.splice(indice, 1);
    }
  }

  editar(curso: Curso): void {
    this.router.navigate(['/admin/cursos/edit', curso.id]);
  }

  novo(): void {
    this.router.navigate(['/admin/cursos/new']);
  }
}