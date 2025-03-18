import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { LatestMoviesComponent } from './latest-movies/latest-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieLayoutComponent } from './movie-layout/movie-layout.component';
const routes: Routes = [
  { path: 'movie', component: MovieLayoutComponent, children: [
      { path: 'popular', component: MovieListComponent, data: { title: 'popular', name: 'Popular Movies' } },
      { path: 'upcoming', component: MovieListComponent, data: { title: 'upcoming', name: 'Upcoming Movies' } },
      { path: 'latest', component: LatestMoviesComponent, data: { title: 'latest', name: 'Latest Movies' } },
      { path: 'top-rated', component: MovieListComponent, data: { title: 'top-rated', name: 'Top-rated Movies' } },
      { path: 'now-playing', component: MovieListComponent, data: { title: 'now-playing', name: 'Now-playing Movies' } },
      { path: 'popular/:id', component: MovieDetailsComponent },
      { path: 'upcoming/:id', component: MovieDetailsComponent },
      { path: 'top-rated/:id', component: MovieDetailsComponent },
      { path: 'now-playing/:id', component: MovieDetailsComponent },
      { path: '', redirectTo: 'popular', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'movie', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
