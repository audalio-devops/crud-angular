import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  //private readonly API = '/home/devops/Projetos/crud-angular-spring/crud-angular/src/assets/courses.json';
  private readonly API = '/assets/courses.json';

  constructor(private httpClient : HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API);
  }
}
