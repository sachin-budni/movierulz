import { Component, OnInit, Input, ElementRef, EventEmitter, Output, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Response_Data, ROUTE_LIST, UrlQueryParam } from 'src/app/models/common-models';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss'],
    standalone: false
})
export class MovieComponent implements OnInit {

  @Input('Movies') $Movies: Observable<Response_Data> = of();
  @Input('MovieClassName') $nameOfRoute: ROUTE_LIST | null = null;
  @Output() pages = new EventEmitter<UrlQueryParam | number>();
  route = inject(ActivatedRoute);

  ngOnInit(): void {
  }

  pageChange(d: number): any {
    const params: UrlQueryParam = this.route.snapshot.queryParams;
    if (params.language) {
      this.pages.emit({ language: params.language, page: d });
    } else {
      this.pages.emit(d);
    }
  }

}
