#!/usr/bin/env bash
# Regenerate the social share images in static/images/og/ (one per page).
# Edit the list below when a headline changes, then run from the site root:
#   python3 -m http.server 8090 &   (any local server on the site root)
#   bash og/render.sh http://localhost:8090
set -euo pipefail

BASE="${1:-http://localhost:8090}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="static/images/og"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

# slug | eyebrow | headline (*word* = copper italic) | photo
PAGES=(
  "home|Sell-Side M&A|Selling your business is *our* business.|src/lib/assets/treated/hero.jpg"
  "about|About Madfarm|A practice built to sell mission-critical businesses.|src/lib/assets/treated/software.jpg"
  "process|The Process|Structurally rigorous. Strategically flexible.|src/lib/assets/treated/industrials.jpg"
  "case-studies|Case Studies|Closed deals, in detail.|src/lib/assets/treated/professional.jpg"
  "case-industrial|Case Study|Defending value in bio-pharma engineering.|src/lib/assets/treated/professional.jpg"
  "case-hvac|Case Study|Orchestrating a sophisticated founder transition.|src/lib/assets/treated/industrials.jpg"
  "case-carveout|Case Study|Carving out a non-core division.|src/lib/assets/treated/renewables.jpg"
  "case-saas|Case Study|Turning a retention discount into a premium outcome.|src/lib/assets/treated/software.jpg"
  "resources|Resources|Straight answers for owners considering a sale.|src/lib/assets/treated/craft.jpg"
  "contact|Contact|Talk to a senior banker.|src/lib/assets/treated/professional.jpg"
  "privacy-policy|Legal|Privacy Policy|"
)

enc() { python3 -c 'import sys,urllib.parse; print(urllib.parse.quote(sys.argv[1]))' "$1"; }

for row in "${PAGES[@]}"; do
  IFS='|' read -r slug eyebrow headline photo <<< "$row"
  url="$BASE/og/template.html?eyebrow=$(enc "$eyebrow")&headline=$(enc "$headline")&photo=$(enc "$photo")"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1200,630 --virtual-time-budget=4000 --screenshot="$TMP/$slug.png" "$url" >/dev/null 2>&1
  sips -s format jpeg -s formatOptions 82 "$TMP/$slug.png" --out "$OUT/$slug.jpg" >/dev/null
  echo "$OUT/$slug.jpg  $(du -k "$OUT/$slug.jpg" | cut -f1) KB"
done
