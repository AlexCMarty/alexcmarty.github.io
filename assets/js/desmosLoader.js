/*
TODO (once this is all mostly polished)
- remove all custom attributes like url and function in favor of data- attributes
*/

class DesmosGraph extends HTMLElement {
  static observedAttributes = ['width', 'height', 'url'];

  constructor() {
    super();
    this.calculator; // defined in loadGraph
    this.url; // defined in attributeChangedCallBack
  }

  // Functions are arranged by chronological order from when they are called by the JS engine.

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'url') {
      this.url = newValue;
      this.loadGraph(newValue);
    }
  }

  async loadGraph(url) {
    // Shadow DOM breaks the desmos graph. Don't use shadow DOM.

    let calculatorRoot = document.createElement('div');
    calculatorRoot.setAttribute('style', `width: 100%; aspect-ratio: 1;`);
    this.appendChild(calculatorRoot);

    // The geometry and graphing calculators require different functions to make.
    let calculatorMethod;
    switch (true) {
      case url.includes('calculator'):
        calculatorMethod = Desmos.GraphingCalculator;
        break;
      case url.includes('geometry'):
        calculatorMethod = Desmos.Geometry;
        break;
    }

    this.calculator = calculatorMethod(calculatorRoot, {
      expressions: false,
    });

    // Now that the calculator has been added to DOM, add the edit link.
    let editDiv = document.createElement('div');
    editDiv.setAttribute('style', 'text-align: center; height: 2em');
    let anchor = document.createElement('a');
    anchor.href = url;
    anchor.innerHTML = 'Edit in Desmos';
    editDiv.appendChild(anchor);
    this.appendChild(editDiv);

    // Finally the graph state. Will take a moment to load.
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
    }
  }

  connectedCallback() {
    // For every button that is a child of the desmos-graph,
    // add an event listener that will call the specified function.
    // The function should be defined in a <script> tag as a child of the button,
    // but doesn't have to be since functions in <script> are in the global scope.
    document.addEventListener('DOMContentLoaded', () => {
      let container = [...this.children].filter(
        (item) => item.className === 'desmos-button-container'
      )[0];
      if (container !== undefined) {
        for (let i = 0; i <= container.children.length - 1; i++) {
          let el = container.children[i];
          if (el.type === 'button') {
            let func = el.getAttribute('function');
            el.addEventListener('click', (event) => {
              window[func](this.calculator, this.url);
            });
          }
        }
      }
    });
  }
}

customElements.define('desmos-graph', DesmosGraph);
