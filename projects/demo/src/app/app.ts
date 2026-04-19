import { Component, signal, WritableSignal } from '@angular/core';
import { CircleProgressComponent } from 'circle-progress';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CircleProgressComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  public progress: WritableSignal<number> = signal(50);

  public onInputChange(value: string): void {
    const num: number = Number(value);
    if (!isNaN(num)) {
      this.progress.set(num);
    }
  }
}