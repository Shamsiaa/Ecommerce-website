import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenubarComponent } from './menubar/menubar.component';
import { FiltersComponent } from './filters/filters.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive, MenubarComponent, FiltersComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'interactive-systems-ss24';
}
