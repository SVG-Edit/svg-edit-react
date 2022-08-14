/**
    SVGEDit canvas will "sanitize" the SVG and remove all oimotion animations.
    we capture them on load and restore them on save.
    @important This code is needed for a specific usage and will be removed in the future.
*/

const saveOIAttr = (svgContent) => {
  // eslint-disable-next-line prefer-regex-literals
  const result = svgContent.match(new RegExp('oi:animations="(.*?)"')) ?? {}
  return result['0'] ?? ''
}

const restoreOIAttr = (svgContent, attributes) => {
  if (!attributes) return svgContent
  const oiNameSpace = 'xmlns:oi="http://oimotion.optimistik.fr/namespace/svg/OIdata"'
  return svgContent.replace('<svg', `<svg ${oiNameSpace} ${attributes}`)
}
export default { saveOIAttr, restoreOIAttr }
