import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';

@Component({
    selector: 'app-latest',
    templateUrl: './latest.component.html',
    styleUrls: ['./latest.component.scss'],
    standalone: false
})
export class LatestComponent implements OnInit {
  $latestTV: Observable<any> = of();
  type: any = 'tv';
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.pageChange();
  }

  pageChange(): void {
    this.$latestTV = this.movieService.getLatest(this.type);
  }

}
