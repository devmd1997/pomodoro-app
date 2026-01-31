# Pomodoro Timer App

## How the Pomodoro Timer Works

The Pomodoro Technique is a time management method that uses a timer to break work into intervals, separated by short breaks.

1.  **Work Session**: The timer counts down a set period (typically 25 minutes) during which you focus exclusively on work.
2.  **Short Break**: Once the work timer ends, a short break timer begins (typically 5 minutes).
3.  **Long Break**: After completing four work sessions, a longer break interval occurs (typically 15-30 minutes).

This cycle helps maintain focus and prevents mental fatigue.

## App Features

### Timer Functionality
This application focuses purely on the timer function. To keep the experience streamlined and distraction-free, users cannot choose or manage specific tasks within the app. It is designed to run alongside your work, whatever that may be.

### Customization
You can personalize the experience to suit your taste. In the **Settings** menu, users are able to change the style of the timer, including font choices and color themes.

## Technical Implementations

### Core Timer System

#### Automatic Timer Progression
The app implements an intelligent timer progression system that automatically switches between Pomodoro, Short Break, and Long Break sessions:

- **Pomodoro → Short Break**: After completing a Pomodoro session, the timer automatically switches to a Short Break (if less than 3 Pomodoros have been completed)
- **Pomodoro → Long Break**: After completing 4 Pomodoro sessions, the timer automatically switches to a Long Break
- **Short Break → Pomodoro**: After a Short Break completes, it automatically returns to Pomodoro and increments the short break counter
- **Long Break → Pomodoro**: After a Long Break completes, it resets the counter and returns to Pomodoro

This is implemented using a `useRef` hook to track the number of short breaks completed, ensuring the proper sequence is maintained throughout the work session.

#### Timer States
The timer component manages four distinct states:
- **Reset**: Initial state when timer is set but not started
- **Running**: Timer is actively counting down
- **Paused**: Timer is temporarily stopped
- **Finished**: Timer has reached zero

The timer uses `setInterval` to update every second and automatically transitions to the next timer type when finished.

#### Keyboard Shortcuts
Users can control the timer using the spacebar:
- Press spacebar to start, pause, resume, or restart the timer
- This provides quick access without needing to click the timer interface

### Settings Management

#### Reducer-Based State Management
The settings panel uses React's `useReducer` hook with a typed action system for managing theme and timer configurations:

- **Typed Actions**: All settings actions are strongly typed using TypeScript discriminated unions, ensuring type safety when updating settings
- **Action Types**: 
  - `UPDATE_TIME`: Updates all three timer durations (Pomodoro, Short Break, Long Break)
  - `UPDATE_FONT`: Changes the font family (Kumbh Sans, Roboto Slab, or Space Mono)
  - `UPDATE_COLOR`: Changes the accent color (Red, Cyan, or Purple)

#### Real-Time Settings Preview
Settings changes are tracked in real-time using `useEffect` hooks that dispatch actions to the reducer whenever form inputs change. This allows users to see their changes before applying them.

#### Settings Persistence
When users click "Apply", the settings are saved to the global theme context, which persists throughout the app session. The settings modal closes automatically after applying changes.

### Theme System

#### Context-Based Theme Management
The app uses React Context API to manage global theme state:

- **ThemeProvider**: Wraps the entire application and provides theme data to all components
- **ThemeData Interface**: Includes timer durations, font selection, and color selection
- **Default Values**: Initial theme data includes 25-minute Pomodoro, 5-minute Short Break, 15-minute Long Break, with Kumbh Sans font and Red color

#### Dynamic Styling with Tailwind Variants
The app uses `tailwind-variants` (tv) library to create dynamic, type-safe style variants:

- **Text Styles**: Three font families with multiple text presets, each with specific typography settings (font size, line height, letter spacing)
- **Tab Bar Styles**: Dynamic styling based on active state and selected color theme
- **Settings Button**: Styling adapts to both font and color selections

### Component Architecture

#### Timer Component
- **Circular Progress Indicator**: SVG-based circular progress ring that visually represents time remaining
- **Time Display**: Formatted MM:SS display that updates every second
- **State Management**: Uses refs to manage interval cleanup and prevent memory leaks
- **Auto-Reset**: Automatically resets when timer duration changes (e.g., when switching timer types)

#### Tab Bar Component
- **Controlled Component**: Receives current timer type as a prop and syncs active tab accordingly
- **Visual Feedback**: Active tab is highlighted with the selected color theme
- **Accessibility**: Includes proper ARIA attributes for screen readers

#### Settings Components
- **TimeForm**: Manages three number inputs for timer durations (1-60 minutes range)
- **FontForm**: Three button inputs displaying "Aa" preview with selected font applied
- **ColorForm**: Three color swatch buttons with checkmark indicators for selected color
- **Form Validation**: Input constraints ensure values stay within valid ranges

### UI/UX Features

#### Responsive Design
- Mobile-first approach with breakpoints for tablet and desktop
- Settings modal adapts width based on screen size
- Typography scales appropriately across device sizes

#### Visual Feedback
- Progress ring animates smoothly when timer is running
- Selected font and color options are visually highlighted
- Tab bar shows active timer type with color-coded background
- Checkmark icon appears on selected color option

#### Accessibility
- Semantic HTML structure with proper ARIA labels
- Keyboard navigation support
- Screen reader friendly with descriptive labels and roles
- Focus management for interactive elements

### State Management Patterns

#### Local State with Lifting
- Timer state managed locally in Podomoro component
- Settings state managed with reducer pattern
- Theme state managed globally via Context

#### Effect Hooks
- `useEffect` for syncing timer display when duration changes
- `useEffect` for dispatching settings changes in real-time
- `useEffect` for keyboard event listeners
- Proper cleanup functions to prevent memory leaks

### Type Safety

The entire application is built with TypeScript, providing:
- Type-safe props and state
- Discriminated unions for reducer actions
- Exported types for shared components (TimerType, FontType, ColorType)
- Interface definitions for all component props
