export type ParticleShape = 'mix' | 'circles' | 'rectangles';
type CssAbsoluteUnit = "cm" | "mm" | "in" | "px" | "pt" | "pc";
type CssRelativeUnit = "em" | "ex" | "ch" | "rem" | "vw" | "vh" | "vmin" | "vmax" | "%";
export type CssUnit = CssAbsoluteUnit | CssRelativeUnit;
export const DEFAULT_COLORS = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'];
export type Particle = {
  '--bg-color': string;
  '--x-landing-point': string;
  '--duration-chaos': string;
  '--x1': number;
  '--x2': number;
  '--x3': number;
  '--x4': number;
  '--y1': number;
  '--y2': number;
  '--y3': number;
  '--y4': number;
  '--height': string;
  '--width': string;
  '--half-rotation': string[];
  '--rotation': string[];
  '--rotation-duration': string;
  '--border-radius': string | number;
};




// We can use the first three bits to flag which axis to rotate on.
// x = binary 100 = decimal 4
// y = binary 010 = decimal 2
// z = binary 001 = decimal 1
// We can use dual axis rotations (a bit more realistic) by combining the above bits.
// x & y = binary 110 = decimal 6
// x & z = binary 101 = decimal 5
// y & z = binary 011 = decimal 3
export const POSSIBLE_ROTATION_TRANSFORMS = 6;

export const coinFlip = () => random() > 0.5;

export const ROTATION_SPEED_MIN = 200; // minimum possible duration of single particle full rotation
export const ROTATION_SPEED_MAX = 800; // maximum possible duration of single particle full rotation
export const CRAZY_PARTICLES_FREQUENCY = 0.1; // 0-1 frequency of crazy curvy unpredictable particles
export const CRAZY_PARTICLE_CRAZINESS = 0.3; // 0-1 how crazy these crazy particles are
export const BEZIER_MEDIAN = 0.5; // utility for mid-point bezier curves, to ensure smooth motion paths

export const abs = Math.abs,
  random = Math.random,
  mathRound = Math.round,
  max = Math.max;

// avoid rotation on z axis (001 = 1) for circles as it has no visual effect.
export const shouldBeCircle = (rotationTransform: number) =>
  rotationTransform !== 1 && coinFlip();

  export const round = (num: number, precision: number = 2) =>
  mathRound((num + Number.EPSILON) * 10 ** precision) / 10 ** precision;


  /**
   * The purpose of the function is to transform a value from the original range (x1 to y1) to the corresponding value in the new range (x2 to y2).
   * Example:
        const value = 50;
        const x1 = 0;
        const y1 = 100;
        const x2 = 0;
        const y2 = 1;
        const mappedValue = mapRange(value, x1, y1, x2, y2);
        console.log(mappedValue); // Output: 0.5
   * @param value 
   * @param x1 
   * @param y1 
   * @param x2 
   * @param y2 
   * @returns 
   */
  export const mapRange = (
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export const rotate = (degree: number, amount: number) =>
  degree + amount > 360 ? degree + amount - 360 : degree + amount;
