# Cookie Copy 🍪

Cookie Copy is a Firefox extension (compatible with both Desktop and Android) designed for power users who need to quickly extract and format cookie data from specific websites.

**[Install from Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/cookie-copy/)**

With Cookie Copy, you can define custom templates for your favorite websites, allowing you to copy session tokens, user IDs, or any other cookie values to your clipboard in exactly the format you need.

## Features

- **Custom Site Matching**: Define domain patterns (exact strings or regex) to listen for.
- **Dynamic Templating**: Use simple `{{cookie_name}}` placeholders in your templates.
- **Premium Dark UI**: A modern, sleek interface that works great on mobile.
- **Android Ready**: Fully compatible with Firefox for Android.
- **Visual Feedback**: The extension icon shows a badge indicator when a matching site is detected.

## Installation (Development)

1. Clone this repository or download the source code.
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
3. Click **"Load Temporary Add-on..."**.
4. Select the `manifest.json` file in the `src/` directory.

## Packaging for Release

To create a ZIP package for submission to the Firefox Add-ons marketplace:

```bash
./build.sh
```

This will generate `cookie-copy-extension.zip` containing all necessary files while excluding development artifacts.


## How to Use

### 1. Configure Your Sites
- Open the extension settings (Options page).
- Add a new site configuration:
  - **Domain**: e.g., `github.com`
  - **Cookies**: e.g., `_gh_sess, user_session`
  - **Template**: e.g., `Session: {{_gh_sess}}\nUser: {{user_session}}`

### 2. Copy Cookies
- Navigate to the website you configured.
- Click the Cookie Copy extension icon.
- Review the rendered preview and click **"Copy to Clipboard"**.

## Project Structure

```text
├── src/                # Extension source code
│   ├── manifest.json   # Extension configuration
│   ├── background.js   # Core logic for matching and extraction
│   ├── options.html/js/css # Configuration management UI
│   ├── popup.html/js/css   # Quick-copy popup UI
│   └── icons/          # Extension icons
├── build.sh            # Packaging script
└── README.md           # This file
```

## License

This project is open-source and available under the [MIT License](LICENSE).
