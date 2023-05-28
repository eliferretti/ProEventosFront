import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar: string = 'post';

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
        isAnimated: true,
        adaptivePosition: true,
        keepDatepickerOpened: true,
        rangeInputFormat: 'DD/MM/YYYY hh:mm a',
        dateInputFormat: 'DD/MM/YYYY hh:mm a',
        withTimepicker: true,
        containerClass: 'theme-default',
        keepDatesOutOfRules: true,
        showWeekNumbers: false
    }
  }

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private router: ActivatedRoute,
              private eventoService: EventoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService)
  {
    this.localeService.use('pt-br')
  }

  public carregarEvento(): void {
    const eventoParam = this.router.snapshot.paramMap.get('id');
    if(eventoParam != null) {
      this.spinner.show();

      this.estadoSalvar = 'put';
      this.eventoService.getEventoById(+eventoParam).subscribe(
        (evento: Evento) => {
          this.evento = {... evento};
          this.form.patchValue(this.evento);
          console.log(this.evento.dataEvento);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar Evento.', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide()
      );
    }
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      dataEvento: ['', Validators.required],
      tema: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]
        ],
      local: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]
        ],
      qtdPessoas: ['',
        [Validators.required,
        Validators.max(120000)]
        ],
      imagemUrl: ['', Validators.required],
      email: ['',
        [Validators.required,
        Validators.email]
        ],
      telefone: ['', Validators.required]
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched }
  }

  public salvarAlteracao(): void {
    this.spinner.show()
    if (this.form.valid) {

      // this.evento = (this.estadoSalvar === 'post')
      //               ? { ... this.form.value}
      //               : {id: this.evento.id, ... this.form.value};

      // this.eventoService[this.estadoSalvar](this.evento).subscribe(
      //   () => this.toastr.success('Evento salvo com sucesso', 'Sucesso!'),
      //   (error: any) => {
      //     console.log(error);
      //     this.spinner.hide();
      //     this.toastr.error('Erro ao salvar evento.', 'Erro!');
      //   },
      //   () => {
      //     this.spinner.hide();
      //   }
      // );

      if (this.estadoSalvar === 'post') {

        this.evento = {... this.form.value};
        this.eventoService['post'](this.evento).subscribe(
          () => this.toastr.success('Evento salvo com sucesso', 'Sucesso!'),
          (error: any) => {
            console.log(error);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar evento.', 'Erro!');
          },
          () => {
            this.spinner.hide();
          }
        );
      }else{
        this.evento = {id: this.evento.id, ... this.form.value};
        this.eventoService['put'](this.evento).subscribe(
          () => this.toastr.success('Evento editado com sucesso', 'Sucesso!'),
          (error: any) => {
            console.log(error);
            this.spinner.hide();
            this.toastr.error('Erro ao editar evento.', 'Erro!');
          },
          () => this.spinner.hide()
        );
      }
    }
  }
}

