import { Component, OnInit, Output } from '@angular/core';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {

  public usuario = {} as UserUpdate;
  public imagemURL = '';
  file!: File;

  public get ehPalestrante(): boolean {
    return this.usuario.funcao === 'Palestrante';
  }

  constructor(private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private accountService: AccountService  ) { 
  }

  ngOnInit(): void {
  }

  public setFormValue(usuario: UserUpdate) : void {
    this.usuario = usuario;
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    this.file = ev.target.files[0];
    reader.readAsDataURL(this.file);
    this.uploadImagem();
  }

  private uploadImagem() : void {
    this.spinner.show();
    this.accountService
      .postUpload(this.file)
      .subscribe(
        () => this.toastr.success('Imagem atualizada com sucesso', 'Sucesso!'),
        (error : any) => {
          this.toastr.error('Erro ao fazer upload da imagem', 'Erro!');
          console.log(error);
        }
      ).add(() => this.spinner.hide());
  }
}
