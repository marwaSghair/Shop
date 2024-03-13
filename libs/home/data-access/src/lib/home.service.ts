import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../apps/osf/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }
  getProducts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}products`)
  }
}
