import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;
  url_prefix = 'localhost:8000';
  constructor(private http: Http ) {
    this.url = this.url_prefix + '/api/v1/users/';
  }

  getAllUsers = () => {
    return this.http.get(this.url).pipe(map(res => res.json()));
  }

  // filterUser = (id: number) => {
  //   return this.get(this.url, {  })
  // }
}
