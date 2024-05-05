import { Component, Input } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute, Router } from '@angular/router';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CategoryPipe } from "../../shared/pipes/category.pipe";

@Component({
    selector: 'app-course-list',
    standalone: true,
    templateUrl: './course-list.component.html',
    styleUrl: './course-list.component.scss',
    imports: [AppMaterialModule, CategoryPipe]
})
export class CourseListComponent {

  @Input() courses: Course[] = [];
  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
    console.log('onAdd');
  }

}
