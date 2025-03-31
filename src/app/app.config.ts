import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // Importar
import { MdbModalModule } from 'mdb-angular-ui-kit/modal'; // Importar para modais globalmente se preferir
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel globalmente

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Adicionar
    importProvidersFrom(MdbModalModule), // Adicionar (forRoot não é mais necessário aqui)
    importProvidersFrom(FormsModule) // Adicionar para [(ngModel)]
  ]
};