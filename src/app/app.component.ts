import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TextService } from './core/services/text.service';

/**
 * Root component of the OTP microfrontend application.
 * Initializes the text service with Spanish language as default.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  /**
   * Creates an instance of AppComponent
   * @param textService - Service for managing internationalization texts
   */
  constructor(private readonly textService: TextService) {}

  /**
   * Angular lifecycle hook - initializes the application
   * Loads Spanish texts as default language
   */
  ngOnInit(): void {
    this.textService.loadTexts('es').subscribe();
  }
}
