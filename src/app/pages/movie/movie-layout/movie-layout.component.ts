import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-movie-layout',
    templateUrl: './movie-layout.component.html',
    styleUrls: ['./movie-layout.component.scss'],
    imports: [RouterOutlet]
})
export class MovieLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
