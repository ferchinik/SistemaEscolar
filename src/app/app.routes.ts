import { Routes } from '@angular/router';

// Importa todos os componentes standalone
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { AlunosListComponent } from './components/alunos/alunos-list/alunos-list.component';
// Remover import do form se ele só for usado em modal
// import { AlunosFormComponent } from './components/alunos/alunos-form/alunos-form.component';
import { ProfessoresListComponent } from './components/professores/professores-list/professores-list.component';
// Remover import do form se ele só for usado em modal
// import { ProfessoresFormComponent } from './components/professores/professores-form/professores-form.component';
import { CursosListComponent } from './components/cursos/cursos-list/cursos-list.component';
// Remover import do form se ele só for usado em modal
// import { CursosFormComponent } from './components/cursos/cursos-form/cursos-form.component';
import { TurmasListComponent } from './components/turmas/turmas-list/turmas-list.component';
// Remover import do form se ele só for usado em modal
// import { TurmasFormComponent } from './components/turmas/turmas-form/turmas-form.component';

// Importar Dashboard CORRETAMENTE
import { DashboardComponent } from './components/layout/dashboard/dashboard.component'; // <<-- CORRIGIDO AQUI

// Definição das rotas
export const routes: Routes = [
  // Redireciona a rota vazia para /login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login
  { path: 'login', component: LoginComponent },

  // Área "admin" com children
  {
    path: 'admin',
    component: PrincipalComponent,
    children: [
      // Rota Padrão para /admin
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redireciona /admin para /admin/dashboard
      // Rota do Dashboard
      { path: 'dashboard', component: DashboardComponent }, // <<-- USADO AQUI

      // Alunos
      { path: 'alunos', component: AlunosListComponent },
      // Rotas de formulário removidas (serão modais)
      // { path: 'alunos/new', component: AlunosFormComponent },
      // { path: 'alunos/edit/:id', component: AlunosFormComponent },

      // Professores
      { path: 'professores', component: ProfessoresListComponent },
      // Rotas de formulário removidas
      // { path: 'professores/new', component: ProfessoresFormComponent },
      // { path: 'professores/edit/:id', component: ProfessoresFormComponent },

      // Cursos
      { path: 'cursos', component: CursosListComponent },
      // Rotas de formulário removidas
      // { path: 'cursos/new', component: CursosFormComponent },
      // { path: 'cursos/edit/:id', component: CursosFormComponent },

      // Turmas
      { path: 'turmas', component: TurmasListComponent },
      // Rotas de formulário removidas
      // { path: 'turmas/new', component: TurmasFormComponent },
      // { path: 'turmas/edit/:id', component: TurmasFormComponent },
    ]
  }
];