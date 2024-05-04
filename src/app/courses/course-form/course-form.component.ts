import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { NgForm, FormsModule } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, FormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})

export class CourseFormComponent {

  constructor(private service: CoursesService,
              private snackBar: MatSnackBar) { }

  onCancel() {
    console.log('onCancel :');
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.service
        .save(form.value)
        .subscribe({
          next: (data) => console.log(data),
          error: () => { this.onError();},
        });
    }
  }

  private onError() {
    this.snackBar.open('Erro ao salvar Curso!', '', {duration:5000});
  }

}
