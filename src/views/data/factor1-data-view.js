import { LitElement, html, css } from 'lit-element';

import { connect } from 'pwa-helpers';
import { store } from '../../redux/store.js';
import { ProjectListView } from '../project/project-list-view.js'
import { Router } from '@vaadin/router';

import {
  addfactor1Data,
  addProject
} from '../../redux/actions.js';

class Factor1DataView extends connect(store)(LitElement) {

  static get properties() {
    return {
      projectId     :    { type : String  },
      project       :    { type : Object  },
      factor1Config :    { type : Object  },
      factor1Datas  :    { type : Array   },
      subject       :    {type: String    },
      factor1Value  :    {type: String    }
    };
  }

  stateChanged(state) {
    this.projectId      = this.location.params.projectId;
    this.project        = state.projects.find(e=>e.id==this.projectId);
    this.factor1Config  = state.factor1Configs.find(e => e.projectId==this.projectId);
  }

  constructor() {
    super();
    this.factor1Config = {};
    this.project       = {};
    this.factor1Datas   = [];
    this.subject = '';
    this.factor1Value = '';
  }

  render() {
    return html`<div class="input-layout">
    <form class="pure-form">
  <fieldset>
      <legend>Configure low and high values of factor1 <app-link href="/">Go back</app-link> </legend>
      <label for="subject">${this.project.subjectName} : </label>
      <input type="text" id="subject" placeholder="Example: class , teacher, pupil" @input="${e=>this.subject = e.target.value}" />
      <label for="factor1-value">${this.project.factor1Name}:</label>
      <input type="text" id="factor1-value"  @input="${e=>this.factor1Value = e.target.value}" />
    <button type="button" class="pure-button pure-button-primary" @click="${this.addfactor1Values}">Add</button>
    <ul>${this.factor1Datas.map(item => html`<li>${item.subject} , ${item.factor1Value}</li>`)}</ul>
    </fieldset>
    <button type="button" class="pure-button pure-button-primary" @click="${this.savefactor1Data}">Save data</button>
</form>
  </div>
    </div>
    `;
  }

  addfactor1Values(){
    let factor1Data = {
      'subject'     : this.subject,
      'factor1Value': this.factor1Value
    }
    this.factor1Datas.push(factor1Data);
    this.factor1Value = '';
    this.subject      = '';
  }

  savefactor1Data() {
    store.dispatch(addfactor1Data(this.projectId, this.factor1Datas));
    this.factor1Value = '';
    this.subject      = '';
    Router.go("/factor2Data/"+this.projectId);
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
customElements.define('factor1-data-view', Factor1DataView);
