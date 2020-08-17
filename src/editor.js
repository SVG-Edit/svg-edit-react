/*
Optimistik
SVG-Edit-react
*/

import './editor.less'
import Editor from './editor.class'

// make the class available globally in the browser
if (!window.Editor) {
  window.Editor = Editor
}
