import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  numberAttribute,
} from '@angular/core';
import {
  random,
  max,
  POSSIBLE_ROTATION_TRANSFORMS,
  CRAZY_PARTICLES_FREQUENCY,
  round,
  CRAZY_PARTICLE_CRAZINESS,
  shouldBeCircle,
  mathRound,
  mapRange,
  abs,
  rotate,
  BEZIER_MEDIAN,
  coinFlip,
  ROTATION_SPEED_MAX,
  ROTATION_SPEED_MIN,
  DEFAULT_COLORS,
  Particle,
  ParticleShape,
} from './util';

@Component({
  selector: 'ngx-confetti-explosion',
  templateUrl: './ngx-confetti-explosion.component.html',
  styleUrls: ['./ngx-confetti-explosion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxConfettiExplosionComponent implements OnInit {
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
  constructor(){
    inject(DestroyRef).onDestroy(() => {
      this.particles = [];
    })
  }

  ngOnInit(): void {
    const { particleCount, colors } = this;
    this.particles = this.createParticles(particleCount, colors);
    Promise.resolve(setTimeout(()=>{
      this.particles = [];
      this.explosionDone.emit();
    },this.duration));
  }

  private createParticles(count: number, colors: string[]) :Array<Particle>{
    return Array.from({ length: count }, (_, i) =>
      this.createConfettiStyles((i * 360) / count, colors[i % colors.length])
    );
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
      '--bgcolor': color,
      rotationTransform: mathRound(
        random() * (POSSIBLE_ROTATION_TRANSFORMS - 1)
      ),
      isCircle:isCircle,
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
}
