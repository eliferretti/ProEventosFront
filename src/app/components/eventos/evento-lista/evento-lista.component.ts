import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public larguraImagem: number = 150;
  public margemImagem: number = 2;
  public exibirImagem: boolean = true;
  public eventoId: number = 0;
  private filtroListado: string = '';

  public get filtroLista(): string {
    return this.filtroListado;
  }
  public set filtroLista(value: string){
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor)!== -1
    );
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.carregarEventos();
  }

  public alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public mostraImagem(imagemUrl: string): string {
    return imagemUrl != '' && imagemUrl != null
      ? `${environment.apiUrl}resources/images/${imagemUrl}`
      : 'assets/img/semimagem.png';
  }

  public carregarEventos(): void {
    const observer = {
      next:(eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos
      },
      error: (error: any) => {
        this.spinner.hide(),
        this.toastr.error('Erro ao carrgar os Eventos','Error!');
      },
      complete: () => this.spinner.hide()
    }
    this.eventoService.getEventos().subscribe(observer);
  }

  openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: any) => {
        if (result.message === 'Deletado') {
          console.log(result);
          this.toastr.success('O evento foi deletado com sucesso.', 'Deletado!');
          // this.spinner.hide();
          this.carregarEventos();
        }
      },
      (error: any) => {
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`, 'Erro');
        // this.spinner.hide();
        console.error(error);
      },
      // () => this.spinner.hide(),
    ).add(() => this.spinner.hide());


  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void {
    this.router.navigate([`/eventos/detalhe/${id}`]);
  }

}
