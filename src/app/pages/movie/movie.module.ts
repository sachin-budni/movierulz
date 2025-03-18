import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieComponent } from './movie/movie.component';
import { LatestMoviesComponent } from './latest-movies/latest-movies.component';
import { MovieLayoutComponent } from './movie-layout/movie-layout.component';
import { UserMaterialModule } from 'src/app/components/user-material.module';
import { CardComponent } from 'src/app/components/card/card.component';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    MovieComponent,
    LatestMoviesComponent,
  ],
  imports: [
    MovieLayoutComponent,
    CommonModule,
    MovieRoutingModule,
    UserMaterialModule,
    CardComponent
  ],
  providers: []
})
export class MovieModule { }
