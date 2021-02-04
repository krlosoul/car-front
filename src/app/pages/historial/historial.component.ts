import { Component, OnInit } from '@angular/core';
import { ICarros,getCarros } from '../../interfaces/icarros';
import { ModalService } from '../../services/modal-service.service';
import { RestServiceService } from '../../services/rest-service.service';
import { AuthService } from '../../services/auth-service.service';
import * as jquery from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  collectionSize: number;
  page: number;
  pageSize: number;
  enable: boolean;
  DataGrid: Array<ICarros>;

  constructor(private rest: RestServiceService, private modal: ModalService, private auth: AuthService, private router: Router) {
    this.page = 1;
    this.pageSize = 5;
    this.collectionSize = 0;
    this.DataGrid = [];
  }

  ngOnInit() {
    

    if (!this.auth.isLogin) {
      this.router.navigate(['/login']);
    }

    this.modal.showLoading('Cargando Información');
    this.cargarGrid();
  }

  onChange(e) {
    this.page = e;
    this.cargarGrid();
  }

  cargarGrid() {
    this.modal.showLoading('Cargando Información');
    this.rest.get('api/carros/historial?take=' + this.pageSize + '&skip=' + (((this.page - 1) * this.pageSize)) + '&usu_codigo=' + this.auth.idUser).then((res) => {
      this.DataGrid = getCarros(res.data);
      this.collectionSize = res.count;
      this.modal.hideLoading();
    }).catch(err => {
      this.modal.hideLoading();
    });
  }
}
