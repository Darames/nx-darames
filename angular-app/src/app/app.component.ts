import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faBars } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FontAwesomeModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    faClose = faClose;
    faBars = faBars;

    $menuCollapsed = new BehaviorSubject(false);

    toggleMenu(): void {
        this.$menuCollapsed.next(!this.$menuCollapsed.value);
        console.log(this.$menuCollapsed.value);
    }
}
