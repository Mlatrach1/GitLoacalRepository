import { Injectable } from '@angular/core';
import { IPerson } from './model/IPerson';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Medborjarskap } from './model/Medborjarskap';


@Injectable({
  providedIn: 'root'
})
export class SrnsService {
  wireMockUrl: 'http://localhost:8080/api/countries';
  countriesUrl = 'http://localhost:3000/countries'; //'http://localhost:8080/api/countries'; 
  baseUrl = 'http://localhost:3000/person';  //'http://localhost:8080/api/samordningsnummer';
  uploadUrl = "https://file.io";  // 'http://localhost:8080/api/samordningsnummer';

  constructor(private httpClient: HttpClient) {
  }

  getCountries(): Observable<Medborjarskap[]> {
    return this.httpClient.get<Medborjarskap[]>(this.countriesUrl)
      .pipe(catchError(this.handleError));

  }

  getPersons(): Observable<IPerson[]> {
    return this.httpClient.get<IPerson[]>(this.baseUrl)
      .pipe(catchError(this.handleError));

  }


  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }

  getPerson(id: number): Observable<IPerson> {
    return this.httpClient.get<IPerson>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addPerson(person: IPerson): Observable<IPerson> {
    return this.httpClient.post<IPerson>(this.baseUrl, person, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }


  deletePesron(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  uploadFile(file): Observable<any> {
    const formData = new FormData();

    formData.append("file", file, file.name);
    return this.httpClient.post(this.uploadUrl, formData)
  }

}
