// code derived from svg-editor.js
const updateCanvas = (svgCanvas, cnvs, curConfig, center, newCtr = {}) => {
  // workarea node is the parent of the svg canvas
  const workarea = cnvs.parentNode
  //  let w = workarea.width(), h = workarea.height();
  let { width: w, height: h } = workarea.getBoundingClientRect()
  const wOrig = w
  const hOrig = h
  const oldCtr = {
    x: workarea.scrollLeft + wOrig / 2,
    y: workarea.scrollTop + hOrig / 2,
  }
  // multi: The minimum area visible outside the canvas, as a multiple of the image dimensions.
  const multi = curConfig.canvas_expansion
  const zoom = svgCanvas.getZoom()
  w = Math.max(wOrig, svgCanvas.contentW * zoom * multi)
  h = Math.max(hOrig, svgCanvas.contentH * zoom * multi)

  if (w === wOrig && h === hOrig) {
    workarea.style.overflow = 'hidden'
  } else {
    workarea.style.overflow = 'scroll'
  }
  // const oldCanY = cnvs.height() / 2;
  // const oldCanX = cnvs.width() / 2;
  // cnvs.width(w).height(h);
  const { width: cw, height: ch } = cnvs.getBoundingClientRect()
  const oldCanY = ch / 2
  const oldCanX = cw / 2
  cnvs.style.width = w
  cnvs.style.height = h

  const newCanY = h / 2
  const newCanX = w / 2
  const offset = svgCanvas.updateCanvas(w, h)

  const ratio = newCanX / oldCanX

  const scrollX = w / 2 - wOrig / 2
  const scrollY = h / 2 - hOrig / 2

  //   if (!newCtr) {
  if (!newCtr.x) {
    const oldDistX = oldCtr.x - oldCanX
    const newX = newCanX + oldDistX * ratio

    const oldDistY = oldCtr.y - oldCanY
    const newY = newCanY + oldDistY * ratio
    newCtr.x = newX
    newCtr.y = newY
  } else {
    newCtr.x += offset.x
    newCtr.y += offset.y
  }

  if (center) {
    // Go to top-left for larger documents
    if (svgCanvas.contentW > workarea.getBoundingClientRect().width) {
      // Top-left
      // workarea[0].scrollLeft = offset.x - 10
      // workarea[0].scrollTop = offset.y - 10
      workarea.scrollLeft = offset.x - 10
      workarea.scrollTop = offset.y - 10
    } else {
      // Center
      // wArea[0].scrollLeft = scrollX
      // wArea[0].scrollTop = scrollY
      workarea.scrollLeft = scrollX
      workarea.scrollTop = scrollY
    }
  } else {
    // wArea[0].scrollLeft = newCtr.x - wOrig / 2
    // wArea[0].scrollTop = newCtr.y - hOrig / 2
    workarea.scrollLeft = newCtr.x - wOrig / 2
    workarea.scrollTop = newCtr.y - hOrig / 2
  }
}

export default updateCanvas
