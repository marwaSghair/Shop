import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'osf-front-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContainerComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}
 
}
