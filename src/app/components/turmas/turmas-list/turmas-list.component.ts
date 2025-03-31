import { Component, EventEmitter, inject, Input, Output } from '@angular/core'; // Verifique os imports
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Turma } from '@models/turma.model';
// Importe o TurmaService se precisar buscar dados
// import { TurmaService } from '@services/turma.service';

@Component({
  selector: 'app-turmas-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // Adicione outros módulos se necessário
  templateUrl: './turmas-list.component.html',
  styleUrl: './turmas-list.component.scss'
})
export class TurmasListComponent {

  @Input() modoModal: boolean = false; // <<<<----- VERIFIQUE SE ESSA LINHA EXISTE E ESTÁ CORRETA

  lista: Turma[] = [];
  // ... resto do código (injeção de service, findAll, delete, etc.) ...

  constructor() {
     // No construtor ou ngOnInit, chame this.findAll() para buscar os dados
     // (Remova o array fake se já tiver o service)
    this.lista = [
      { id: 1, nome: 'Turma A', capacidade: 30, periodo: 'Matutino' },
      { id: 2, nome: 'Turma B', capacidade: 25, periodo: 'Vespertino' },
      { id: 3, nome: 'Turma C', capacidade: 20, periodo: 'Noturno' }
    ];
  }

   // ... outros métodos (findAll, delete) ...

  // Método para emitir o evento quando em modo modal
  @Output() retorno = new EventEmitter<Turma>(); // <<<<----- VERIFIQUE SE ESSA LINHA EXISTE (necessário para o erro 2)
  selecionar(turma: Turma) {
    if (this.modoModal) {
      this.retorno.emit(turma); // Emite a turma selecionada
    }
  }
}