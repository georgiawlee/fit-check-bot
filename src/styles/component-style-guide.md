# Fit-Check-Bot Component Style Guide

## Introduction

This style guide documents the standardized component styling system for the Windows 98-themed "fit-check-bot" React application. It provides comprehensive guidance on using our design system tokens and standardized components to maintain visual consistency throughout the application.

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Windows](#windows)
3. [Buttons](#buttons)
4. [Form Elements](#form-elements)
5. [Progress Bars](#progress-bars)
6. [Layout Components](#layout-components)

---

## Design Tokens

Design tokens are the foundation of our styling system. They provide consistent values for colors, typography, spacing, and other visual elements.

### Color Tokens

```css
--white: #FFFFFF;
--theme-pink: #FF70E0;
--theme-pink-dark: #FF45B5;
--theme-pink-light: #FFDFF8;
--theme-pink-lightest: #FFEDFB;
--theme-purple: #C76CEF;
--theme-purple-lighter: #9B45CF;
```

### Shadow Tokens

```css
--window-shadow: var(--window-framing-shadow);
--button-shadow: var(--button-framing-shadow);
--inset-shadow: var(--inset-framing-shadow);
--active-shadow: var(--inset-framing-shadow);
--dragging-shadow: var(--window-framing-shadow), 4px 4px 12px var(--theme-pink-dark);
--elevated-shadow: var(--window-framing-shadow), 3px 3px 10px rgba(255, 112, 224, 0.4);
```

### Animation Tokens

```css
--animation-speed-fast: 0.1s;
--animation-speed-normal: 0.2s;
--animation-speed-slow: 0.3s;
```

### Typography Tokens

```css
--regular-font-family: 'MS Sans Serif', Arial, sans-serif;
--regular-font-size: 11px;
--regular-line-height: 12px;
--bold-font-family: 'MS Sans Serif Bold', 'MS Sans Serif', Arial, sans-serif;
--bold-font-size: 11px;
```

---

## Windows

Windows are the primary containers for content in the application. They follow the classic Windows 98 appearance with a title bar, controls, and content area.

### Base Window

```html
<div class="win98-window">
  <div class="win98-titlebar">
    <div class="win98-window-title">
      <img src="icon.svg" alt="" class="win98-title-icon">
      <span class="win98-title-text">Window Title</span>
    </div>
    <div class="win98-window-controls">
      <button class="win98-window-button">
        <img src="minimize.svg" alt="Minimize" class="button-icon">
      </button>
      <button class="win98-window-button">
        <img src="maximize.svg" alt="Maximize" class="button-icon">
      </button>
      <button class="win98-window-button">
        <img src="close.svg" alt="Close" class="button-icon">
      </button>
    </div>
  </div>
  <div class="win98-window-content">
    <!-- Window content goes here -->
  </div>
</div>
```

### Window States

- **Default**: Regular window appearance
- **Inactive**: `.win98-window.inactive` - Window is not in focus
- **Dragging**: `.win98-window.dragging` - Window is being moved

### Specific Window Types

- **Preview Window**: `.heybestie-preview-window`
- **Controls Window**: `.heybestie-controls-window`
- **Message Window**: `.heybestie-message-window`

---

## Buttons

Buttons follow a clear hierarchy with consistent states and styling.

### Button Hierarchy

1. **Primary Button**
```html
<button class="win98-button win98-button-primary">Primary Action</button>
```

2. **Secondary Button**
```html
<button class="win98-button win98-button-secondary">Secondary Action</button>
```

3. **Tertiary Button**
```html
<button class="win98-button win98-button-tertiary">Text Link</button>
```

### Button States

- **Hover**: Mouse over the button
- **Focus**: Keyboard focus on the button
- **Active**: Button being pressed
- **Disabled**: `<button class="win98-button" disabled>Disabled</button>`

### Button with Icon

```html
<button class="win98-button win98-button-icon">
  <img src="icon.svg" alt="">
  Button with Icon
</button>
```

### Button Groups

```html
<div class="win98-button-group">
  <button class="win98-button">Button 1</button>
  <button class="win98-button">Button 2</button>
</div>
```

---

## Form Elements

Form elements maintain the Windows 98 aesthetic while ensuring accessibility and usability.

### Text Input

```html
<div class="win98-form-group">
  <label class="win98-form-label">Input Label</label>
  <input type="text" class="win98-input">
</div>
```

### Checkbox

```html
<label class="win98-checkbox">
  <input type="checkbox">
  <span class="win98-checkbox-mark"></span>
  Checkbox Label
</label>
```

### Select/Dropdown

```html
<div class="win98-form-group">
  <label class="win98-form-label">Select Option</label>
  <div class="win98-select">
    <select>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </div>
</div>
```

### File Input

```html
<div class="win98-file-input">
  <input type="file" id="file" class="win98-file">
  <label for="file" class="win98-file-label">
    <img src="folder.svg" alt="" class="win98-file-icon">
    Choose File
  </label>
</div>
```

### Form Layout

```html
<form>
  <div class="win98-form-row">
    <div class="win98-form-group">
      <label class="win98-form-label">First Name</label>
      <input type="text" class="win98-input">
    </div>
    <div class="win98-form-group">
      <label class="win98-form-label">Last Name</label>
      <input type="text" class="win98-input">
    </div>
  </div>
  <div class="win98-form-actions">
    <button type="submit" class="win98-button win98-button-primary">Submit</button>
    <button type="button" class="win98-button win98-button-secondary">Cancel</button>
  </div>
</form>
```

---

## Progress Bars

Progress bars follow a consistent design with support for different states and variations.

### Standard Progress Bar

```html
<div class="win98-progress-wrapper">
  <div class="win98-progress-container">
    <div class="win98-progress-bar"></div>
  </div>
</div>
```

### Progress Bar with Text

```html
<div class="win98-progress-wrapper">
  <div class="win98-progress-label">Loading...</div>
  <div class="win98-progress-container">
    <div class="win98-progress-bar"></div>
    <div class="win98-progress-text">50%</div>
  </div>
</div>
```

### Progress Bar Variations

- **Compact**: `<div class="win98-progress-container compact">...</div>`
- **Inset**: `<div class="win98-progress-container inset">...</div>`
- **Determinate**: `<div class="win98-progress-container win98-progress-determinate">...</div>`
- **Status**: `<div class="win98-status-progress"><div class="win98-status-progress-bar"></div></div>`

### Progress Bar States

- **Default**: Indeterminate animated progress
- **Success**: `<div class="win98-progress-container win98-progress-success">...</div>`
- **Error**: `<div class="win98-progress-container win98-progress-error">...</div>`

---

## Layout Components

Layout components help structure content within the application.

### Status Bar

```html
<div class="win98-status-bar">
  <div class="win98-status-left">
    <div class="win98-status-item">
      <img src="icon.svg" alt="">
      Status Text
    </div>
  </div>
  <div class="win98-status-right">
    <div class="win98-status-inset">
      100%
    </div>
  </div>
</div>
```

### Message Box

```html
<div class="win98-message-box">
  <div class="win98-message-box-header">
    <img src="info.svg" alt="">
    Message Title
  </div>
  <div class="win98-message-content">
    Message content goes here.
  </div>
</div>
```

---

## Best Practices

1. **Use Design Tokens**: Always use design tokens instead of hardcoded values
2. **Follow Component Hierarchy**: Use the appropriate component for the intended purpose
3. **Maintain Accessibility**: Ensure proper focus states and keyboard navigation
4. **Responsive Design**: Use relative units and test on different screen sizes
5. **Documentation**: Document any custom components or variations

---

## Legacy Class Mappings

For backward compatibility, the following legacy classes are mapped to their standardized equivalents:

| Legacy Class | Standardized Class |
|--------------|-------------------|
| .custom-file-label | .win98-file-label |
| .win98-button-classic | .win98-button |
| .win98-progress | .win98-progress-container |

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
