console.log('script loaded');

// These custom elements are super convenient!!!
class DesmosGraph extends HTMLElement {
  static observedAttributes = ['width', 'height', 'url'];

  constructor() {
    super();
  }

  connectedCallback() {
    // Don't do anything when connected to DOM
    // Only do something when url attribute is present.
  }

  async loadGraph(url, calculator) {
    // Shadow DOM breaks the desmos graph. Don't use shadow DOM.

    let width = this.hasAttribute('width')
      ? this.getAttribute('width')
      : '600px';
    let height = this.hasAttribute('height')
      ? this.getAttribute('height')
      : '600px';

    let calculatorRoot = document.createElement('div');
    calculatorRoot.setAttribute('style', `width: ${width}; height: ${height};`);
    this.appendChild(calculatorRoot);

    calculator = Desmos.GraphingCalculator(calculatorRoot);
    // Now there is just a blank calculator.
    // Add the graph state.

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
      calculator.setState(graphState);
    } catch (error) {
      console.error(error.message);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'url') {
      this.loadGraph(newValue, this.calculator);
    }
  }
}

customElements.define('desmos-graph', DesmosGraph);
