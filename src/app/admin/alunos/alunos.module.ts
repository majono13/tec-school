import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { InfoRouterComponent } from '../shared/components/info-router/info-router.component';
import { AddComponent } from './add/add.component';
import { StudentsComponent } from './students/students.component';
import { UpperPipe } from 'src/app/pipes/upper.pipe';
import { DetailsComponent } from './details/details.component';

/**** Configurações de idioma do paginator *****/
const rangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} de ${length}`;
}

export function getIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Quantidade por página:';
  paginatorIntl.nextPageLabel = 'Próxima página';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primeira página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = rangeLabel;
  return paginatorIntl;
}

@NgModule({
  declarations: [
    HomeComponent,
    InfoRouterComponent,
    AddComponent,
    StudentsComponent,
    UpperPipe,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  exports: [InfoRouterComponent],
  providers: [
    { provide: MatPaginatorIntl, useValue: getIntl() }
  ]
})
export class AlunosModule { }
