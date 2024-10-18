import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { DescriptionPipe } from '../../shared/pipes/description.pipe';
import { forkJoin, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    HeaderComponent,
    BannerComponent,
    MovieCarouselComponent,
    DescriptionPipe,
    CommonModule,
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService);
  profileData: any = sessionStorage.getItem('loggedInUser');
  data = JSON.parse(this.profileData);
  name = this.data.name;
  email = this.data.email;
  picture = this.data.picture;
  movieService = inject(MovieService);
  bannerDetails$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  // creating properties
  movies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  upComingMovies: IVideoContent[] = [];
  topRated: IVideoContent[] = [];
  // here we have to call multiple apis so
  // we have to use fork join
  // to use fork join we have to create source of observable

  sources = [
    this.movieService.getMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTvShows(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getTopRated(),

    // you can add other apis here
  ];

  ngOnInit(): void {
    forkJoin(this.sources)
      .pipe(
        map(
          ([
            movies,
            popularMovies,
            tvShows,
            nowPlayingMovies,
            upComingMovies,
            topRated,
          ]) => {
            return {
              movies,
              popularMovies,
              tvShows,
              nowPlayingMovies,
              upComingMovies,
              topRated,
            };
          }
        )
      )
      .subscribe((res: any) => {
        this.movies = res.movies.results as IVideoContent[];
        this.popularMovies = res.popularMovies.results;
        this.tvShows = res.tvShows.results;
        this.nowPlayingMovies = res.nowPlayingMovies.results;
        this.upComingMovies = res.upComingMovies.results;
        this.topRated = res.topRated.results;
        // making movies data observavable in bannerDetails
        this.bannerDetails$ = this.movieService.getBannerDetail(
          this.movies[this.getRandomMovie()].id
        );
        this.bannerVideo$ = this.movieService.getBannerVideo(
          this.movies[this.getRandomMovie()].id
        );
        console.log(this.bannerDetails$);
        // this.getMoviesKey();
      });
  }

  getRandomMovie(): number {
    const randomNumber = Math.floor(Math.random() * 21); // 21 to include 20
    return randomNumber;
  }

  signOut() {
    this.auth.signOut();
    sessionStorage.removeItem('loggedInUser');
  }
}
