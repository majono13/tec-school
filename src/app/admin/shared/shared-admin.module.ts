import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Módulos//
import { MaterialModule } from 'src/app/shared/material.module';

//Componentes//
import { InfoRouterComponent } from './components/info-router/info-router.component';


@NgModule({
  declarations: [
    InfoRouterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [InfoRouterComponent]
})
export class SharedAdminModule { }
