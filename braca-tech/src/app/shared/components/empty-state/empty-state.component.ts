import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [IonIcon],
  template: `
    <div class="wrapper">
      <ion-icon [name]="icon || 'leaf-outline'" size="large"></ion-icon>
      <h3>{{ title || 'Nada por aqui ainda' }}</h3>
      <p>{{ subtitle || 'Crie seu primeiro item para começar.' }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
  .wrapper{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:24px;
    opacity:.8;
    text-align:center
  }`]
})
export class EmptyStateComponent {
  @Input() title?: string
  @Input() subtitle?: string
  @Input() icon?: string
}
