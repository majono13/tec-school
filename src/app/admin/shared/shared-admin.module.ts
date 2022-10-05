import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Módulos//
import { MaterialModule } from './material.module';

//Componentes//
import { InfoRouterComponent } from './components/info-router/info-router.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';

// Pipes //
import { UpperPipe } from 'src/app/pipes/upper.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';

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
    InfoRouterComponent,
    SpinnerComponent,
    ModalDeleteComponent,
    UpperPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    InfoRouterComponent,
    SpinnerComponent,
    ModalDeleteComponent,
    UpperPipe,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getIntl() },
  ]
})
export class SharedAdminModule { }
