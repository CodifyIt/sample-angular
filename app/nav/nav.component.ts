import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  selectedRoute: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(url => this.selectedRoute = url[0].path);
  }

}
