// General imports
import React from 'react'
import PropTypes from 'prop-types'

import group from 'svgedit/src/editor/images/group_elements.png'
import ungroup from 'svgedit/src/editor/images/shape_ungroup.png'
import undo from 'svgedit/src/editor/images/undo.png'
import redo from 'svgedit/src/editor/images/redo.png'
import select from 'svgedit/src/editor/images/select.png'
import line from 'svgedit/src/editor/images/line.png'
import circle from 'svgedit/src/editor/images/circle.png'
import ellipse from 'svgedit/src/editor/images/ellipse.png'
import square from 'svgedit/src/editor/images/square.png'
import rect from 'svgedit/src/editor/images/rect.png'
import save from 'svgedit/src/editor/images/save.png'
import text from 'svgedit/src/editor/images/text.png'
import del from 'svgedit/src/editor/images/delete.png'
import clone from 'svgedit/src/editor/images/clone.png'
import path from 'svgedit/src/editor/images/path.png'
import alignBottom from 'svgedit/src/editor/images/align-bottom.png'
import alignCenter from 'svgedit/src/editor/images/align-center.png'
import alignTop from 'svgedit/src/editor/images/align-top.png'
import alignLeft from 'svgedit/src/editor/images/align-left.png'
import alignRight from 'svgedit/src/editor/images/align-right.png'
import alignMiddle from 'svgedit/src/editor/images/align-middle.png'
import align from 'svgedit/src/editor/images/align.png'
import moveBottom from 'svgedit/src/editor/images/move_bottom.png'
import moveTop from 'svgedit/src/editor/images/move_top.png'
import bold from 'svgedit/src/editor/images/bold.png'
import italic from 'svgedit/src/editor/images/italic.png'
import fill from 'svgedit/src/editor/images/fill.png'
import stroke from 'svgedit/src/editor/images/stroke.png'
import fontSize from 'svgedit/src/editor/images/fontsize.png'
import noColor from 'svgedit/src/editor/images/no_color.png'
import zoom from 'svgedit/src/editor/images/zoom.png'

import close from './close.png'

const Icon = ({ name, ...otherProps }) => {
  switch (name) {
    case 'Select':
      return <img src={select} alt="select" {...otherProps} />
    case 'Line':
      return <img src={line} alt="line" {...otherProps} />
    case 'Circle':
      return <img src={circle} alt="circle" {...otherProps} />
    case 'Ellipse':
      return <img src={ellipse} alt="ellipse" {...otherProps} />
    case 'Text':
      return <img src={text} alt="text" {...otherProps} />
    case 'Delete':
      return <img src={del} alt="delete" {...otherProps} />
    case 'Clone':
      return <img src={clone} alt="clone" {...otherProps} />
    case 'Path':
      return <img src={path} alt="path" {...otherProps} />
    case 'Square':
      return <img src={square} alt="square" {...otherProps} />
    case 'Rect':
      return <img src={rect} alt="rect" {...otherProps} />
    case 'Close':
      return <img src={close} alt="close" {...otherProps} />
    case 'Save':
      return <img src={save} alt="save" {...otherProps} />
    case 'Undo':
      return <img src={undo} alt="undo" {...otherProps} />
    case 'Redo':
      return <img src={redo} alt="redo" {...otherProps} />
    case 'Group':
      return <img src={group} alt="group" {...otherProps} />
    case 'Ungroup':
      return <img src={ungroup} alt="group" {...otherProps} />
    case 'AlignBottom':
      return <img src={alignBottom} alt="group" {...otherProps} />
    case 'AlignCenter':
      return <img src={alignCenter} alt="group" {...otherProps} />
    case 'AlignTop':
      return <img src={alignTop} alt="group" {...otherProps} />
    case 'AlignLeft':
      return <img src={alignLeft} alt="group" {...otherProps} />
    case 'AlignRight':
      return <img src={alignRight} alt="group" {...otherProps} />
    case 'AlignMiddle':
      return <img src={alignMiddle} alt="group" {...otherProps} />
    case 'Align':
      return <img src={align} alt="group" {...otherProps} />
    case 'MoveBottom':
      return <img src={moveBottom} alt="group" {...otherProps} />
    case 'MoveTop':
      return <img src={moveTop} alt="group" {...otherProps} />
    case 'Bold':
      return <img src={bold} alt="group" {...otherProps} />
    case 'Italic':
      return <img src={italic} alt="group" {...otherProps} />
    case 'Fill':
      return <img src={fill} alt="group" {...otherProps} />
    case 'Stroke':
      return <img src={stroke} alt="group" {...otherProps} />
    case 'FontSize':
      return <img src={fontSize} alt="group" {...otherProps} />
    case 'NoColor':
      return <img src={noColor} alt="group" {...otherProps} />
    case 'Zoom':
      return <img src={zoom} alt="group" {...otherProps} />
    default:
      return <img src={group} alt="group" {...otherProps} />
  }
}

// Properties restriction
Icon.propTypes = { name: PropTypes.string.isRequired }

export default Icon
