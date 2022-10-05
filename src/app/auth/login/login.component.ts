import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Snackbar } from 'src/app/admin/shared/services/snackbar.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    acessCode: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar_: Snackbar) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.authService.login(this.loginForm.value)
      .subscribe({
        error: err => this.snackbar_.notify('Ops! Algo deu errado, verifique suas credenciais ou contate um administrador.'),
        next: () => this.router.navigateByUrl('/admin')
      })
  }

}
