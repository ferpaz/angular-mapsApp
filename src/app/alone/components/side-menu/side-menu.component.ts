import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  text: string;
  route: string;
}

@Component({
  standalone: true,
  imports: [ RouterModule ],
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { text: 'Full Screen', route: '/maps/full-screen' },
    { text: 'Zoom Range', route: '/maps/zoom-range' },
    { text: 'Markers', route: '/maps/markers' },
    { text: 'Properties', route: '/maps/properties' },
    { text: 'Alone', route: '/alone' },
  ];

}
