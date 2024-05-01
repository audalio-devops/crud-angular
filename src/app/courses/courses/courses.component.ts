import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Course } from './../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { CategoryPipe } from "../../shared/pipes/category.pipe";

@Component({
    selector: 'app-courses',
    standalone: true,
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
    imports: [AppMaterialModule, CommonModule, CategoryPipe]
})

export class CoursesComponent {

  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  //Also can initialize inside constructor
  constructor(
      private coursesService: CoursesService,
      public dialog: MatDialog
    ) {

    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        //console.log(error)
        this.openError(' Erro ao carregar cursos! ')
        return of([])
      })
    );

  }

  openError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }


}
