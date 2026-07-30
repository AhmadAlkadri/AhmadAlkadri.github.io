#!/bin/sh

set -eu

script_dir=$(CDPATH= cd -- "$(/usr/bin/dirname -- "$0")" && pwd)
repo_dir=$(CDPATH= cd -- "$script_dir/.." && pwd)
source_dir="$repo_dir/images/banner"
output_dir="$source_dir/web"
cwebp_bin=${CWEBP_BIN:-}

if [ -z "$cwebp_bin" ]; then
  cwebp_bin=$(command -v cwebp || true)
fi

if [ -z "$cwebp_bin" ]; then
  echo "cwebp is required; install the WebP tools package or set CWEBP_BIN." >&2
  exit 1
fi

temp_dir=$(/usr/bin/mktemp -d /tmp/personal-site-banner.XXXXXX)

cleanup() {
  /bin/rm -f "$temp_dir"/*.jpg
  /bin/rmdir "$temp_dir"
}

trap cleanup EXIT HUP INT TERM

/bin/mkdir -p "$output_dir"

convert_image() {
  source_name=$1
  output_name=$2
  crop_x=${3:-}
  crop_width=${4:-}
  temp_jpeg="$temp_dir/$output_name.jpg"

  /usr/bin/sips \
    -Z 1200 \
    -s format jpeg \
    -s formatOptions 85 \
    "$source_dir/$source_name" \
    --out "$temp_jpeg" >/dev/null
  /usr/bin/sips -r 90 "$temp_jpeg" >/dev/null

  set -- -quiet -q 82 -metadata none
  if [ -n "$crop_width" ]; then
    set -- "$@" -crop "$crop_x" 0 "$crop_width" 1200
  fi

  "$cwebp_bin" "$@" "$temp_jpeg" -o "$output_dir/$output_name.webp"
}

convert_image IMG_1362.HEIC snow-pinecones
convert_image IMG_2573.HEIC sunlit-hills
convert_image IMG_6067.HEIC stone-terrace
convert_image IMG_6825.HEIC coastal-hills
convert_image IMG_7212.HEIC london-phone-booth 100 500
convert_image IMG_7683.HEIC amsterdam-canal

echo "Updated browser assets in $output_dir"
