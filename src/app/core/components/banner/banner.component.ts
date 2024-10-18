import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements OnChanges {
  // if we write here as required then it should definitely have a title;
  @Input() bannerTitle: string = '';
  @Input() bannerOverview: string = '';
  @Input() key: string = '';
  // as accessing th url angular says this url is not safe to we need to sanitize the url
  private sanitizer = inject(DomSanitizer);
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&iv_load_policy=3&loop=1&playlist=${this.key}`
  );
  ngOnChanges(changes: SimpleChanges): void {
    // here we are checking for the change of the key
    // this is we are doing for safer side
    if (changes['key']) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&iv_load_policy=3&loop=1&playlist=${this.key}`
      );
    }
  }
}
