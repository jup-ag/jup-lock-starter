function getSvgString(fill = "black") {
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><path d="M3 1h1v1h-1zM4 1h1v1h-1zM2 2h1v1h-1zM5 2h1v1h-1zM1 3h1v1h-1zM6 3h1v1h-1zM1 4h1v1h-1zM6 4h1v1h-1zM2 5h1v1h-1zM5 5h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1z" fill="${fill}"/></svg>`)}")`;
}

export const pixelatedBorderStyle: React.CSSProperties = {
  borderImageSlice: "3",
  borderImageWidth: "2",
  borderImageRepeat: "stretch",
  borderImageOutset: "2",
  borderImageSource: getSvgString(),
};
