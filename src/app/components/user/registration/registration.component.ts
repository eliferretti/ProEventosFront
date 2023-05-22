import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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
      primeiroNome: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)]
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
      usuario: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)]
      ],
      senha: ['',
        [Validators.required,
        Validators.minLength(6)]
      ],
      confirmaSenha: ['',
        [Validators.required]
      ],
    }, formOptions);
  }
}


