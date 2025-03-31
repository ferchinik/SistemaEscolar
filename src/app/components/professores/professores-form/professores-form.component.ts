import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Professor } from '@models/professor.model';

@Component({
  selector: 'app-professores-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './professores-form.component.html',
  styleUrl: './professores-form.component.scss'
})
export class ProfessoresFormComponent {

  professor: Professor = new Professor();
  
  // Usando inject para injeção de dependência
  private router = inject(Router);
  private rotaAtiva = inject(ActivatedRoute);

  constructor() {
    const id = this.rotaAtiva.snapshot.params['id'];
    if (id) {
      // AQUI VOCÊ VAI CHAMAR O FINDBYID() quando tiver um serviço
      // Por enquanto, simulamos um professor para edição
      this.professor.id = +id;
      this.professor.nome = 'Professor';
      this.professor.especialidade = 'Especialidade';
      this.professor.idade = 45;
    }
  }

  save(): void {
    if (this.professor.id > 0) {
      // UPDATE
      alert('Professor atualizado com sucesso!');
    } else {
      // SAVE
      alert('Professor cadastrado com sucesso!');
    }
    // Voltar para a lista
    this.router.navigate(['/admin/professores']);
  }
}