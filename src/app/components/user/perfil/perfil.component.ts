import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmaSenha')
    }
    this.form = this.fb.group({
      titulo: ['',
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
      telefone: ['',
        [Validators.required,
         Validators.minLength(11),
         Validators.maxLength(11)
        ]
      ],
      funcao: ['',
        [Validators.required]
      ],
      descricao: ['',
        [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(250)]
      ],
      senha: ['',
        [Validators.required,
        Validators.minLength(6)]
      ],
      confirmaSenha: ['',
        [Validators.required]
      ]
    }, formOptions);
  }

  onSubmit(): void {
    if (this.form.invalid){
      return;
    }
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

}
