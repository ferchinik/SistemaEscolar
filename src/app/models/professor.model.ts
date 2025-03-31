import { Turma } from "./turma.model"; // Importar Turma

export class Professor {
    id!: number;
    nome!: string;
    cpf!: string;
    // Adicionar o array de Turmas para o relacionamento N-N
    turmas: Turma[] = []; // Inicializar como array vazio
}