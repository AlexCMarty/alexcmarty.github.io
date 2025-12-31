/*
TODO (before git push)
- proof read the article so it makes sense, typos, correct LaTex, graphs are coherent, etc.
*/

/* This file works with the Desmos API to make the custom element for a Desmos graph. */

import * as graphFunctions from './graphFunctions.mjs';

// Adapted this function from theme.js: https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/_javascript/theme.js
/**
 * Returns if the page is in light or dark mode
 * @returns {string} 'light' | 'dark'
 */
function getVisualState() {
  let mode =
    sessionStorage.getItem('mode') ||
    document.documentElement.getAttribute('data-mode');
  let darkMedia = window.matchMedia('(prefers-color-scheme: dark)');

  if (mode !== null) {
    return mode;
  }
  return darkMedia.matches ? 'dark' : 'light';
}

class DesmosGraph extends HTMLElement {
  constructor() {
    super();
    this.calculator;
    this.calculatorRoot;
  }

  updateColors() {
    this.calculator.updateSettings({
      invertedColors: getVisualState() === 'dark',
    });
  }

  /**
   * Asynchronously fetches the graph data via a desmos URL and adds it to the graph.
   * @param {string} url
   *
   */
  async loadGraph(url) {
    // Shadow DOM breaks the Desmos graph. DON'T use shadow DOM.

    this.calculatorRoot = document.createElement('div');
    this.calculatorRoot.setAttribute('style', `width: 100%; aspect-ratio: 1;`);
    this.insertBefore(this.calculatorRoot, this.firstChild);

    let calculatorMethod;
    switch (true) {
      case url.includes('calculator'):
        calculatorMethod = Desmos.GraphingCalculator;
        break;
      case url.includes('geometry'):
        calculatorMethod = Desmos.Geometry;
        break;
    }

    this.calculator = calculatorMethod(this.calculatorRoot, {
      expressions: false,
      invertedColors: getVisualState() === 'dark',
    });

    // For toggle after load
    window.addEventListener('message', (event) => {
      if (event.data.id === 'theme-mode') {
        this.updateColors();
      }
    });

    let failed = false;
    try {
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const graph = await response.json();
      let graphState = graph.state;
      this.calculator.setState(graphState);
    } catch (error) {
      console.error(error.message);
      failed = true;
    }

    if (!failed && this.dataset.function) {
      graphFunctions[this.dataset.function](this.calculator, this.dataset.url);
    }
  }

  /**
   * Once the element is added to DOM, add the edit link and connect the buttons to their functions.
   */
  connectedCallback() {
    this.loadGraph(this.dataset.url); // Fire and forget

    document.addEventListener('DOMContentLoaded', () => {
      /* Add the edit link */
      let editDiv = document.createElement('div');
      editDiv.setAttribute('style', 'text-align: center; height: 2em');
      let anchor = document.createElement('a');
      anchor.href = this.dataset.url;
      anchor.innerHTML = 'Edit in Desmos';
      editDiv.appendChild(anchor);
      this.insertBefore(editDiv, this.calculatorRoot.nextSibling);

      /* Attach a function to each button. The function should be defined in graphFunctions.js*/
      this.querySelectorAll('.desmos-button-container > button').forEach(
        (btn) => {
          btn.addEventListener('click', (event) => {
            graphFunctions[btn.dataset.function](
              this.calculator,
              this.dataset.url,
              btn.dataset.arg
            );
          });
        }
      );
    });
  }
}

customElements.define('desmos-graph', DesmosGraph);
