import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '@models/professor.model'; // Ajuste o path se necessário

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  http = inject(HttpClient);
  API = 'http://localhost:8080/api/Professor';

  findAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.API}/findAll`);
  }

  findById(id: number): Observable<Professor> {
    // Correção aqui: Removido o <span>
    return this.http.get<Professor>(`${this.API}/findById/${id}`);
  }

  deleteById(id: number): Observable<string> {
    // Correção aqui: Removido o <span>
    return this.http.delete<string>(`${this.API}/deleteById/${id}`, { responseType: 'text' as 'json' });
  }

  save(professor: Professor): Observable<string> {
     return this.http.post<string>(`${this.API}/save`, professor, {responseType: 'text' as 'json'});
  }

  update(id: number, professor: Professor): Observable<string> {
    // Correção aqui: Removido o <span>
     return this.http.put<string>(`${this.API}/update/${id}`, professor, {responseType: 'text' as 'json'});
  }
}