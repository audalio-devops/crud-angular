import { Component } from '@angular/core';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { NgForm, FormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
    selector: 'app-course-form',
    standalone: true,
    templateUrl: './course-form.component.html',
    styleUrl: './course-form.component.scss',
    imports: [AppMaterialModule, FormsModule]
})

export class CourseFormComponent {

  constructor(private service: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location) { }

  onCancel() {
    this.location.back();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.service
        .save(form.value)
        .subscribe({
          next: (data) => this.onSuccess(),
          error: () => this.onError(),
        });
    }
  }

  private onError() {
    this.snackBar.open('Erro ao salvar Curso!', '', {duration:5000});
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com Sucesso!', '', {duration:5000});
    this.location.back();
  }

}
