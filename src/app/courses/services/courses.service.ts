import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  //private readonly API = '/assets/Acourses.json';
  private readonly API = 'api/courses';

  constructor(private httpClient : HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(1000),
      tap((courses: any) => console.log(courses))
    );
  }

  loadById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`).pipe(first())
  }

  save(record: Course) {
    //console.log('Dados do formulário:', record);
    return this.httpClient.post(this.API, record);
  }
}
