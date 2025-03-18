import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';

@Component({
    selector: 'app-latest-movies',
    templateUrl: './latest-movies.component.html',
    styleUrls: ['./latest-movies.component.scss'],
    standalone: false
})
export class LatestMoviesComponent implements OnInit {
  routeName: any = 'popular';
  $latestMovies: Observable<any> = of();
  type: any = 'movie';
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.pageChange();
  }
  pageChange(): void {
    this.$latestMovies = this.movieService.getLatest(this.type);
  }
}
