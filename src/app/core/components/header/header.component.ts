import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  auth=inject(AuthService)
  @Input() fullName: string = '';
  @Input() userImage: string = '';
  @Output() onClick = new EventEmitter()

  ngOnInit(): void {
  }
  emitEvent(){
    this.onClick.emit();
  }
  
  navList: string[] = [
    'Home',
    'Tv shows',
    'News & Popular',
    'My List',
    'Browse by Language',
  ];
 
}
