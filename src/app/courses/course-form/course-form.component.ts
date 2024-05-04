import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, FormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  constructor() { }

  onCancel() {
    console.log('onCancel :');
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const formData = form.value;
      console.log('Dados do formulário:', formData);
    }
  }

}
