import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { InfoRouterComponent } from '../shared/components/info-router/info-router.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [

    HomeComponent,
    InfoRouterComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [InfoRouterComponent]
})
export class AlunosModule { }
