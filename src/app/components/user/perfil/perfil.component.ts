import { Component, OnInit, Output } from '@angular/core';
import { UserUpdate } from '@app/models/identity/UserUpdate';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public usuario = {} as UserUpdate;

  public get ehPalestrante(): boolean {
    return this.usuario.funcao === 'Palestrante';
  }

  constructor() { 
  }

  ngOnInit(): void {
  }

  public setFormValue(usuario: UserUpdate) : void {
    this.usuario = usuario;
  }

  get f(): any {
    return '';
  }

}
