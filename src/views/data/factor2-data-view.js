import { LitElement, html, css } from 'lit-element';

import { connect } from 'pwa-helpers';
import { store } from '../../redux/store.js';
import { ProjectListView } from '../project/project-list-view.js'
import { Router } from '@vaadin/router';

import {addfactor2Data} from '../../redux/actions.js';

class Factor2DataView extends connect(store)(LitElement) {

  static get properties() {
    return {
      projectId         :    { type : String  },
      project           :    { type : Object  },
      subjects          :    { type : Array  },
      factor2Datas      :    { type : Array   },
      subject           :    { type: String   },
      factor2LowValue   :    { type: Number   },
      factor2HighValue  :    { type: Number   }
    };
  }

  stateChanged(state) {
    this.projectId      = this.location.params.projectId;
    this.project        = state.projects.find(e=>e.id==this.projectId);
    let factor1Datas    = state.factor1Datas.find(e => e.projectId == this.projectId);
    factor1Datas.factor1Data.forEach(element => {
      this.subjects.push(element.subject);
    });
    console.log(this.subjects);
  }

  constructor() {
    super();
    this.project       = {};
    this.factor2Datas   = [];
    this.subjects = [];
    this.subject = '';
    this.factor2LowValue = '';
    this.factor2HighValue = '';

  }

  render() {
    return html`<div class="input-layout">
    <form class="pure-form">
  <fieldset>
      <legend>Configure low and high values of factor1 <app-link href="/">Go back</app-link> </legend>
      <label for="subject">Choose ${this.project.subjectName} : </label>
      <select @input="${e=>this.subject = e.target.value}">
      <option>-- select--</option>
      ${this.subjects.map(item => html`<option>${item}</option>`)}
      </select>
      <label for="factor2-low-value">Low Value:</label>
      <input type="text"  @input="${e=>this.factor2LowValue = e.target.value}" />
      <label for="factor2-high-value">High Value:</label>
      <input type="text"  @input="${e=>this.factor2HighValue = e.target.value}" />
    <button type="button" class="pure-button pure-button-primary" @click="${this.addfactor2Data}">Add</button>
    <ul>${this.factor2Datas.map(item => html`<li>${item.subject} , ${item.factor2LowValue} , ${item.factor2HighValue}</li>`)}</ul>
    </fieldset>
    <button type="button" class="pure-button pure-button-primary" @click="${this.savefactor2Data}">Save data</button>
</form>
  </div>
    </div>
    `;
  }

  addfactor2Data(){
    let factor2Data = {
      'subject'         : this.subject,
      'factor2LowValue' : this.factor2LowValue,
      'factor2HighValue': this.factor2HighValue
    }
    this.factor2Datas.push(factor2Data);
    this.factor2LowValue    = '';
    this.factor2HighValue   = '';
    this.subject            = '';
  }

  savefactor2Data() {
    store.dispatch(addfactor2Data(this.projectId,this.factor2Datas));
    this.project       = {};
    this.factor2Datas   = [];
    this.subjects = [];
    this.subject = '';
    this.factor2LowValue = '';
    this.factor2HighValue = '';
    Router.go("/project/list");
  }

  createRenderRoot() {
    return this;
  }
}
customElements.define('factor2-data-view', Factor2DataView);
