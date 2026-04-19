import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  InputSignal
} from '@angular/core';


@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.html',
  styleUrls: ['./circle-progress.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleProgressComponent {

  public totalProgress: InputSignal<number> = input(100);
  public progressValue: InputSignal<number> = input(10);
  public progressLabel: InputSignal<string> = input('Progress');
  public radius: InputSignal<number> = input(80);
  public strokeWidth: InputSignal<number> = input(20);
  public backgroundColor: InputSignal<string> = input('#FFFFFF');
  public strokeBackgroundColor: InputSignal<string> = input('#C9E8B8');
  public strokeColor: InputSignal<string> = input('#7AC74F');
  public strokeLinecap: InputSignal<'round' | 'butt' | 'square'> = input<'round' | 'butt' | 'square'>('round');

  public svgBox = computed(() => {
    const cx = this.strokeWidth() / 2;
    const w = 2 * this.radius() + this.strokeWidth();
    return `-${cx} -${cx} ${w} ${w}`;
  });

  public dashArray = computed(() => 2 * Math.PI * this.radius());

  public dashOffset = computed(() => {
    const dash = this.dashArray();
    const value = Math.min(this.progressValue(), this.totalProgress());
    return -(dash * (value / this.totalProgress()) + dash);
  });

  public size = computed(() => 2 * this.radius() + this.strokeWidth());
}