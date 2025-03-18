import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';

const img = `width: 60px;height: 60px;border-radius: 50%;object-fit: cover;`

@Component({
  selector: 'app-trending-chart',
  templateUrl: './trending-chart.component.html',
  styleUrls: ['./trending-chart.component.scss'],
})
export class TrendingChartComponent implements OnInit {
  routeName = 'trendingchart';
  rating: any[] = [];
  movieTitles: any[] = [];
  all: any[] = [];
  error: any = 'Loading...';
  @ViewChild('main', { static: true }) main!: ElementRef;
  getTrendingChartsSubscription: Subscription | undefined;

  chartOption: EChartsOption = {
    color: ['#4fffc3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: ((val: any) => {
        const { poster_path, profile_path, title, name, known_for_department, vote_count, popularity } = val[0].data;
        let voteOrMovie = !profile_path ? `<p style="margin: 2px 0px;">Votes: ${vote_count}</p>`
          : `<p style="margin: 2px 0px;">Profession: ${known_for_department}</p>`;
        return `
          <div style="display: flex; ">
            <img style="${img}" src="https://image.tmdb.org/t/p/w500/${poster_path ?? profile_path}" alt="${name ?? title}"/>
            <div style="padding-left: 10px;">
              <h4 style="margin: 0px 0px 2px;">${name ?? title}</h4>
              ${voteOrMovie}
              <p style="margin: 2px 0px 0px;">Popularity: ${popularity}</p>
            </div>
          </div>`
      })
    },
    grid: {
      left: '5%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: this.movieTitles,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: '#eabcbc',
          fontSize: 10,
          formatter: ((value: any) => {
            return value.substr(0, 4) + '...';
          })
        }
      }
    ],
    yAxis: [
      {
        name: 'Rating',
        type: 'value',
        nameTextStyle: {
          color: '#eabcbc',
          fontSize: 18,
          verticalAlign: 'top',
          padding: -20
        },
        nameLocation: 'middle',
        nameGap: 40,
        axisLabel: {
          color: '#eabcbc',
          fontSize: 18
        }
      }
    ],
    dataset: this.all,
    series: [
      {
        name: 'Ratings',
        type: 'bar',
        barWidth: 20,
        data: this.rating
      }
    ]
  };

  constructor(private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    const url = this.router.url;
    const path = url.substring(url.indexOf('/'), url.indexOf('/', 1));
    const type = path.substring(1);
    const name = ((this.route.data as any).getValue()?.name) as any;
    this.movieService.setTitle(name);
    if (this.rating.length === 0) {
      this.getTrendingChartsSubscription = this.movieService.getTrendingCharts(type === 'people' ? 'person' : type)
        .subscribe((data: any) => {
          this.rating.push(...data.results.map((d: any) => ({ value: d.vote_average ?? d.popularity, ...d })));
          this.movieTitles.push(...data.results.map((d: any) => (d.title ? d.title : d.name)));
          this.all = data.results;
          this.error = '';
          const echart = echarts.init(this.main.nativeElement);
          echart.setOption(this.chartOption);
          echart.on('click', (params: any) => {
            const { media_type } = params.data;
            if (params.data.id && media_type) {
              const path = media_type === 'person' ? 'people' : media_type;
              this.router.navigate([`${path}/popular`, params.data.id])
            }
          })
        }, (err: any) => this.error = err);
    }
  }

  ngOnDestroy() {
    this.getTrendingChartsSubscription?.unsubscribe();
  }
}
