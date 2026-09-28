# Print sources

HTML sources for the downloadable PDFs in `downloads/`. Edit the HTML, then re-render:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 --print-to-pdf="$PWD/downloads/Madfarm-The-Process.pdf" "file://$PWD/print/process.html"
```

Fonts load from Google Fonts, so render with an internet connection.
