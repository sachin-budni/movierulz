import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { UserMaterialModule } from '../components/user-material.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { MovieApiInterceptor } from '../service/api.interceptor';
import { LanguageFilterComponent } from '../components/language-filter/language-filter.component';
import { MovieFilterComponent } from '../components/movie-filter/movie-filter.component';
import { ThemeDirective } from '../theme/theme.directive';
import { BehaviorSubject, Observable } from 'rxjs';
const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'all/trendingchart', loadComponent: () => import('./../components/trending-chart/trending-chart.component')
      .then(c => c.TrendingChartComponent) , data: { title: 'trendingchart', name: 'Trending Chart' } },
    { path: 'tv', loadChildren: () => import('./../pages/tv/tv.module').then(m=> m.TvModule) },
    { path: 'people', loadChildren: () => import('./../pages/people/people.module').then(m=> m.PeopleModule) },
    { path: '', loadChildren: () => import('./../pages/movie/movie.module').then(m=> m.MovieModule) },
    { path: '**', loadComponent: () => import('./../components/page-not-found.component')
      .then(c => c.PageNotFoundComponent)
     }
  ] },
];
export interface ThemeConfig {
  getActiveTheme: () => Observable<any>;
  setActiveThem: (name: any) => void
}
export const THEME_SERVICE = new InjectionToken<ThemeConfig>('Theme');
@NgModule({ declarations: [
        LayoutComponent
    ],
    exports: [
        LayoutComponent
    ], imports: [CommonModule,
        RouterModule.forChild(routes),
        UserMaterialModule,
        LanguageFilterComponent,
        MovieFilterComponent,
        ThemeDirective], providers: [
        MovieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MovieApiInterceptor,
            multi: true
        },
        {
            provide: THEME_SERVICE,
            useFactory: themeService,
            deps: []
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class LayoutModule { }


function themeService() {
  let activeThem = new BehaviorSubject('dark');
  let getActiveTheme = () : Observable<string> => activeThem.asObservable();
  let setActiveThem = (name: any): void => activeThem.next(name);
  return { getActiveTheme, setActiveThem };
}

