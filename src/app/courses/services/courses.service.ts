import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  //private readonly API = '/assets/Acourses.json';
  private readonly API = 'api/courses';

  constructor(private httpClient : HttpClient) { }

  list(page = 0, pageSize = 10) {
    return this.httpClient.get<CoursePage>(this.API, { params: { page, pageSize } }) //, this.params)
    .pipe(
      first(),
      delay(1000),
      tap((courses: any) => console.log(courses))
    );
  }

  loadById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`).pipe(first())
  }

  save(record: Partial<Course>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>) {
    //console.log('Dados do formulário:', record);
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>) {
    //console.log('Dados do formulário:', record);
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first())
  }

  remove(id: string) {
    //console.log('Dados do formulário:', record);
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first())
  }

}
