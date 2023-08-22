import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
import { EventoService } from '@app/services/evento.service';
import { LoteService } from '@app/services/lote.service';
import { format } from 'date-fns';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  modalRef!: BsModalRef;
  eventoId!: number;
  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar: string = 'post';
  loteAtual = { id : 0, nome : '', indice : 0}

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
        adaptivePosition: true,
        dateInputFormat: 'DD/MM/YYYY hh:mm a',
        withTimepicker: true,
        containerClass: 'theme-default',
        showWeekNumbers: false
    }
  }

  get bsConfigLote(): any {
    return {
        adaptivePosition: true,
        dateInputFormat: 'DD/MM/YYYY',
        containerClass: 'theme-default',
        showWeekNumbers: false
    }
  }

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private activatedRouter: ActivatedRoute,
              private eventoService: EventoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private router: Router,
              private loteService: LoteService,
              private modalService: BsModalService)
  {
    this.localeService.use('pt-br')
  }

  public carregarEvento(): void {

    let eventoId = this.activatedRouter.snapshot.paramMap.get('id');
    if(eventoId){
      this.eventoId = +eventoId;
    }

    if(this.eventoId != null && this.eventoId != 0) {
      this.spinner.show();

      this.estadoSalvar = 'put';
      this.eventoService.getEventoById(this.eventoId).subscribe(
        (evento: Evento) => {
          this.evento = {... evento};
          this.form.patchValue(this.evento);
          this.evento.lotes.forEach(lote => {
            this.lotes.push(this.criarLote(lote));
          });
          //this.carregarLotes();
          console.log(this.evento.dataEvento);
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar carregar Evento.', 'Erro!');
          console.error(error);
        },
      ).add(() => this.spinner.hide());
    }
  }

  // public carregarLotes(): void {
  //   this.loteService.getLotesByEventoId(this.eventoId).subscribe(
  //     (lotesRetorno: Lote[]) => {
  //       lotesRetorno.forEach(lote => {
  //         this.lotes.push(this.criarLote(lote));
  //       });
  //     },
  //     (error: any) => {
  //       this.toastr.error('Erro ao tentar carregar Lotes!','Erro');
  //       console.error(error);
  //     }
  //   ).add(() => this.spinner.hide())
  // }

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
      telefone: ['', Validators.required],
      lotes: this.fb.array([])
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({id: 0} as Lote));
  }

  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim]
    })
  }

  public mudarValorData(value: Date, indice: number, campo: string): void {
    this.lotes.value[indice][campo] = value;
  }

  public retornaTituloLote(nome: string): string {
    return nome === null || nome === '' ? 'Nome do Lote' : nome;
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched }
  }

  public salvarEvento(): void {
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
          (eventoRetorno: Evento) => {
            this.toastr.success('Evento salvo com sucesso', 'Sucesso!');
            this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
          },
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

  public salvarLotes(): void {
    if (this.form.controls.lotes.valid) {
      this.spinner.show();
      this.loteService.saveLote(this.eventoId, this.form.value.lotes)
        .subscribe(
          () => {
            this.toastr.success('Lotes salvos com Sucesso!', 'Sucesso!');
            // this.lotes.reset();
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar salvar Lotes!', 'Erro!');
            console.error(error);
          }
        ).add(() => this.spinner.hide());
    }
  }

  public removerLote (template: TemplateRef<any>,
                      indice: number): void {
    this.loteAtual.id = this.lotes.get(indice + '.id')?.value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome')?.value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    //this.lotes.removeAt(indice);
  }

  public confirmDeleteLote(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.loteService.deleteLote(this.eventoId, this.loteAtual.id)
      .subscribe(
        () => {
          this.toastr.success('Lote deletado com sucesso','Sucesso');
          this.lotes.removeAt(this.loteAtual.indice);
        },
        (error: any) => {
          this.toastr.error(`Erro ao tentar deletar o lote ${this.loteAtual.nome} `, 'Erro');
          console.error(error);
        }
      ).add(() => this.spinner.hide());
  }

  public declineDeleteLote(): void {
    this.modalRef.hide();
  }

}

