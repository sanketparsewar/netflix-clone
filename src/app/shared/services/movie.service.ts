import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const options = {
  params: {
    include_adult: 'false',
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc',
  },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDg5ZWZkMzc3NTAzYmVmZTRmMWZlNjNkOTEyNDRmMSIsIm5iZiI6MTcyOTE0MDMzNy4yMjUyODgsInN1YiI6IjY1Y2ExYTgxMDgzNTQ3MDE4NGNmYjUxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w7duFWkwk5Qz0oWYQJIRAsbmGNn0fi2o_bwRzh0LU5s',
  },
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);
  constructor() {}
  getMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/discover/movie',
      options
    );
  }
  getTvShows() {
    return this.http.get('https://api.themoviedb.org/3/discover/tv', options);
  }

  getRatedMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies',
      options
    );
  }

  getBannerImage() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/575264/images',
      options
    );
  }

  getBannerVideo(id: any) {

    return this.http.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      options
    );
  }

  getBannerDetail(id: any) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

  getNowPlayingMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/now_playing',
      options
    );
  }

  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', options);
  }
  getTopRated() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/top_rated',
      options
    );
  }

  getUpcomingMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/upcoming',
      options
    );
  }
}
