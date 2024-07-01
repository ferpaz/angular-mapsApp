import { Component } from '@angular/core';

interface MenuItem {
  text: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { text: 'Full Screen', route: 'full-screen' },
    { text: 'Zoom Range', route: 'zoom-range' },
    { text: 'Markers', route: 'markers' },
    { text: 'Properties', route: 'properties' },
  ];

}
