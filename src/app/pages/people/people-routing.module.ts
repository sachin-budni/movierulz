import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { LatestComponent } from './latest/latest.component';
import { DetailsComponent } from './details/details.component';

// const routes: Routes = [
//   { path: 'people', component: PeopleListComponent }
// ]
const routes: Routes = [
  { path: 'trendingchart', loadComponent: () => import('./../../components/trending-chart/trending-chart.component')
    .then(c => c.TrendingChartComponent), data: { title: 'trendingchart', name: 'Trending Chart of People' } },
  { path: 'popular', component: PeopleListComponent, data: { title: 'popular', name: 'Popular Tv-show' } },
  { path: 'upcoming', component: PeopleListComponent, data: { title: 'upcoming', name: 'Upcoming Tv-show' } },
  { path: 'latest', component: LatestComponent, data: { title: 'latest', name: 'Latest Tv-show' } },

  { path: 'popular/:id', component: DetailsComponent },
  { path: 'upcoming/:id', component: DetailsComponent },

  // { path: '', redirectTo: 'popular', pathMatch: 'full' },
  // { path: '**', redirectTo: 'popular', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
