import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Snackbar {

  constructor(private sanckbar: MatSnackBar) { }

  notify(menssagem: string) {
    this.sanckbar.open(menssagem, "Ok", { duration: 3000 });
  }
}
