import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  collaboratorsSection: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.collaboratorsSection = this.authService.getPermissionUser();
  }

}
