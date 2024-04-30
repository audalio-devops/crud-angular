import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  //private readonly API = '/home/devops/Projetos/crud-angular-spring/crud-angular/src/assets/courses.json';
  private readonly API = '/assets/acourses.json';

  constructor(private httpClient : HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(3000),
      tap((courses: any) => console.log(courses))
    );

  }
}
