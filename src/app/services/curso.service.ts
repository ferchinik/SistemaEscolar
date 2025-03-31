import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '@models/curso.model'; // Ajuste o path se necessário

@Injectable({ providedIn: 'root' })
export class CursoService {
  http = inject(HttpClient);
  API = 'http://localhost:8080/api/Curso';

  findAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.API}/findAll`);
  }

  findById(id: number): Observable<Curso> {
    // Correção aqui: Removido o <span>
    return this.http.get<Curso>(`${this.API}/findById/${id}`);
  }

  deleteById(id: number): Observable<string> {
    // Correção aqui: Removido o <span>
    return this.http.delete<string>(`${this.API}/deleteById/${id}`, { responseType: 'text' as 'json' });
  }

  save(curso: Curso): Observable<string> {
     return this.http.post<string>(`${this.API}/save`, curso, {responseType: 'text' as 'json'});
  }

  update(id: number, curso: Curso): Observable<string> {
    // Correção aqui: Removido o <span>
     return this.http.put<string>(`${this.API}/update/${id}`, curso, {responseType: 'text' as 'json'});
  }
}