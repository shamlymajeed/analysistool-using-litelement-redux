import { LitElement, html, css } from 'lit-element';

import { connect } from 'pwa-helpers';
import { store } from '../../redux/store.js';
import { ProjectListView } from './list-project.js'
import { Router } from '@vaadin/router';

import {
  addFactor1Config,
  addProject
} from '../../redux/actions.js';

class Factor1ConfigView extends connect(store)(LitElement) {

  connectedCallback() {
    super.connectedCallback();
    this.projectId = this.location.params.projectId;
	}


  static get properties() {
    return {
      projects: { type: Array },
      projectId: { type: String },
      lowValues: { type: Array },
      highValues: { type: Array },
      lowValue: { type: String },
      highValue: { type: String }

    };
  }

  constructor() {
    super();
    this.lowValues = [];
    this.highValues = [];
  }

  stateChanged(state) {
    console.log("super !!");
    console.log(state.factor1Configs);
  }

  render() {
    return html`<div class="input-layout">
    <form class="pure-form">
  <fieldset>
      <legend>Configure low and high values of factor1 <app-link href="/">Go back</app-link> </legend>
      <label for="project-name">low value</label>
      <input type="text" id="lowValue" placeholder="examples: 0-15, Green" @input=${this._handleLowvalueChange} value="${this.lowValue || ''}"
    />
    <button type="button" class="pure-button pure-button-primary" @click="${this.addLowValue}">Add low value</button>

    <ul>${this.lowValues.map(item => html`<li>${item}</li>`)}</ul>
    </fieldset>

</form>
<form class="pure-form">
<fieldset>

    <label for="subject-name">High value</label>
    <input type="text" id="highValue" placeholder="examples: 0-15, Yellow, Red" @input=${this._handleHighvalueChange}  value="${this.highValue || ''}" />
    <button type="button" class="pure-button pure-button-primary" @click="${this.addHighValue}">Add high value</button>
    <ul>${this.highValues.map(item => html`<li>${item}</li>`)}</ul>
    </fieldset>

</form>

  <button type="button" class="pure-button pure-button-primary" @click="${this.save}">Save</button>

  </div>
    </div>

    <list-projects></list-projects>

    `;
  }

  _handleLowvalueChange(e) {
    this.lowValue = e.target.value;
  }
  _handleHighvalueChange(e) {
    this.highValue = e.target.value;
  }


  addLowValue(e) {
    if (this.lowValue) {
      this.lowValues.push(this.lowValue);
    }
    console.log(this.lowValues);
  }

  addHighValue(e) {
    if (this.highValue) {
      this.highValues.push(this.highValue);
    }
    console.log(this.highValues);
  }


  save() {
    store.dispatch(addFactor1Config(this.projectId, this.lowValues, this.highValues));
    this.lowValues = [];
    this.highValues = [];
    this.lowValue = '';
    this.highValue = '';

    Router.go("/factor1Data/"+this.projectId);
  }


  filterChanged(e) {
    store.dispatch(updateFilter(e.detail.value));
  }

  clearCompleted() {
    store.dispatch(clearCompleted());
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('factor1-config-view', Factor1ConfigView);
