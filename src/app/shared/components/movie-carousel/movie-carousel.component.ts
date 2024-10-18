import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swiper from 'swiper';
import { IVideoContent } from '../../models/video-content.interface';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { ImagePipe } from '../../pipes/image.pipe';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [FormsModule, CommonModule, DescriptionPipe, ImagePipe],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css',
  // adding anmations in angular
  // fade is animation name
  // assigning style opacity to 0 then adding 300ms delay and then opacity to 1
  // after creating animation to use it we have to import provideAnimations in app.config.ts file
  // to use in html write @fade
  animations: [
    trigger('fade', [
      transition('void=>*', [
        style({
          opacity: 0,
        }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})

export class MovieCarouselComponent implements OnInit, AfterViewInit {
  // make this movie carousel as child component
  @Input() videoContents: IVideoContent[] = [];
  @Input() title!: string;
  // this property is declare to get the data
  selectedContent: string | null = null;

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  constructor() {}
  ngAfterViewInit(): void {
    this.initSwiper();
  }
  ngOnInit(): void {}
  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      // this are the defautl properties
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      // these are the costume properties based on the size
      breakpoints: {
        300: {
          slidesPerView: 1,
          slidesPerGroup: 2,
          spaceBetween: 3,
          centeredSlides: true,
        },
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 7,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        },
      },
    });
  }
  // this method we are creating when the ouse is hover on movie card then the data should appear
  setHoverMovie(movie: IVideoContent) {
    // if the title of movie is null then set this with movie.name
    this.selectedContent = movie.title ?? movie.name;
  }
  // this is to Clear the content of the movie when we move
  clearHoverMovie() {
    this.selectedContent = null;
  }
}
