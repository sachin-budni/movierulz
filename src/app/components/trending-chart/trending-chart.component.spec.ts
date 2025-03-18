import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingChartComponent } from './trending-chart.component';

describe('TrendingChartComponent', () => {
  let component: TrendingChartComponent;
  let fixture: ComponentFixture<TrendingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
