import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from '../app/shared/nav-menu/nav-menu.component';

import { RestServiceService } from '../app/services/rest-service.service';
import { ModalService } from '../app/services/modal-service.service';
import { AuthService } from '../app/services/auth-service.service';
import { HomeComponent } from './pages/home/home.component';
import { CarroComponent } from './pages/carro/carro.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CarroComponent,
    HistorialComponent,
    LoginComponent,
    ProductosComponent,
    RegistrarComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'registrar', component: RegistrarComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'carro', component: CarroComponent },
      { path: 'historial', component: HistorialComponent },
    ])
  ],
  providers: [
    RestServiceService,
    ModalService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
