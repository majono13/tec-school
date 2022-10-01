import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

// Modulos//
import { AdminRoutingModule } from '../admin-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedAdminModule } from '../shared/shared-admin.module';

// Componentes//
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { StudentsComponent } from './students/students.component';
import { UpperPipe } from 'src/app/pipes/upper.pipe';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

import { AddressService } from './address.service';

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
    AddComponent,
    StudentsComponent,
    UpperPipe,
    DetailsComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
    SharedAdminModule,
    FormsModule,
  ],
  exports: [],
  providers: [
    { provide: MatPaginatorIntl, useValue: getIntl() },
    AddressService
  ]
})
export class AlunosModule { }
