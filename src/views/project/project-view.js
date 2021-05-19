import { LitElement, html, css  } from 'lit-element';
import { connect, installRouter } from 'pwa-helpers';
import { store                  } from '../../redux/store.js';
import { Router                 } from '@vaadin/router';
import { addProject             } from '../../redux/actions.js';

import nanoid from 'nanoid';

class ProjectView extends connect(store)(LitElement) {

  static get properties() {
    return {
      projectName : { type: String },
      subjectName : { type: String },
      factor1Name : { type: String },
      factor2Name : { type: String },
    };
  }

  constructor(){
    super();
  }

  render() {
    return html`
    <!-- TODO: bad practice. Change this ---> 
    <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.1/build/pure-min.css"> 
    <!-- ./ TODO: bad practice. Change this ---> 
    
  <div class="input-layout" @keyup="${this.shortcutListener}">
    <form class="pure-form pure-form-stacked">
      <fieldset>
          <legend>Add a new project</legend>
          <label for="project-name">Project Name</label>
          <input type="text" id="project-name" placeholder="Project Name" value="${this.projectName || ''}" @input="${e=>this.projectName = e.target.value}" />
          <label for="subject-name">Subject Name</label>
          <input type="text" id="subject-name" placeholder="Subject Name" value="${this.subjectName || ''}" @input="${e=>this.subjectName = e.target.value}" />
          <label for="factor1-name">Factor1 Name</label>
          <input type="text" id="factor1-name" placeholder="Factor1 Name"	value="${this.factor1Name || ''}"	@input="${e=>this.factor1Name = e.target.value}"	/>
          <label for="factor2-name">Factor2 Name</label>
          <input type="text" id="factor2-name" placeholder="Factor2 Name" value="${this.factor2Name || ''}"	@input="${e=>this.factor2Name = e.target.value}"	/>
          <button type="button" class="pure-button pure-button-primary" @click="${this.addProject}">Add new project</button>
      </fieldset>
    </form>
  </div>
    `;
  }

  addProject() {
    let id = nanoid(10);
    if (this.projectName && this.subjectName && this.factor1Name && this.factor2Name) {
        store.dispatch(addProject(id,this.projectName,this.subjectName,this.factor1Name,this.factor2Name));
        this.resetAllValues();
        Router.go("/factor1Config/"+id);
    }
    
  }

  resetAllValues(){
    this.projectName='';
    this.subjectName='';
    this.factor1Name='';
    this.factor2Name='';
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('project-view', ProjectView);
