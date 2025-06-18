# Visual Effects & Animation Guide

## Overview

This guide documents the standardized visual effects and animations available in the Windows 98-themed "fit-check-bot" React application. These effects create a cohesive user experience across the application while maintaining the nostalgic Windows 98 aesthetic.

## Shadow Effects

### Standard Shadows

Our design system includes several shadow types for different UI elements:

#### Window Shadow
```css
--window-shadow: var(--window-framing-shadow);
```
Used for window frames to create the classic Windows 98 raised effect.

#### Button Shadow
```css
--button-shadow: var(--button-framing-shadow);
```
Used for buttons in their default state, creating a raised effect.

#### Inset Shadow
```css
--inset-shadow: var(--inset-framing-shadow);
```
Used for recessed elements like pressed buttons, text inputs, and progress bars.

### State-Based Shadows

#### Active Shadow
```css
--active-shadow: var(--inset-framing-shadow);
```
Used for buttons and controls in their pressed/active state.

#### Dragging Shadow
```css
--dragging-shadow: var(--window-framing-shadow), 4px 4px 12px var(--theme-pink-dark);
```
Applied to windows while being dragged, adding an additional soft shadow for depth.

#### Elevated Shadow
```css
--elevated-shadow: var(--window-framing-shadow), 3px 3px 10px rgba(255, 112, 224, 0.4);
```
Used for elements that need to appear elevated above others, like tooltips or popovers.

## Animations

### Animation Speed Tokens

All animations use these standardized duration tokens:
```css
--animation-speed-fast: 0.1s;   /* Quick transitions like hover effects */
--animation-speed-normal: 0.2s; /* Standard transitions like button press */
--animation-speed-slow: 0.3s;   /* Slower animations like focus indicators */
```

### Standard Animations

#### Focus Dotted
```css
@keyframes focusDotted {
  0%, 100% {
    outline-color: var(--theme-purple);
  }
  50% {
    outline-color: transparent;
  }
}
```
Used for keyboard focus indicators, creating a blinking dotted outline.

**Usage:**
```css
.element:focus {
  outline: 1px dotted var(--theme-purple);
  animation: focusDotted var(--animation-speed-slow) step-start infinite;
}
```

#### Progress Animation
```css
@keyframes progressAnimation {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 40px 0;
  }
}
```
Used for animated progress bars to create moving stripes.

**Usage:**
```css
.win98-progress-bar {
  background: repeating-linear-gradient(...);
  animation: progressAnimation var(--animation-speed-normal) linear infinite;
}
```

#### Window Shake
```css
@keyframes windowShake {
  0%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-1px);
  }
  75% {
    transform: translateY(1px);
  }
}
```
Subtle shake animation applied when dragging windows.

**Usage:**
```css
.win98-window.dragging {
  animation: windowShake var(--animation-speed-fast) ease-in-out;
}
```

## Transitions

### Button Transitions
```css
.win98-button {
  transition: all var(--animation-speed-fast) ease;
}
```
Smooth transition for button hover and active states.

### Window Transitions
```css
.win98-window {
  transition: all var(--animation-speed-normal) ease;
}
```
Smooth transition for window state changes, such as becoming inactive.

### Dragging State
```css
.dragging {
  transition: none !important;
}
```
Transitions are disabled while dragging for responsive user interaction.

## Visual State Indicators

### Hover States
Hover states typically involve:
- Slight color change (lightening the background)
- Subtle translation (moving up 1px)
- Additional shadow for depth

### Focus States
Focus states use the dotted outline animation for keyboard accessibility:
```css
outline: 1px dotted var(--theme-purple-lighter);
outline-offset: -4px;
animation: focusDotted var(--animation-speed-slow) step-start infinite;
```

### Active/Pressed States
Active states for clickable elements use:
- Inset border style
- Inset shadow effect
- Darker background color
- Slight padding adjustment to create visual "press" effect

### Disabled States
Disabled elements use:
- Reduced opacity (usually 0.7)
- Desaturated colors
- Removal of shadows and hover effects
- Cursor set to default or not-allowed

## Implementation Guidelines

1. **Consistency**: Use the same animation for the same type of interaction across components
2. **Performance**: Keep animations simple and performant, avoid multiple simultaneous animations
3. **Accessibility**: Ensure animations can be disabled for users who prefer reduced motion
4. **Purpose**: Only use animations when they serve a purpose (feedback, guidance, etc.)
5. **Timing**: Use the standardized animation speed tokens for consistent timing

## Reduced Motion Support

For users with vestibular disorders or motion sensitivity, we provide a reduced motion option:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```
