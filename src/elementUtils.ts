export function getElementBoundingBox(element?: Element | null) {
  const boundingRect = element?.getBoundingClientRect()

  const style = element ? window.getComputedStyle(element) : null

  const padding = {
    left: Number(style?.paddingLeft ?? 0),
    right: Number(style?.paddingRight ?? 0),
    top: Number(style?.paddingTop ?? 0),
    bottom: Number(style?.paddingBottom ?? 0),
    x: Number(style?.paddingLeft ?? 0) + Number(style?.paddingRight ?? 0),
    y: Number(style?.paddingTop ?? 0) + Number(style?.paddingBottom ?? 0),
  }

  const margin = {
    left: Number(style?.marginLeft ?? 0),
    right: Number(style?.marginRight ?? 0),
    top: Number(style?.marginTop ?? 0),
    bottom: Number(style?.marginBottom ?? 0),
    x: Number(style?.marginLeft ?? 0) + Number(style?.marginRight ?? 0),
    y: Number(style?.marginTop ?? 0) + Number(style?.marginBottom ?? 0),
  }

  const border = {
    left: Number(style?.borderLeftWidth ?? 0),
    right: Number(style?.borderRightWidth ?? 0),
    top: Number(style?.borderTopWidth ?? 0),
    bottom: Number(style?.borderBottomWidth ?? 0),
    x: Number(style?.borderLeftWidth ?? 0) + Number(style?.borderRightWidth ?? 0),
    y: Number(style?.borderTopWidth ?? 0) + Number(style?.borderBottomWidth ?? 0),
  }

  const gap = {
    left: margin.left + padding.left,
    right: margin.right + padding.right,
    top: margin.top + padding.top,
    bottom: margin.bottom + padding.bottom,
    x: margin.x + padding.x + border.x,
    y: margin.y + padding.y + border.y,
  }

  const width = Math.max(boundingRect?.width ?? 0, element?.scrollWidth ?? 0)
  const height = Math.max(boundingRect?.height ?? 0, element?.scrollHeight ?? 0)

  const rect = {
    width,
    height,
    left: (boundingRect?.left ?? 0),
    x: (boundingRect?.x ?? 0),
    right: (boundingRect?.left ?? 0) + width,
    top: (boundingRect?.top ?? 0),
    y: (boundingRect?.y ?? 0),
    bottom: (boundingRect?.top ?? 0) + height,
  }

  const innerRect = {
    width: width - gap.x,
    height: height - gap.y,
    top: rect.top + gap.top,
    right: rect.right - gap.right,
    left: rect.left + gap.left,
    bottom: rect.bottom - gap.bottom,
    x: rect.x - gap.left,
    y: rect.y - gap.top,
  }

  return {
    ...rect,
    innerRect,
    padding,
    margin,
    gap,
    scrollWidth: element?.scrollWidth ?? 0,
    scrollHeight: element?.scrollHeight ?? 0,
  }
}
