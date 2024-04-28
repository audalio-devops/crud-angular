import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Course } from './../model/course';
import { Component } from '@angular/core';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent {

  courses: Course[] = [
    { _id: "1", name: 'Angular', category:'front-end' },
    { _id: "2", name: 'React', category:'front-end' },
    { _id: "3", name: 'CSharp', category:'full stack' },
    { _id: "4", name: 'Java', category:'back-end' },

  ];
  displayedColumns = ['name', 'category'];

  //Também Pode inicializar dentro do constructor
  //constructor() {
  //  this.courses = [];
  //}

}
