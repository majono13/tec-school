import { Injectable } from '@angular/core';
import { Student } from '../../models/aluno.model';
import { Course } from '../../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor() { }

  onPageEvent(event: any, data: any[]) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > data.length) endIndex = data.length;

    return data.slice(startIndex, endIndex);
  }
}
