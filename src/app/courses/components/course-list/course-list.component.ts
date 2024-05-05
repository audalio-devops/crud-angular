import { Component, Input, Output } from '@angular/core';
import { Course } from '../../model/course';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CategoryPipe } from "../../../shared/pipes/category.pipe";
import { EventEmitter } from '@angular/core';


@Component({
    selector: 'app-course-list',
    standalone: true,
    templateUrl: './course-list.component.html',
    styleUrl: './course-list.component.scss',
    imports: [AppMaterialModule, CategoryPipe]
})
export class CourseListComponent {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);


  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() {

  }

  onAdd() {
    this.add.emit(true);

  }

  onEdit(course : Course) {
    this.edit.emit(course);

  }
}
