import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { BlockchainComponent } from './blockchain/blockchain.component';
import { BloqueInfoComponent } from './bloque-info/bloque-info.component';
import { InfoPaginaComponent } from './info-pagina/info-pagina.component';
import { PaginaVotacionComponent } from './pagina-votacion/pagina-votacion.component';
import { CandidatosComponent } from './candidatos/candidatos.component';

//FireBase
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment'
import {firebase} from '../environments/firebase';

//Servicios
import {VotantesService} from './servicios/votantes.service';
import {CadenaService} from './servicios/cadena.service';
import { PaginaEstadoComponent } from './pagina-estado/pagina-estado.component';
import { VerEstadisticasComponent } from './ver-estadisticas/ver-estadisticas.component';


@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    BlockchainComponent,
    BloqueInfoComponent,
    InfoPaginaComponent,
    PaginaVotacionComponent,
    CandidatosComponent,
    PaginaEstadoComponent,
    VerEstadisticasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [
    VotantesService,
    CadenaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
