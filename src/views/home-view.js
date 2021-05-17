import { LitElement, html, css } from 'lit-element';

import {BaseView} from './base-view';

class HomeView extends BaseView{


  render() {
    return html`
    <div>
    <p>Welcome to <b><i>Analysis Tool</i></b> using 2x2 Matrix</p>
    <p>Analysis tool is to compare 2 factors of an instution or a company to know how it affects each other.</p>
  </div>
    `;
  }
}

customElements.define('home-view', HomeView);
