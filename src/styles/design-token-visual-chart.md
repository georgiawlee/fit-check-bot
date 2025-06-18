## Design System Token Visual Chart

### Color Tokens

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  PRIMARY COLOR PALETTE                           │
│                                                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐   │
│  │            │ │            │ │            │   │
│  │ #FF70E0    │ │ #FF45B5    │ │ #FFDFF8    │   │
│  │            │ │            │ │            │   │
│  │ Pink       │ │ Pink Dark  │ │ Pink Light │   │
│  └────────────┘ └────────────┘ └────────────┘   │
│                                                  │
│  ┌────────────┐                                 │
│  │            │                                 │
│  │ #FFEDFB    │                                 │
│  │            │                                 │
│  │ Lightest   │                                 │
│  └────────────┘                                 │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│                                                  │
│  SECONDARY COLOR PALETTE                         │
│                                                  │
│  ┌────────────┐ ┌────────────┐                  │
│  │            │ │            │                  │
│  │ #C76CEF    │ │ #9B45CF    │                  │
│  │            │ │            │                  │
│  │ Purple     │ │ Purple     │                  │
│  │            │ │ Lighter    │                  │
│  └────────────┘ └────────────┘                  │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Token Mapping Chart

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  LEGACY TO DESIGN TOKEN MAPPING                     │
│                                                     │
│  Legacy Token         │ Design Token                │
│  ──────────────────────────────────────────────────-│
│  --win98-gray         │ --theme-pink-light         │
│  --win98-gray-darker  │ --theme-pink               │
│  --win98-gray-lighter │ --theme-pink-lightest      │
│  --win98-blue         │ --theme-purple-lighter     │
│  --win98-blue-lighter │ --theme-purple             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Usage Guidelines

#### Pink Theme Colors
- `--theme-pink`: Primary color for buttons, borders, and interactive elements
- `--theme-pink-dark`: Used for active states, pressed buttons, and shadows
- `--theme-pink-light`: Used for backgrounds, inactive elements, and panels
- `--theme-pink-lightest`: Used for subtle backgrounds, hover states, and secondary panels

#### Purple Theme Colors
- `--theme-purple`: Used for text, accents, and interactive highlights
- `--theme-purple-lighter`: Used for borders, active highlights, and interactive elements

#### Shadow Effects
Instead of using individual shadow values, use these tokens:
- `--window-shadow`: For window framing
- `--button-shadow`: For button framing
- `--inset-shadow`: For inset elements like text fields

#### Animation Speeds
- `--animation-speed-fast`: 0.1s - For immediate feedback (button clicks)
- `--animation-speed-normal`: 0.2s - For standard transitions
- `--animation-speed-slow`: 0.3s - For emphasis and attention-grabbing effects

### Shadow Tokens

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  SHADOW TOKEN HIERARCHY                             │
│                                                     │
│  BASE IMPLEMENTATION TOKENS                         │
│  ├── --window-framing-shadow                        │
│  ├── --button-framing-shadow                        │
│  ├── --inset-framing-shadow                         │
│  └── --inactive-shadow                              │
│                                                     │
│  SEMANTIC SHADOW TOKENS                             │
│  ├── --window-shadow                                │
│  ├── --button-shadow                                │
│  ├── --active-shadow                                │
│  ├── --inset-shadow                                 │
│  ├── --hover-shadow                                 │
│  ├── --focus-shadow                                 │
│  └── --inactive-window-shadow                       │
│                                                     │
│  SPECIAL EFFECT TOKENS                              │
│  ├── --dragging-shadow                              │
│  ├── --elevated-shadow                              │
│  ├── --dropdown-shadow                              │
│  └── --tooltip-shadow                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Shadow Usage Guidelines

#### Base Component Shadows
- **Windows** should use `var(--window-shadow)`
- **Buttons** should use `var(--button-shadow)`
- **Inset elements** (text inputs, progress bars) should use `var(--inset-shadow)`

#### State-Based Shadows
- **Hover state**: `var(--hover-shadow)`
- **Focus state**: `var(--focus-shadow)`
- **Active/pressed state**: `var(--active-shadow)`
- **Inactive elements**: `var(--inactive-window-shadow)`

#### Special Effects
- **Dragged windows**: `var(--dragging-shadow)`
- **Elevated elements**: `var(--elevated-shadow)`
- **Dropdown menus**: `var(--dropdown-shadow)`
- **Tooltips**: `var(--tooltip-shadow)`

Do not use hardcoded shadow values in component styles - always reference the appropriate shadow token.
