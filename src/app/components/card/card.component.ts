import { Component, Input, OnInit } from '@angular/core';
import { UserMaterialModule } from '../user-material.module';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-card',
    imports: [UserMaterialModule, CommonModule, RouterLink],
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() credits: any = undefined;
  @Input() link: any = undefined;
  ngOnInit(): void {
  }
}
