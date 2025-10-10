console.log('script loaded');

// These custom elements are super convenient!!!
class DesmosGraph extends HTMLElement {
  static observedAttributes = ['width', 'height', 'url'];

  constructor() {
    super();
  }

  connectedCallback() {
    // Shadow DOM breaks the desmos graph. Don't use shadow DOM.
    let width;
    if (this.hasAttribute('width')) {
      width = this.getAttribute('width');
    } else {
      width = '600px';
    }

    let height;
    if (this.hasAttribute('height')) {
      height = this.getAttribute('height');
    } else {
      height = '600px';
    }

    // Make this spit out an empty graph for now.
    let calculatorRoot = document.createElement('div');
    calculatorRoot.setAttribute('style', `width: ${width}; height: ${height};`);
    this.appendChild(calculatorRoot);

    this.calculator = Desmos.GraphingCalculator(calculatorRoot);
    console.log('Here is the calculator!')
    console.log(this.calculator);
  }

  async loadGraph(url) {
    fetch('https://desmos.com/calculator/fczsrpeo75', {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(json => {
        const graphState = json.state;
        // Load it into the embedded calculator
        console.log('AAAAAAAAAAAAAAAAAAAAAA', graphState);
      })
      .catch(err => {
        console.error('Could not load Desmos graph JSON:', err);
      });
   
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'url') {
      this.loadGraph(newValue);
    }
  }
}

customElements.define('desmos-graph', DesmosGraph);
