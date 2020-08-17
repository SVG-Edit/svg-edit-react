/*
Optimistik
SVG-Edit-react
*/
import React from 'react'
import ReactDOM from 'react-dom'
import Canvas from './Canvas/Canvas.jsx'

const VERSION = require('../package.json').version

class Editor {
  /**
   * Creates an instance of Editor
   * @param {HTMLElement} div DOM element where the SVG will be loaded (usually a div)
   * @example
   * const element = document.getElementById('OIm-container')
   * const editor = new Editor(element)
   * editor.load('./circle.svg')
   *
   */
  constructor(div) {
    /** @private the div that holds the whole thing */
    this.div = div
    this.config = {
      debug: true,
      i18n: 'fr',
      saveHandler: null,
      onCloseHandler: null,
      debugPrefix: 'editor',
    }
  }

  /**
   * Manage SVG update
   */
  svgUpdate = (svgContent) => {
    this.logDebugData('svgUpdate', this.config.saveHandler !== null)
    this.svgContent = svgContent
    if (this.config.saveHandler !== null) {
      this.config.saveHandler(this.svgContent)
    }
  }

  /**
   * Manage Close
   */

  onClose = () => {
    this.logDebugData('onClose', this.config.onCloseHandler !== null)
    ReactDOM.unmountComponentAtNode(this.div)
    if (this.config.onCloseHandler !== null) {
      this.config.onCloseHandler()
    }
  }

  /**
   * Load svg
   * @async
   * @memberof Editor
   * @method load
   * @param {String} svgPath svg content
   * @returns {Promise<Editor>} return the current editor instance after the SVG is loaded
   * @example
   * editor.load('./circle.svg')
   * .then((editorInstance) => {
   *  console.log('loaded and ready')
   * })
   */
  load(svgContent) {
    this.logDebugData('load', svgContent?.length)
    try {
      // add the React based editor in the panel div
      ReactDOM.render(
        React.createElement(
          Canvas,
          {
            svgContent,
            locale: this.config.i18n,
            svgUpdate: this.svgUpdate,
            onClose: this.onClose,
            log: this.logDebugData,
          },
          null,
        ),
        this.div,
      )
    } catch (err) {
      console.error('could not load the SVG content', err)
      throw err
    }
  }

  /**
   * info displays a log to the console with information about the Editor version
   * as well as technical informations.
   * @memberof Editor
   * @method info
   * @returns an object containing current Editor configuration
   */
  info() {
    console.info('Editor version:', VERSION)
    const info = {
      version: VERSION,
      currentConfig: this.config,
      container: this.div,
    }
    return info
  }

  /**
   * getSVG returns the SVG as modified by Editor.
   *
   * @memberof Editor
   * @method getSvg
   * @returns the SVG that should be saved to keep animation parameters as a string
   */
  getSvg() {
    this.logDebugData('getSvg')
    return this.svgContent
  }

  /**
   * configure allow to edit the current configuration.
   * Use case example editor.configure(useCache, true).
   * Calling configure will put the animation to idle mode
   * @memberof Editor
   * @method configure
   * @param {string} name the setting name
   * @param {string} value the setting value
   * @returns {Object} the new configuration if succesful
   * @throws {Error} when the configuration does not exist
   * @example
   * // Toggle the debug mode, logging to the console each function call and its parameters
   * configure('debug', true) possible values: true|false, default: false
   * @example
   * configure('i18n', 'fr')
   */
  configure(name, value) {
    this.logDebugData('configure', { name, value })

    if (typeof this.config[name] === 'undefined') {
      throw new Error(`${name} is not a valid configuration`)
    }
    this.config[name] = value
    return this.config
  }

  /**
   * Log debug data to the console
   * @access private
   * @memberof Editor
   * @method logDebugData
   */
  logDebugData = (functionName, args) => {
    if (this.config.debug) {
      console.info('%c%s', 'color:green', this.config.debugPrefix, functionName, args, new Error().stack.split(/\n/)[2])
    }
  }
}

export default Editor
