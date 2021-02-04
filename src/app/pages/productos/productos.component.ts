import { Component, OnInit } from '@angular/core';
import { IProductos, getProductos } from '../../interfaces/iproductos';
import { ModalService } from '../../services/modal-service.service';
import { RestServiceService } from '../../services/rest-service.service';
import { OnSelectTableService } from '../../services/on-select-table.service';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {

  collectionSize: number;
  page: number;
  pageSize: number;
  enable: boolean;

  model: IProductos;
  DataGrid: Array<IProductos>;

  error = {
    referencia: { error: false, mensaje: '' },
    descripcion: { error: false, mensaje: '' },
    valor: { error: false, mensaje: '' }
  };

  edit: boolean = false;

  constructor(private rest: RestServiceService, private modal: ModalService, private onselect: OnSelectTableService, private auth: AuthService, private router: Router) {

    this.page = 1;
    this.pageSize = 5;
    this.collectionSize = 0;
    this.enable = false;

    this.DataGrid = [];
    this.model = {
      pro_referencia: '',
      pro_descripcion: '',
      pro_valor:0
    };

  }

  ngOnInit() {

    if (!this.auth.isLogin) {
      this.router.navigate(['/login']);  
    }

    this.modal.showLoading('Cargando Información');
    this.cargarGrid();
  }

  onChange(e:any) {
    this.page = e;
    this.cargarGrid();
  }
  onSelect(e: MouseEvent, item: any) {
    this.onselect.onSelect(e, item);
  }

  crear() {
    this.enable = true;
    this.model = {
      pro_referencia: '',
      pro_descripcion: '',
      pro_valor:0
    };
  }
  cancelar() {
    this.enable = false;
    this.edit = false;
    this.model = {
      pro_referencia: '',
      pro_descripcion: '',
      pro_valor:0
    };
    this.error = {
      referencia: { error: false, mensaje: '' },
      descripcion: { error: false, mensaje: '' },
      valor: { error: false, mensaje: '' }
    };
  }
  validar(): number {

    this.error = {
      referencia: { error: false, mensaje: '' },
      descripcion: { error: false, mensaje: '' },
      valor: { error: false, mensaje: '' }
    };

    let error = 0;

    if (this.model.pro_referencia.trim() == '') {
      this.error.referencia.error = true;
      this.error.referencia.mensaje = "Debe ingresar el campo 'Referencia'";
      error++;
    }
    if (this.model.pro_referencia.length > 45) {
      this.error.referencia.error = true;
      this.error.referencia.mensaje = "El valor del campo 'Referencia' no debe superar los 45 carácteres";
      error++;
    }

    if (this.model.pro_descripcion.trim() == '') {
      this.error.descripcion.error = true;
      this.error.descripcion.mensaje = "Debe ingresar el campo 'Descripcion'";
      error++;
    }
    if (this.model.pro_descripcion.length > 45) {
      this.error.descripcion.error = true;
      this.error.descripcion.mensaje = "El valor del campo 'Descripcion' no debe superar los 45 carácteres";
      error++;
    }

    if (this.model.pro_valor <= 0) {
      this.error.valor.error = true;
      this.error.valor.mensaje = "El campo 'Valor' debe ser mayor a cero";
      error++;
    }
    return error;
  }

  cargarGrid() {
    this.modal.showLoading('Cargando Información');
    this.rest.get('api/productos?take=' + this.pageSize + '&skip=' + (((this.page - 1) * this.pageSize))).then((res) => {
      this.DataGrid = getProductos(res.data);
      this.collectionSize = res.count;
      this.modal.hideLoading();
    }).catch(err => {
      this.modal.hideLoading();
    });
  }
  guardar() {
    if (this.validar() == 0) {
      this.modal.showLoading('Almacenando información');
      if (this.edit == false) {
        this.rest.post('api/productos', this.model).then(res => {
          this.modal.showAlert('Información almacenada satisfactoriamente', 2);
          this.cargarGrid();
          this.modal.hideLoading();
          this.cancelar();
        }).catch(err => {
          this.modal.hideLoading();
        });
      } else {
        this.rest.put('api/productos', this.model).then(res => {
          this.modal.showAlert('Información almacenada satisfactoriamente', 2);
          this.cargarGrid();
          this.modal.hideLoading();
          this.cancelar();
        }).catch(err => {
          this.modal.hideLoading();
        });
      }
    }
  }
  editar() {
    let data = this.onselect.Select('tbl');
    if (data === null) {
      this.modal.showAlert('Debe seleccionar una fila para continuar', 3);
    } else {
      this.edit = true;
      this.model = data;
      this.enable = true;
    }
  }
  eliminar() {
    let data = this.onselect.Select('tbl');
    if (data === null) {
      this.modal.showAlert('Debe seleccionar una fila para continuar', 3);
    } else {
      this.modal.showLoading('Eliminando información');
      this.rest.delete('api/productos?pro_referencia=' + data.pro_referencia).then(res => {
        this.modal.showAlert('Información eliminada satisfactoriamente', 2);
        this.cargarGrid();
        this.modal.hideLoading();
      }).catch(err => {
        this.modal.hideLoading();
      });
    }
  }

  enviarCarro(pro_referencia: string, car_total: number) {
    this.rest.post('api/carros', { pro_referencia: pro_referencia, usu_codigo: this.auth.idUser, car_cantidad: 1, car_total: car_total, car_estado: 1 }).then(res => {
      this.modal.showAlert('Enviando al carrito', 2);
      this.modal.hideLoading();
    }).catch(err => {
      this.modal.hideLoading();
    });
  }

  editKey():boolean {
    if (this.enable == true && this.edit == false) {
      return true;
    }
    return false;
  }

}
