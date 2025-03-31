import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Curso } from '@models/curso.model';

@Component({
  selector: 'app-cursos-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cursos-form.component.html',
  styleUrl: './cursos-form.component.scss'
})
export class CursosFormComponent {

  curso: Curso = new Curso();
  
  // Usando inject em vez de constructor injection
  private router = inject(Router);
  private rotaAtiva = inject(ActivatedRoute);

  constructor() {
    const id = this.rotaAtiva.snapshot.params['id'];
    if (id) {
      // Como é fake, apenas simulamos o carregamento do curso
      // AQUI VOCÊ VAI CHAMAR O FINDBYID()
      this.curso.id = +id;
      this.curso.nome = 'Curso';
      this.curso.descricao = 'Descrição do curso';
    }
  }

  save(): void {
    if (this.curso.id > 0) {
      // UPDATE
      alert('Curso atualizado com sucesso!');
    } else {
      // SAVE
      alert('Curso criado com sucesso!');
    }
    // Voltar para a lista
    this.router.navigate(['/admin/cursos']);
  }
}