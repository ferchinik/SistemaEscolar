import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '@models/aluno.model'; // Ajuste o path se necessário

@Injectable({ providedIn: 'root' })
export class AlunoService {
  http = inject(HttpClient);
  API = 'http://localhost:8080/api/Aluno'; // URL base do seu controller Aluno

  // Opcional: Configurar Headers se necessário
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  findAll(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.API}/findAll`);
  }

  findById(id: number): Observable<Aluno> {
    // Correção aqui: Removido o <span>
    return this.http.get<Aluno>(`${this.API}/findById/${id}`);
  }

  deleteById(id: number): Observable<string> {
    // Correção aqui: Removido o <span>
    return this.http.delete<string>(`${this.API}/deleteById/${id}`, { responseType: 'text' as 'json' });
  }

  save(aluno: Aluno): Observable<string> {
     return this.http.post<string>(`${this.API}/save`, aluno, {responseType: 'text' as 'json'});
  }

  update(id: number, aluno: Aluno): Observable<string> {
    // Correção aqui: Removido o <span>
     return this.http.put<string>(`${this.API}/update/${id}`, aluno, {responseType: 'text' as 'json'});
  }
}