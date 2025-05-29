# TShirtify - T-Shirt Customizer

A React-based T-shirt customization application that allows users to create custom designs with colors, logos, and full textures.

## Features

- **Interactive T-shirt customization**
- **Color picker** for shirt customization
- **Logo/decal upload** and positioning
- **Full texture overlay** support
- **3D preview** with canvas rendering
- **Design sharing** via URL parameters
- **Import designs from URLs**

## URL Parameter Support

### Load Designs from URL

You can now load T-shirt designs directly from URL parameters. This feature allows you to:

- Share custom designs with others
- Import designs from external URLs
- Set up pre-configured designs for marketing campaigns

### Supported URL Parameters

| Parameter     | Description                              | Example                                   |
| ------------- | ---------------------------------------- | ----------------------------------------- |
| `design`      | URL or data URL for full texture design  | `?design=https://example.com/pattern.png` |
| `logo`        | URL or data URL for logo/decal           | `?logo=https://example.com/logo.png`      |
| `color`       | Hex color code (with or without #)       | `?color=ff5733` or `?color=#ff5733`       |
| `fullTexture` | Enable/disable full texture (true/false) | `?fullTexture=true`                       |
| `logoTexture` | Enable/disable logo texture (true/false) | `?logoTexture=true`                       |

### Usage Examples

#### Basic Color Change

```
https://yourapp.com/?color=ff5733
```

#### Load Custom Full Design

```
https://yourapp.com/?design=https://example.com/pattern.png&fullTexture=true
```

#### Load Logo with Custom Color

```
https://yourapp.com/?logo=https://example.com/logo.png&logoTexture=true&color=000000
```

#### Complete Custom Design

```
https://yourapp.com/?design=https://example.com/pattern.png&logo=https://example.com/logo.png&color=ff5733&fullTexture=true&logoTexture=true
```

### Share Feature

Use the **🔗 Share** button in the customizer to:

1. Generate a shareable URL with your current design
2. Automatically copy the URL to your clipboard
3. Share your design with others

### CORS Considerations

When loading images from external URLs, ensure:

- The image server supports CORS (Cross-Origin Resource Sharing)
- Images are publicly accessible
- Use HTTPS URLs when possible

### Data URL Support

The application also supports data URLs for both `design` and `logo` parameters:

```
?design=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==
```

## Installation

```bash
npm install
npm run dev
```

## Development

The app uses:

- **React** with Vite
- **Valtio** for state management
- **Three.js** for 3D rendering
- **Framer Motion** for animations

## API Reference

### Helper Functions

#### `applyURLParamsToState(state)`

Loads and applies URL parameters to the application state.

#### `generateShareableURL(state)`

Generates a shareable URL from the current state.

#### `copyShareableURL(state)`

Copies the shareable URL to the clipboard.

#### `loadImageFromURL(url)`

Loads an image from a URL and converts it to a data URL.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License
