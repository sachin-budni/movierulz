import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleRoutingModule } from './people-routing.module';
import { DetailsComponent } from './details/details.component';
import { LatestComponent } from './latest/latest.component';
import { PeopleComponent } from './people/people.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserMaterialModule } from 'src/app/components/user-material.module';
import { CardComponent } from 'src/app/components/card/card.component';


@NgModule({
  declarations: [
    PeopleListComponent,
    DetailsComponent,
    LatestComponent,
    PeopleComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    UserMaterialModule,
    CardComponent
  ]
})
export class PeopleModule { }
