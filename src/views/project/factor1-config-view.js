import { LitElement, html } from 'lit-element';
import { connect          } from 'pwa-helpers';
import { store            } from '../../redux/store.js';
import { Router           } from '@vaadin/router';
import { addFactor1Config } from '../../redux/actions.js';

class Factor1ConfigView extends connect(store)(LitElement) {

  connectedCallback() {
    super.connectedCallback();
    this.projectId = this.location.params.projectId;
	}

  static get properties() {
    return {
      projectId   : { type: String  },
      lowValues   : { type: Array   },
      highValues  : { type: Array   },
      lowValue    : { type: String  },
      highValue   : { type: String  }
    };
  }

  constructor() {
    super();
    this.lowValues  = [];
    this.highValues = [];
  }

  render() {
    return html`
    <!-- TODO Bad practice change it -->
    <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.1/build/pure-min.css"> 
    <!-- TODO Bad practice change it -->

    <div class="input-layout">
    <form class="pure-form">
    <fieldset>
      <legend>Configure low and high values of factor1</legend>
      <label for="project-name">low value</label>
      <input type="text" id="lowValue" placeholder="examples: 0-15, Green"  @input="${e=>this.lowValue = e.target.value}" value="${this.lowValue || ''}" />
      <button type="button" class="pure-button pure-button-primary" @click="${this.addLowValue}">Add low value</button>
      <ul>${this.lowValues.map(item => html`<li>${item}</li>`)}</ul>
    </fieldset>
    </form>
    <form class="pure-form">
    <fieldset>
      <label for="subject-name">High value</label>
      <input type="text" id="highValue" placeholder="examples: 15-30, Yellow, Red"  @input="${e=>this.highValue = e.target.value}" value="${this.highValue || ''}" />
      <button type="button" class="pure-button pure-button-primary" @click="${this.addHighValue}">Add high value</button>
      <ul>${this.highValues.map(item => html`<li>${item}</li>`)}</ul>
    </fieldset>
    </form>
    <button type="button" class="pure-button pure-button-primary" @click="${this.save}">Save</button>
    </div>
    </div>
    `;
  }


  addLowValue(e) {
    if (this.lowValue) {
      this.lowValues.push(this.lowValue);
      this.lowValue='';
    }
  }

  addHighValue(e) {
    if (this.highValue) {
      this.highValues.push(this.highValue);
      this.highValue='';

    }
  }

  save() {
    store.dispatch(addFactor1Config(this.projectId, this.lowValues, this.highValues));
    this.resetValues();
    Router.go("/factor1Data/"+this.projectId);
  }

  resetValues(){
    this.lowValues  = [];
    this.highValues = [];
    this.lowValue   = '';
    this.highValue  = '';
  }
}

customElements.define('factor1-config-view', Factor1ConfigView);
