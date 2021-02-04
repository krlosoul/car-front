import { Component, OnInit } from '@angular/core';
import { ICarros, getCarros } from '../../interfaces/icarros';
import { ModalService } from '../../services/modal-service.service';
import { RestServiceService } from '../../services/rest-service.service';
import { AuthService } from '../../services/auth-service.service';
import * as jquery from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {

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
  onChangeCantidad(inputCantidad: any, pro_referencia: string, pro_valor: number) {
    let cantidad = inputCantidad.target.value * 1 ;
    let total = cantidad * pro_valor;
    document.getElementById(pro_referencia).innerText = total.toString();

    this.rest.put('api/carros/producto', { pro_referencia:pro_referencia, usu_codigo:this.auth.idUser, car_estado: 2, car_cantidad: cantidad, car_total: total }).then(res => {
      this.modal.showAlert('Producto actualizado', 2);
      this.cargarGrid();
      this.modal.hideLoading();
    }).catch(err => {
      this.modal.hideLoading();
    });

  }

  cargarGrid() {
    this.modal.showLoading('Cargando Información');
    this.rest.get('api/carros?take=' + this.pageSize + '&skip=' + (((this.page - 1) * this.pageSize)) + '&usu_codigo=' + this.auth.idUser).then((res) => {
      this.DataGrid = getCarros(res.data);
      this.collectionSize = res.count;
      this.modal.hideLoading();
    }).catch(err => {
      this.modal.hideLoading();
    });
  }
  Quitar(pro_referencia: string) {
    this.modal.showLoading('Eliminando información');
    this.rest.delete('api/carros/producto?pro_referencia=' + pro_referencia).then(res => {
      this.modal.showAlert('Producto eliminado del carrito satisfactoriamente', 2);
      this.cargarGrid();
      this.modal.hideLoading();
    }).catch(err => {
      this.modal.hideLoading();
    });
  }

  Guardar() {
    this.modal.showLoading('Eliminando información');
    this.rest.put('api/carros/guardar', {usu_codigo: this.auth.idUser, car_estado: 3}).then(res => {
      this.modal.showAlert('Compra realizada', 2);
      this.cargarGrid();
      this.modal.hideLoading();
    }).catch(err => {
      this.modal.hideLoading();
    });
  }
  Vaciar() {
    this.modal.showLoading('Eliminando información');
    this.rest.delete('api/carros/limpiar?usu_codigo=' + this.auth.idUser).then(res => {
      this.modal.showAlert('Carrito limpiado satisfactoriamente', 2);
      this.cargarGrid();
      this.modal.hideLoading();
    }).catch(err => {
      this.modal.hideLoading();
    });
  }




}
