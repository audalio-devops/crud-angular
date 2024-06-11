import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CategoryPipe } from "../../../shared/pipes/category.pipe";
import { ActivatedRoute, Router } from '@angular/router';
import { CourseListComponent } from '../../components/course-list/course-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CoursePage } from '../../model/course-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-courses',
    standalone: true,
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
    imports: [AppMaterialModule, CommonModule, CategoryPipe, CourseListComponent]
})

export class CoursesComponent {

  courses$!: Observable<CoursePage>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  //Also can initialize inside constructor
  constructor(
      private coursesService: CoursesService,
      public dialog: MatDialog,
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
    ) {
    this.refresh();
  }

  refresh(pageEvent : PageEvent = {length: 0, pageIndex: 0, pageSize: 10}) {
    this.courses$ = this.coursesService.list(pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap( () => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(error => {
        this.openError(' Erro ao carregar cursos! ')
        return of({courses: [], totalElements: 0, totalPages: 0});
      })
    );
  }

  openError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
    console.log('onEdit');
  }

  onRemove(course: Course) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Confirma a exclusão deste curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('The dialog was closed');
      if( result) {
        console.log('onRemove');
        this.coursesService.remove(course._id).subscribe({
          next: () => {
            this.refresh();
            this.snackBar.open('Course removed successfully!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error: () => this.openError('Erro ao remover curso!')
        });
      };
    });




  }

}
function next(value: Object): void {
  throw new Error('Function not implemented.');
}

