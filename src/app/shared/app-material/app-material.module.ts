import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';


@NgModule({

  exports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule
  ]
})
export class AppMaterialModule { }
