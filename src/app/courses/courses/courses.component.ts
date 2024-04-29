import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Course } from './../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent {

  courses: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  //Also can initialize inside constructor
  constructor( private coursesService: CoursesService) {

    this.courses = this.coursesService.list();

  }


}
