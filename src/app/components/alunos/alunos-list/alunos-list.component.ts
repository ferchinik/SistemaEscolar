import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Aluno } from '@models/aluno.model';
import { AlunoService } from '@services/aluno.service';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal'; // Imports da Modal
import Swal from 'sweetalert2'; // Import Swal
import { AlunosFormComponent } from '../alunos-form/alunos-form.component'; // Import Form Component
import { CommonModule } from '@angular/common'; // Necessário para @for/@if
import { FormsModule } from '@angular/forms'; // Necessário se houver algum ngModel aqui

@Component({
  selector: 'app-alunos-list',
  standalone: true,
  imports: [
    CommonModule, // Adicionar
    MdbModalModule, // Adicionar
    // Removed AlunosFormComponent as it is not used
    FormsModule // Adicionar (se necessário)
    ,
    AlunosFormComponent
],
  templateUrl: './alunos-list.component.html',
  styleUrl: './alunos-list.component.scss'
})
export class AlunosListComponent implements OnInit {
  lista: Aluno[] = [];
  alunoEdit!: Aluno; // Objeto para enviar/editar na modal

  // Injeção de dependências
  service = inject(AlunoService);
  modalService = inject(MdbModalService);

  // Referência da Modal e do Template
  @ViewChild("modalAlunosForm") modalAlunosForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    // Chama o método para carregar a lista inicial
    this.findAll();
  }

  ngOnInit(): void {} // Pode remover o conteúdo se não for usado

  findAll() {
    this.service.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire({ // Usar Swal para erros
          title: 'Erro ao buscar alunos',
          text: erro.message || 'Erro desconhecido.',
          icon: 'error' });
        console.error(erro);
      }
    });
  }

  new() {
    this.alunoEdit = new Aluno(); // Cria um aluno vazio para o form
    // Abre a modal usando o template 'modalAlunosForm'
    this.modalRef = this.modalService.open(this.modalAlunosForm, { modalClass: 'modal-lg' }); // Ajuste o tamanho se necessário
  }

  edit(aluno: Aluno) {
    // Clona o objeto para não alterar a lista diretamente
    this.alunoEdit = Object.assign({}, aluno);
    // Abre a modal
    this.modalRef = this.modalService.open(this.modalAlunosForm, { modalClass: 'modal-lg' });
  }

  delete(aluno: Aluno) {
    Swal.fire({
      title: `Confirmar exclusão de ${aluno.nome}?`,
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteById(aluno.id).subscribe({
          next: (mensagem) => {
            Swal.fire('Excluído!', mensagem, 'success');
            this.findAll(); // Atualiza a lista após excluir
          },
          error: (erro) => {
             Swal.fire({
               title: 'Erro ao excluir Aluno',
               text: erro.error || erro.message || 'Erro desconhecido.', // Tenta pegar erro do backend
               icon: 'error' });
             console.error(erro);
          }
        });
      }
    });
  }

  // Método chamado quando o form (na modal) emite o evento 'retorno'
  retornoModalForm(response: any) {
     console.log('Retorno recebido do form:', response);
     if (response.success) {
        this.findAll(); // Atualiza a lista
     } else {
        // Poderia tratar erros específicos vindos do form aqui, se necessário
        console.error('Form retornou erro:', response);
     }
     this.modalRef.close(); // Fecha a modal independentemente do resultado
  }
}