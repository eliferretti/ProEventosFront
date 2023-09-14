import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Evento } from '../models/Evento';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '@app/models/Pagination';

@Injectable(
 // { providedIn: 'root' }
)
export class EventoService {
  baseURL = environment.apiUrl + 'api/eventos';
  
  // userJSON = localStorage.getItem('user');
  // tokenHeader = new HttpHeaders({
  //  'Authorization': this.userJSON ? `Bearer ${JSON.parse(this.userJSON).token}` : ''
  // });

  // tokenHeader = new HttpHeaders({
  //   'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('user')).token}` });
  //baseURL = 'https://localhost:5001/api/eventos';
  constructor(private http: HttpClient) { }

  public getEventos(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<Evento[]>> {
    const paginatedResult: PaginatedResult<Evento[]> = new PaginatedResult<Evento[]>();

    let params = new HttpParams;

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (term != null && term != '') {
      params = params.append('term', term);
    }

    return this.http
      .get<Evento[]>(this.baseURL, {observe: 'response', params })
      .pipe(take(1), 
      map((response) => {
        
        if(response.body == null) return paginatedResult;

        paginatedResult.result = response.body;
        
        const paginationHeader = response.headers.get('Pagination');
        paginatedResult.pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

        return paginatedResult;
      }));
  }

  // public getEventosByTema(tema: string): Observable<Evento[]> {
  //   return this.http
  //     .get<Evento[]>(`${this.baseURL}/${tema}/tema`)
  //     .pipe(take(1));
  // }

  public getEventoById(id: number): Observable<Evento> {
    return this.http
      .get<Evento>(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }

  public post(evento: Evento): Observable<Evento> {
    return this.http
      .post<Evento>(this.baseURL, evento)
      .pipe(take(1));
  }

  public put(evento: Evento): Observable<Evento> {
    return this.http
      .put<Evento>(`${this.baseURL}/${evento.id}`, evento)
      .pipe(take(1));
  }

  public deleteEvento(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }

  public postUpload(eventoId: number, file: File): Observable<Evento> {
    const fileToUpload = file as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post<Evento>(`${this.baseURL}/upload-image/${eventoId}`, formData)
      .pipe(take(1));
  }
}
