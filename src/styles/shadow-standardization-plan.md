## Shadow Standardization Plan - May 23, 2025

### Current Issues

1. **Inconsistent Shadow Implementation**
   - Some components use the standardized shadow tokens (`var(--window-framing-shadow)`, etc.)
   - Others use hardcoded RGBA or hex values
   - Some use hybrid approaches (shadow tokens + hardcoded values)

2. **Duplicate Shadow Definitions**
   - Different files define the same visual effects with different implementations
   - `win98-windows-complete.css` and `win98-visual-effects-complete.css` both define window shadows

3. **Naming Inconsistencies**
   - Mix of semantic naming (`--window-framing-shadow`) and implementation naming (`--inset-framing-shadow`)

### Shadow Standardization Steps

#### 1. Centralize Shadow Tokens in design-system-complete.css

```css
/* Shadow Effects */
--window-shadow: var(--window-framing-shadow);            /* For window framing */
--button-shadow: var(--button-framing-shadow);            /* For button framing */
--inset-shadow: var(--inset-framing-shadow);              /* For inset elements */
--inactive-window-shadow: var(--inactive-shadow);         /* For inactive windows */
--hover-shadow: 0 0 0 1px var(--theme-purple);            /* For hover states */
--focus-shadow: 0 0 0 1px var(--theme-purple-lighter);    /* For focus states */
--active-shadow: var(--inset-framing-shadow);             /* For active/pressed states */
--dropdown-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);        /* For dropdowns/popups */
--tooltip-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);         /* For tooltips */

/* Effect combinations */
--dragging-shadow: var(--window-framing-shadow), 4px 4px 12px var(--theme-pink-dark); /* For dragged windows */
--elevated-shadow: var(--window-framing-shadow), 3px 3px 10px rgba(255, 112, 224, 0.4); /* For elevated elements */
```

#### 2. Update win98-visual-effects-complete.css

1. Remove duplicate shadow definitions that are already defined in design-system-complete.css
2. Use shadow tokens instead of hardcoded values
3. Update element selectors to reference the standardized tokens

#### 3. Update win98-windows-complete.css

1. Remove any hardcoded shadow values
2. Reference the standardized shadow tokens from design-system-complete.css
3. Ensure consistent shadow usage across different window states (normal, inactive, dragging)

#### 4. Update Component-Specific CSS Files

1. Update button shadows in win98-buttons-complete.css
2. Update form element shadows in win98-interface-complete.css
3. Update progress bar shadows in win98-progress.css

#### 5. Documentation Updates

1. Add comments to explain shadow token usage patterns
2. Document shadow tokens in the design-token-visual-chart.md file
3. Update README with shadow usage guidelines

### Implementation Notes

- Use `var(--window-shadow)` instead of `var(--window-framing-shadow)` for semantic clarity
- Replace hardcoded values like `inset 2px 2px var(--inset-frame-inner-1)` with `var(--inset-shadow)`
- Combine tokens using CSS variables where complex shadows are needed
- For unique shadow effects, create new tokens in the design system

### Completion Criteria

- All shadow implementations use design system tokens
- No hardcoded shadow values remain in component CSS files
- Shadow behavior is consistent across all components
- Shadow tokens are well-documented for future development
