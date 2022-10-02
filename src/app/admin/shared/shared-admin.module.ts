import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Módulos//
import { MaterialModule } from 'src/app/shared/material.module';

//Componentes//
import { InfoRouterComponent } from './components/info-router/info-router.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    InfoRouterComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [InfoRouterComponent, SpinnerComponent]
})
export class SharedAdminModule { }
