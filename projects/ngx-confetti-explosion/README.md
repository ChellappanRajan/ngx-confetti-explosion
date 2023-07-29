# ngx-confetti-explosion

Let's celebrate with confetti! ngx-confetti-explosion is an Angular package that lets you create an amazing confetti explosion on your web page.

> This library is based on the amazing [svelte-confetti-explosion](https://www.npmjs.com/package/svelte-confetti-explosion) and [react-confetti-explosion](https://github.com/herrethan/react-confetti-explosion) package. We have taken the core logic from that package and implemented it in Angular separately, making various optimizations along the way.

## Features

- 🎇 Simple - Easy to use with minimal configuration required.
- 🎆 Elegant - Utilizes an Angular component for seamless integration.
- 🌈 Highly Customizable - Provides numerous options for different confetti behaviors.

## Installation

```bash
# npm
npm install ngx-confetti-explosion

# yarn
yarn add ngx-confetti-explosion
```

## Usage

Basic usage:

```html
<ngx-confetti-explosion></ngx-confetti-explosion>
```

Customizing behavior with options:

```html
<ngx-confetti-explosion [particleCount]="200" [force]="0.3"></ngx-confetti-explosion>
```

## Inputs (Props)

| Prop Name           | Description                                                                                    | Type                   | Default Value             | Example                                               |
|---------------------|------------------------------------------------------------------------------------------------|------------------------|---------------------------|-------------------------------------------------------|
| particleCount       | Number of confetti particles to create.                                                       | number                 | 150                       | `<ngx-confetti-explosion [particleCount]="200"></ngx-confetti-explosion>`     |
| particleSize        | Size of the confetti particles in pixels.                                                      | number                 | 12                        | `<ngx-confetti-explosion [particleSize]="20"></ngx-confetti-explosion>`      |
| duration            | Duration of the confetti animation in milliseconds.                                           | number                 | 3500                      | `<ngx-confetti-explosion [duration]="5000"></ngx-confetti-explosion>`        |
| colors              | Colors to use for the confetti particles. Provide an array of strings representing colors.   | string[]               | `['#FFC700', '#FF0000', '#2E3191', '#41BBC7']` | `<ngx-confetti-explosion [colors]="['var(--yellow)', 'var(--red)', '#2E3191', '#41BBC7']"></ngx-confetti-explosion>`       |
| particlesShape      | Shape of particles to use. Can be `'mix'`, `'circles'`, or `'rectangles'`.                    | `'mix' | 'circles' | 'rectangles'` | 'mix'                     | `<ngx-confetti-explosion [particlesShape]="'circles'"></ngx-confetti-explosion>` |
| force               | Force of the confetti particles. Should be a value between 0 and 1.                            | number                 | 0.5                       | `<ngx-confetti-explosion [force]="0.3"></ngx-confetti-explosion>`            |
| stageHeight         | Height of the confetti animation stage in pixels. Confetti will only fall within this height.  | number                 | 800                       | `<ngx-confetti-explosion [stageHeight]="500"></ngx-confetti-explosion>`      |
| stageWidth          | Width of the confetti animation stage in pixels. Confetti will only fall within this width.    | number                 | 1600                      | `<ngx-confetti-explosion [stageWidth]="500"></ngx-confetti-explosion>`       |
| shouldDestroyAfterDone | Determines whether to destroy all confetti nodes after the `duration` period has passed.       | boolean                | true                      | `<ngx-confetti-explosion [shouldDestroyAfterDone]="false"></ngx-confetti-explosion>` |
| style `(--x, --y)`  | Style props to shift the confetti particles on the x and y axes by the specified amount.      | CSS units (e.g., px, em, rem) | --x: 10px; --y: 10px;       | `<ngx-confetti-explosion style="--x: 10px; --y: 10px;"></ngx-confetti-explosion>` |


### Events

| Event Name         | Description                                                                      | Payload                  | Example |
|--------------------|----------------------------------------------------------------------------------|--------------------------|---------|
| explosionDone      | Emitted when the confetti animation is completed and all confetti nodes are destroyed. | `void`                   | `(explosionDone)="onExplosionDone($event)"` |

## Examples

[Basic Example](https://stackblitz.com/edit/stackblitz-starters-tnb3sv?file=src%2Fmain.ts)

## License

ngx-confetti-explosion is distributed under the MIT License.

© [Chellappan](https://twitter.com/che_off)