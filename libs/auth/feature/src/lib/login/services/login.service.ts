import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "apps/osf/src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    return this.httpClient.post(`${environment.baseUrl}authenticate`, {
      username: username,
      password: password
    })
  }
}
