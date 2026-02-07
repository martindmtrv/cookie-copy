# Cookie Copy 🍪

Cookie Copy is a Firefox extension (compatible with both Desktop and Android) designed for power users who need to quickly extract and format cookie data from specific websites.

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
4. Select the `manifest.json` file in the project directory.

## Packaging for Release

To create a ZIP package for submission to the Firefox Add-ons marketplace:

```bash
./build.sh
```

This will generate `cookie-copy-extension.zip` containing all necessary files while excluding development artifacts.

### For Android Testing
Follow the [Publishing Guide](file:///home/martin/.gemini/antigravity/brain/edd15e83-c8c6-4429-9af9-c1032b0769ad/publishing_guide.md) to learn how to test on Firefox for Android using Nightly builds and collections.

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
├── manifest.json       # Extension configuration
├── background.js       # Core logic for matching and extraction
├── options.html/js/css # Configuration management UI
├── popup.html/js/css   # Quick-copy popup UI
└── icons/              # Extension icons
```

## Publishing

For detailed instructions on how to publish this extension to the Firefox Add-ons marketplace (AMO), refer to the [Publishing Guide](file:///home/martin/.gemini/antigravity/brain/edd15e83-c8c6-4429-9af9-c1032b0769ad/publishing_guide.md).

## License

This project is open-source and available under the MIT License.
