import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { baseUrl, httpOptions } from '../../config';

export interface Status {
  status: "ok" | "error";
};

export interface LoggedResponse extends Status {
  name  : string | null;
  email : string | null;
  role  : string | null;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged: boolean|null = null;
  name  : string|null  = null;
  email : string|null  = null;
  role  : string|null  = null;
  avatar: string|null  = null;

  constructor(private http: HttpClient) { }

  login(data: {email: string, password: string}) {

    const result = this.http.post<Status>(baseUrl + '/login', data, httpOptions);

    result.subscribe({
      next: () => {
        this.isLogged();
      }
    });

    return result;
  }

  logout() {

    const result = this.http.post<Status>(baseUrl + '/logout', {}, httpOptions);

    result.subscribe({
      next: () => {
        this.isLogged();
      }
    });

    return result;
  }

  isLogged() {

    const result = this.http.get<LoggedResponse>(baseUrl + '/credentials', httpOptions);

    result.subscribe({
      next: (response) => {
        this.logged = response.status === 'ok';
        this.name   = response.name;
        this.email  = response.email;
        this.role   = response.role;
        this.avatar = response.name?.slice(0, 1).toUpperCase() || null;
      }
    });

    return result;
  }
}
