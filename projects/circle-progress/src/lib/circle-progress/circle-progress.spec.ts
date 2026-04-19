import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { CircleProgressComponent } from './circle-progress';

describe('CircleProgressComponent', () => {
  let component: CircleProgressComponent;
  let fixture: ComponentFixture<CircleProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleProgressComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CircleProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute dashArray correctly', () => {
    fixture.componentRef.setInput('radius', 50);
    fixture.detectChanges();

    expect(component.dashArray()).toBeCloseTo(2 * Math.PI * 50);
  });

  it('should clamp progress value to totalProgress', () => {
    (component as any).totalProgress = 100;
    (component as any).progressValue = 150;
    fixture.detectChanges();

    const offset = component.dashOffset();
    expect(offset).toBeLessThan(0);
  });

  it('should update svgBox when radius changes', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('viewBox')).toBe(component.svgBox());
  });

  it('should render label and value', () => {
    fixture.componentRef.setInput('progressLabel', 'Test');
    fixture.componentRef.setInput('progressValue', 42);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test');
    expect(compiled.textContent).toContain('42');
  });
});