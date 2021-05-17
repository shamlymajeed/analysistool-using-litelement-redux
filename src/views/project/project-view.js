import { LitElement, html, css } from 'lit-element';

import { connect, installRouter } from 'pwa-helpers';
import { store } from '../../redux/store.js';
import './project-list-view.js'
import nanoid from 'nanoid';
import { Router } from '@vaadin/router';



import {
  addProject
} from '../../redux/actions.js';

class ProjectView extends connect(store)(LitElement) {
  static get properties() {
    return {
      projects   : { type: Array  },
      projectName: { type: String },
      subjectName: { type: String },
      factor1Name: { type: String },
      factor2Name: { type: String },
    };
  }


  stateChanged(state) {
    this.projects = state.projects;
    console.log(state.factor2Datas);
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
        <input type="text" id="project-name" placeholder="Project Name"      
      value="${this.projectName || ''}"
      @change="${this.updateProjectName}"
      />
        <label for="subject-name">Subject Name</label>
	<input type="text" id="subject-name" placeholder="Subject Name"      
      	value="${this.subjectName || ''}"
      	@change="${this.updateSubjectName}"
      	/>
      	
      	
      	<label for="factor1-name">Factor1 Name</label>
	<input type="text" id="factor1-name" placeholder="Factor1 Name"      
      	value="${this.factor1Name || ''}"
      	@change="${this.updateFactor1Name}"
      	/>
      	
      	<label for="factor2-name">Factor2 Name</label>
	<input type="text" id="factor2-name" placeholder="Factor2 Name"      
      	value="${this.factor2Name || ''}"
      	@change="${this.updateFactor2Name}"
      	/>
      	
        <button type="button" class="pure-button pure-button-primary" @click="${this.addProject}">Add new project</button>
    </fieldset>
</form>
    </div>
    `;
  }

  addProject() {
    let id = nanoid();
    if (this.projectName && 
      this.subjectName &&
      this.factor1Name &&
      this.factor2Name) {
      store.dispatch(addProject(
        id,
        this.projectName,
         this.subjectName,
         this.factor1Name,
         this.factor2Name));
         
         this.projectName='';
         this.subjectName='';
         this.factor1Name='';
         this.factor2Name='';
         Router.go("/factor1Config/"+id);
    }
    
  }

 

  updateProjectName(e) {
    this.projectName = e.target.value;
  }
  updateSubjectName(e) {
    this.subjectName = e.target.value;
  }
  updateFactor1Name(e) {
    this.factor1Name = e.target.value;
  }
  updateFactor2Name(e) {
    this.factor2Name = e.target.value;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('project-view', ProjectView);
