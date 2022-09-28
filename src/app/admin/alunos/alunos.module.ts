import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { InfoRouterComponent } from '../info-router/info-router.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [

    HomeComponent,
    InfoRouterComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [InfoRouterComponent]
})
export class AlunosModule { }
