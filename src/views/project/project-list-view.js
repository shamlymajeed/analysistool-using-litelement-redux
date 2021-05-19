import { LitElement, html } from 'lit-element';
import { connect          } from 'pwa-helpers';
import { store            } from '../../redux/store.js';

class ProjectListView extends connect(store)(LitElement) {
 
  static get properties() {
      return {
        projects   : { type: Array  }      };
  }
  

  constructor(){
    super();
    this.projects = [];
  }

  stateChanged(state) {
    this.projects = state.projects;
  }

  render() {
    return html`
    <!-- TODO: bad practice. Change this ---> 
    <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.1/build/pure-min.css"> 
    <!-- ./ TODO: bad practice. Change this ---> 
    <table class="pure-table">
      <thead>
      <tr><td>Project id ${this.projectName}</td><td>Project Name</td><td>Subject Name</td><td>Factor1 Name</td><td>Factor2 Name</td><td>Actions</td></tr>
      </thead>
      <tbody>
        ${
          this.projects.map(project => html`
            <tr>
            <td>${project.id}</td>
            <td>${project.projectName}</td>
            <td>${project.subjectName}</td>
            <td>${project.factor1Name}</td>
            <td>${project.factor2Name}</td>
            <td><a href='/project/run/${project.id}'>Run Analysis</a></td>
            </tr>
            `
          )
        }
      </tbody>
    </table>
    `;
  }
}

customElements.define('project-list-view', ProjectListView);
