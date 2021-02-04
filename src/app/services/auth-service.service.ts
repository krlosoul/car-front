import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable()
export class AuthService {

  isLogin = false;
  idUser = 0;

  @Output() change: EventEmitter<any> = new EventEmitter();

  auth(state: boolean) {
    this.isLogin = state;
    this.change.emit(this.isLogin);
  }

  setUser(id: number) {
    this.idUser = id;
    this.change.emit(this.idUser);
  }

}
