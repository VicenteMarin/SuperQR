import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/logos/logo.PNG"
          class="align-middle m-2"
          width="179"
          height="45"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
