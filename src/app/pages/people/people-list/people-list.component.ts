import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss'],
    standalone: false
})
export class PeopleListComponent implements OnInit {
  routeName: any = 'popular';
  $movieList: Observable<any> = of();
  queryParamSubscription: Subscription | undefined;
  constructor(private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): any {
    this.routeName = ((this.route.data as any).getValue()?.title) as any;
    const name = ((this.route.data as any).getValue()?.name) as any;
    this.movieService.setTitle(name);
    this.queryParamSubscription = this.route.queryParams.subscribe((params: any) => {
      if (params.page || params.language) {
        this.pageChange(params);
      } else {
        this.router.navigate([`people/${this.routeName}`], { queryParams: { page: 1 } });
      }
    });
  }

  nextOrPreviousPage(d: any): void {
    const param = typeof d === 'number' ? { page: d } : d;
    this.router.navigate([`people/${this.routeName}`], { queryParams: param });
  }

  pageChange(params: any): any {
    const Obj = this.movieService.convertLanguageObj(params);
    this.switchMovieList(Obj);
  }
  switchMovieList(Obj: any): void {
    switch (this.routeName) {
      case 'popular':
        this.$movieList = this.movieService.getList('person', 'popular', Obj);
        break;
      default:
        this.$movieList = this.movieService.getList('person', this.routeName, Obj);
        break;
    }
  }
  ngOnDestroy() {
    this.queryParamSubscription?.unsubscribe();
  }
}
