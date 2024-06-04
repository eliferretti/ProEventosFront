import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.scss']
})
export class PerfilDetalheComponent implements OnInit {
  @Output() changeFormValue = new EventEmitter();

  form!: FormGroup;
  userUpdate = {} as UserUpdate;

  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.validation();
    this.carregarUsuario();
    this.verificaForm();
  }

  private verificaForm(): void {
    this.form.valueChanges
      .subscribe(() => this.changeFormValue.emit({ ... this.form.value }))
  }

  private carregarUsuario(): void {
    this.spinner.show();
    this.accountService.getUser().subscribe(
      (userRetorno: UserUpdate) => {
        console.log(userRetorno);
        this.userUpdate = userRetorno;
        this.form.patchValue(this.userUpdate);
        this.toastr.success('Usuário carregado', 'Sucesso');
      },
      (error) => {
        console.error(error);
        this.toastr.error('Usuário não carregado', 'Erro');
        this.router.navigate(['/dashboard'])
      }
    )
    .add( () => this.spinner.hide() );
  }

  public validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmePassword')
    }
    this.form = this.fb.group({
      userName: [''],
      titulo: ['NaoInformado',
        [Validators.required]
      ],
      primeiroNome: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]
      ],
      ultimoNome: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]
      ],
      email: ['',
        [Validators.required,
        Validators.email,
        Validators.maxLength(50)]
      ],
      phoneNumber: ['',
        [Validators.required,
         Validators.minLength(11),
         Validators.maxLength(11)
        ]
      ],
      funcao: ['NaoInformado',
        [Validators.required]
      ],
      descricao: ['',
        [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(250)]
      ],
      password: ['',
        [Validators.required,
        Validators.minLength(4)]
      ],
      confirmePassword: ['',
        [Validators.required]
      ]
    }, formOptions);
  }

  get f(): any {
    return this.form.controls;
  }

  onSubmit(): void {
    this.atualizarUsuario();
  }

  public atualizarUsuario()
  {
    this.userUpdate = { ... this.form.value };
    this.spinner.show();

    this.accountService.updateUser(this.userUpdate).subscribe(
      () => this.toastr.success('Usuário atualizado', 'Sucesso'),
      (error) => {
        this.toastr.error(error.error);
        console.log(error);
      },
    )
    .add( () => this.spinner.hide() )
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

}
