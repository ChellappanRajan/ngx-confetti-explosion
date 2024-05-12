import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
  numberAttribute
} from '@angular/core';
import {
  BEZIER_MEDIAN,
  CRAZY_PARTICLES_FREQUENCY,
  CRAZY_PARTICLE_CRAZINESS,
  DEFAULT_COLORS,
  POSSIBLE_ROTATION_TRANSFORMS,
  Particle,
  ParticleShape,
  ROTATION_SPEED_MAX,
  ROTATION_SPEED_MIN,
  abs,
  coinFlip,
  mapRange,
  mathRound,
  max,
  random,
  rotate,
  round,
  shouldBeCircle,
} from './util';

@Component({
  selector: 'ngx-confetti-explosion',
  template: NgxConfettiExplosionComponent.render(),
  standalone:true,
  styleUrls: ['./ngx-confetti-explosion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxConfettiExplosionComponent implements OnInit,OnDestroy {
  @Input() colors: string[] = DEFAULT_COLORS;
  @Input({ transform: numberAttribute }) force = 0.5;
  @Input({ transform: numberAttribute }) duration = 3500;
  @Input({ transform: numberAttribute }) particleCount = 150;
  @Input({ transform: numberAttribute }) particleSize = 12;
  @Input({ transform: numberAttribute }) stageHeight = 800;
  @Input({ transform: numberAttribute }) stageWidth = 1600;
  @Input() particleShape: ParticleShape = 'mix';
  @Output() explosionDone = new EventEmitter();
 
  public particles!: Array<Particle>;
  #timer!: ReturnType<typeof setTimeout> | null;
  cdr = inject(ChangeDetectorRef);
  

  ngOnInit(): void {
    const { particleCount, colors } = this;
    this.particles = this.createParticles(particleCount, colors);
    this.#clearTimerIfExist();
    this.#timer = setTimeout(()=>{
      this.particles = [];
      this.cdr.markForCheck();
      this.explosionDone.emit();
    },this.duration);
  }

  #clearTimerIfExist():void{
    if(this.#timer){
      clearTimeout(this.#timer);
    }
  }
  
  ngOnDestroy(): void {
    this.#clearTimerIfExist();
    this.particles = [];
  }
  

  private createParticles(count: number, colors: string[]) :Array<Particle>{
    return Array.from({ length: count }, (_, i) =>this.createConfettiStyles((i * 360) / count, colors[i % colors.length]));
  }

  private createConfettiStyles(degree: number, color: string): Particle{
    // Crazy calculations for generating styles
    const rotationTransform = Math.round(
      random() * (POSSIBLE_ROTATION_TRANSFORMS - 1)
    );

    let {
      duration = 3500,
      force = 0.5,
      particleShape = 'mix',
      particleSize = 12,
      stageWidth = 1600,
    } = this;

    const rotation = rotationTransform.toString(2).padStart(3, '0').split('');
    const isParticleShapeNotRectangle = particleShape !== 'rectangles';
    const isParticleShapeCircles = particleShape === 'circles';

    const x1 =
      random() < CRAZY_PARTICLES_FREQUENCY
        ? round(random() * CRAZY_PARTICLE_CRAZINESS, 2)
        : 0;
    const isCircle =
      isParticleShapeNotRectangle &&
      isParticleShapeCircles || shouldBeCircle(rotationTransform);

    const styleMap = {
      '--bg-color': color,
      '--x-landing-point':
        mapRange(
          abs(rotate(degree, 90) - 180),
          0,
          180,
          -stageWidth / 2,
          stageWidth / 2
        ) + 'px',
      '--duration-chaos': duration - mathRound(random() * 1e3) + 'ms',
      '--x1': x1,
      '--x2': x1 * -1,
      '--x3': x1,
      '--x4': round(
        abs(mapRange(abs(rotate(degree, 90) - 180), 0, 180, -1, 1)),
        4
      ),
      // roughly how fast particle reaches end of its explosion curve
      '--y1': round(random() * BEZIER_MEDIAN, 4),
      // roughly maps to the distance particle goes before reaching free-fall
      '--y2': round(random() * force * (coinFlip() ? 1 : -1), 4),
      // roughly how soon the particle transitions from explosion to free-fall
      '--y3': BEZIER_MEDIAN,
      // roughly the ease of free-fall
      '--y4': round(
        max(mapRange(abs(degree - 180), 0, 180, force, -force), 0),
        4
      ),
      '--height':
        (isCircle ? particleSize : mathRound(random() * 2) + particleSize) +
        'px',
      '--width':
        (isCircle ? particleSize : mathRound(random() * 4) + particleSize / 2) +
        'px',
      '--half-rotation': rotation.map((n) => +n / 2 + ''),
      '--rotation': rotation,
      '--rotation-duration':
        round(
          random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) +
            ROTATION_SPEED_MIN
        ) + 'ms',
      '--border-radius': isCircle ? '50%' : 0,
    };
    return styleMap;
  }

  static render():string{
    return `
    <div class="confetti-explosion-container" [style.--stage-height]="stageHeight + 'px'">
      @for (particle of particles; track particle) {
      <div
        class="particle"
        [style]="particle"
      >
        <div></div>
      </div>
    }
    </div>
    `
  }
}
