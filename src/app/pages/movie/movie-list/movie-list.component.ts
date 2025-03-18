import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Response_Data, ROUTE_LIST, UrlQueryParam } from 'src/app/models/common-models';
import { Types_of_Movie } from 'src/app/models/movie-models';
import { MovieService } from 'src/app/service/movie.service';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
    standalone: false
})
export class MovieListComponent implements OnInit {

  routeName: ROUTE_LIST = 'popular';
  $movieList: Observable<Response_Data> = of();
  queryparamSubscription: Subscription | undefined;
  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.routeName = ((this.route.data as any).getValue().title);
    const name = ((this.route.data as any).getValue().name) as string;
    this.movieService.setTitle(name);
    this.queryparamSubscription = this.route.queryParams
    .subscribe((params: UrlQueryParam) => {
      if (params.page || params.language) {
        this.pageChange(params);
      } else {
        this.router.navigate([`movie/${this.routeName}`], { queryParams: { page: 1 } });
      }
    });
  }

  nextOrPreviousPage(d: UrlQueryParam | number): void {
    const param = typeof d === 'number' ? { page: d } : d;
    this.router.navigate([`movie/${this.routeName}`], { queryParams: param });
  }

  pageChange(params: UrlQueryParam): void {
    const Obj = this.movieService.convertLanguageObj(params);
    this.switchMovieList(Obj);
  }
  switchMovieList(Obj: UrlQueryParam): void {
    switch (this.routeName) {
      case 'top-rated':
        this.$movieList = this.movieService.getList('movie', Types_of_Movie.TOP_RATED, Obj);
        break;
      case 'now-playing':
        this.$movieList = this.movieService.getList('movie', Types_of_Movie.NOW_PLAYING, Obj);
        break;
      default:
        this.$movieList = this.movieService.getList('movie', this.routeName, Obj);
        break;
    }
  }
  ngOnDestroy(): void {
    this.queryparamSubscription?.unsubscribe();
  }
}
