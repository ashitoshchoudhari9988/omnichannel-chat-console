import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);

  getUsers() {
    return this.http.get('https://dummyjson.com/users');
  }

  getComments() {
    return this.http.get('https://dummyjson.com/comments');
  }

  getPosts() {
    return this.http.get('https://dummyjson.com/posts');
  }


  getAIResponse() {
  return this.http.get('https://dummyjson.com/comments/1');
}
}