import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-info-router',
  templateUrl: './info-router.component.html',
  styleUrls: ['./info-router.component.scss']
})
export class InfoRouterComponent implements OnInit {

  @Input() route: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

}
