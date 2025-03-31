import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turma } from '@models/turma.model'; // Ajuste o path se necessário

@Injectable({ providedIn: 'root' })
export class TurmaService {
  http = inject(HttpClient);
  API = 'http://localhost:8080/api/Turma';

  findAll(): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.API}/findAll`);
  }

  findById(id: number): Observable<Turma> {
    // Correção aqui: Removido o <span>
    return this.http.get<Turma>(`${this.API}/findById/${id}`);
  }

  deleteById(id: number): Observable<string> {
    // Correção aqui: Removido o <span>
    return this.http.delete<string>(`${this.API}/deleteById/${id}`, { responseType: 'text' as 'json' });
  }

  save(turma: Turma): Observable<string> {
     return this.http.post<string>(`${this.API}/save`, turma, {responseType: 'text' as 'json'});
  }

  update(id: number, turma: Turma): Observable<string> {
    // Correção aqui: Removido o <span>
     return this.http.put<string>(`${this.API}/update/${id}`, turma, {responseType: 'text' as 'json'});
  }
}