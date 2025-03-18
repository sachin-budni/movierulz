import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss'],
    standalone: false
})
export class PeopleComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('Movies') $Movies: Observable<any> = of({});
  // tslint:disable-next-line:no-input-rename
  @Input('MovieClassName') $nameOfRoute: Observable<any> = of();
  @Output() pages = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): any {
  }

  pageChange(d: number): any {
    const params: any = this.route.snapshot.queryParams;
    if (params.language) {
      this.pages.emit({
        language: params.language,
        page: d
      });
    } else {
      this.pages.emit(d);
    }
  }
}
