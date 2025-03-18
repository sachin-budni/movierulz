import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
import { TYPES_OF_TV, Types_of_Tv } from './../../../models/tv-models';
import { Response_Data, ROUTE_LIST, TYPES_OF_ROUTES, Types_of_Routes } from './../../../models/common-models';

@Component({
    selector: 'app-tv-list',
    templateUrl: './tv-list.component.html',
    styleUrls: ['./tv-list.component.scss'],
    standalone: false
})
export class TvListComponent implements OnInit {

  routeName: ROUTE_LIST = 'popular';
  $movieList: Observable<Response_Data> = of();
  queryParamSubscription: Subscription | undefined;
  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): any {
    this.routeName = ((this.route.data as any).getValue()?.title) as any;
    const name = ((this.route.data as any).getValue()?.name) as any;
    this.movieService.setTitle(name);
    this.queryParamSubscription = this.route.queryParams
    .subscribe((params: any) => {
      if (params.page || params.language) {
        this.pageChange(params);
      } else {
        this.router.navigate([`tv/${this.routeName}`], { queryParams: { page: 1 } });
      }
    });
  }

  nextOrPreviousPage(d: any): void {
    const param = typeof d === 'number' ? { page: d } : d;
    this.router.navigate([`tv/${this.routeName}`], { queryParams: param });
  }

  pageChange(params: any): any {
    const Obj = this.movieService.convertLanguageObj(params);
    this.switchMovieList(Obj);
  }
  switchMovieList(Obj: any): void {
    switch (this.routeName) {
      case 'upcoming':
        this.$movieList = this.movieService.getList(Types_of_Routes.TV, Types_of_Tv.ON_THE_AIR, Obj);
        break;
      case 'top-rated':
        this.$movieList = this.movieService.getList(Types_of_Routes.TV, Types_of_Tv.TOP_RATED, Obj);
        break;
      case 'now-playing':
        this.$movieList = this.movieService.getList(Types_of_Routes.TV, Types_of_Tv.AIRING_TODAY, Obj);
        break;
      default:
        this.$movieList = this.movieService.getList(Types_of_Routes.TV, this.routeName, Obj);
        break;
    }
  }

  ngOnDestroy() {
    this.queryParamSubscription?.unsubscribe();
  }
}
