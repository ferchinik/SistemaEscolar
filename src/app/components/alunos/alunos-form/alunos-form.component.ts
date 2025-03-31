import { Component, EventEmitter, inject, Input, Output, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Aluno } from '@models/aluno.model';
import { AlunoService } from '@services/aluno.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router'; // Manter se ainda usa ID da rota para buscar dados iniciais (improvável com modal)
import { CommonModule } from '@angular/common'; // Para @if
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'; // Para estilos MDB
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal'; // Para abrir modal de Turmas (N-1)
import { Turma } from '@models/turma.model'; // Para tipo da Turma
import { TurmasListComponent } from '../../turmas/turmas-list/turmas-list.component'; // Para modal de seleção

@Component({
  selector: 'app-alunos-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Adicionar
    MdbFormsModule, // Adicionar
    MdbModalModule, // Adicionar para modal de seleção
    TurmasListComponent // Adicionar para template da modal de seleção
  ],
  templateUrl: './alunos-form.component.html',
  styleUrl: './alunos-form.component.scss'
})
export class AlunosFormComponent implements OnInit {

  @Input() aluno: Aluno = new Aluno(); // Recebe o aluno da lista (via modal)
  @Output() retorno = new EventEmitter<any>(); // Emite evento para a lista

  service = inject(AlunoService);
  route = inject(ActivatedRoute); // Pode remover se não usa mais ID da rota

  // Para Modal de seleção de Turma (N-1)
  modalService = inject(MdbModalService);
  @ViewChild("modalTurmasList") modalTurmasList!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    // Lógica para buscar por ID da rota (se ainda necessária, mas geralmente não com modais)
    // let id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.findById(parseInt(id));
    // }
  }

  ngOnInit(): void {
     // Se precisar fazer algo quando o Input (@Input aluno) for recebido, use ngOnChanges
  }

  // Método para buscar dados se estivesse usando rota (não necessário com modal de edição)
  // findById(id: number) {
  //   this.service.findById(id).subscribe({
  //     next: (alunoRetornado) => {
  //       this.aluno = alunoRetornado;
  //     },
  //     error: (erro) => {
  //       Swal.fire('Erro ao buscar aluno', erro.message, 'error');
  //       console.error(erro);
  //     }
  //   });
  // }

  save() {
    // Verifica se é save ou update pelo ID
    if (this.aluno.id > 0) { // UPDATE
      this.service.update(this.aluno.id, this.aluno).subscribe({
        next: (mensagem) => {
          Swal.fire({ title: 'Aluno atualizado!', text: mensagem, icon: 'success' });
          this.retorno.emit({ success: true, obj: this.aluno }); // Emite sucesso
        },
        error: (erro) => {
           // Tenta pegar a mensagem de erro do backend (do GlobalExceptionHandler)
           let errorMsg = erro.error?.message || erro.error?.errors || erro.message || 'Erro desconhecido';
           Swal.fire({ title: 'Erro ao atualizar Aluno', html: `Detalhes: ${errorMsg}`, icon: 'error' });
           console.error(erro);
           // this.retorno.emit({ success: false, error: erro }); // Opcional: emitir falha
        }
      });
    } else { // SAVE
      this.service.save(this.aluno).subscribe({
        next: (mensagem) => {
          Swal.fire({ title: 'Aluno salvo!', text: mensagem, icon: 'success' });
          this.retorno.emit({ success: true, obj: this.aluno }); // Emite sucesso
        },
        error: (erro) => {
           let errorMsg = erro.error?.message || erro.error?.errors || erro.message || 'Erro desconhecido';
           Swal.fire({ title: 'Erro ao salvar Aluno', html: `Detalhes: ${errorMsg}`, icon: 'error' });
           console.error(erro);
           // this.retorno.emit({ success: false, error: erro }); // Opcional: emitir falha
        }
      });
    }
  }

  // --- Lógica para Seleção de Turma (N-1 - PDF Parte 3) ---
  buscarTurma(){
     // Abre a modal que contém o componente turmas-list
     this.modalRef = this.modalService.open(this.modalTurmasList, { modalClass: 'modal-lg' });
  }

  selecionarTurma(turma: Turma){
     this.aluno.turma = turma; // Associa a turma selecionada ao aluno
     this.modalRef.close(); // Fecha a modal de seleção
     console.log('Turma selecionada:', this.aluno.turma);
  }

  limparTurma(){
     this.aluno.turma = null; // Ou undefined, dependendo do tipo no model
  }
  // --- Fim da Lógica N-1 ---

}