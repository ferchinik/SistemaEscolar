import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Turma } from '@models/turma.model';

@Component({
  selector: 'app-turmas-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './turmas-form.component.html',
  styleUrl: './turmas-form.component.scss'
})
export class TurmasFormComponent {

  turma: Turma = new Turma();
  
  // Usando inject em vez de constructor injection
  private router = inject(Router);
  private rotaAtiva = inject(ActivatedRoute);

  constructor() {
    const id = this.rotaAtiva.snapshot.params['id'];
    if (id) {
      // Como é fake, apenas simulamos o carregamento da turma
      // AQUI VOCÊ VAI CHAMAR O FINDBYID()
      this.turma.id = +id;
      this.turma.nome = 'Turma';
      this.turma.capacidade = 25;
      this.turma.periodo = 'Período';
    }
  }

  save(): void {
    if (this.turma.id > 0) {
      // UPDATE
      alert('Turma atualizada com sucesso!');
    } else {
      // SAVE
      alert('Turma criada com sucesso!');
    }
    // Voltar para a lista
    this.router.navigate(['/admin/turmas']);
  }
}