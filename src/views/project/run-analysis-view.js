import { LitElement, html, css } from 'lit-element';
import { connect          } from 'pwa-helpers';
import { store            } from '../../redux/store.js';
import { Router           } from '@vaadin/router';
import { addFactor1Config } from '../../redux/actions.js';

class RunAnalysisView extends connect(store)(LitElement) {



  connectedCallback() {
    super.connectedCallback();
	}

  static get styles() {
    return css`
      table { 
        width: 500px;
        height: 250px;
       }

       table td{
         font-size: 70px;
         font-weight:bold;
         color: #CECECE;
       }

       table td .conftxt{
        font-size: 15px;
        color: blue;
      }
    `;
  }

  static get properties() {
    return {
      project           : { type  : Object  },
      factor1Config     : { type  : Object  },
      splittedConfigs   : { type  : Object  },
      factor1Data       : { type  : Array   },
      factor2Data       : { type  : Array   },
      subjectsUnderLow  : { type  : Array   },
      subjectsUnderHigh : { type  : Array   },
      factor1Lowfactor2LowSigma:{type: Number},
      factor1Lowfactor2HighSigma:{type: Number},
      factor1Highfactor2LowSigma:{type: Number},
      factor1Highfactor2HighSigma:{type: Number},
      pos_00 :  {type: Number},
      pos_01 :  {type: Number},
      pos_10 :  {type: Number},
      pos_11 :  {type: Number},

    };
  }

  constructor(){
    super();
    this.subjectsUnderHigh = [];
    this.subjectsUnderLow = [];
    this.factor1Lowfactor2LowSigma = 0;
    this.factor1Lowfactor2HighSigma = 0;
    this.factor1Highfactor2LowSigma = 0;
    this.factor1Highfactor2HighSigma = 0;
    this.pos_00 = 0;
    this.pos_01 = 0;
    this.pos_10 = 0;
    this.pos_11 = 0;
  }

  stateChanged(state) {
    this.projectId =  this.location.params.projectId;
    this.project        = state.projects.find(e=>e.id==this.projectId);
    this.factor1Config  = state.factor1Configs.find(e=>e.projectId==this.projectId);
    this.factor1Data    = state.factor1Datas.find(e=>e.projectId==this.projectId);
    this.factor2Data    = state.factor2Datas.find(e=>e.projectId==this.projectId);
    this.startAnalysis();
  }

render() {
    return html`
    <div class="input-layout" @keyup="${this.shortcutListener}">
    
          <label for="run-analysis">Run Analysis</label>

          <table>
          <tr><td rowspan='3'><span class="conftxt">
          <br/>
          High
          <br/>
      ${this.project.factor2Name} 
          <br/>
          <br/>
          Low
          <span>
          </td><td colspan='2'>
          <center>
          <span class="conftxt">LOW <-----${this.project.factor1Name} ---------> High</span></td>
          </center>
          </tr>
          <tr ><td border="1"> ${this.pos_10} %</td><td border="1"> ${this.pos_11} %</td></tr>
          <tr ><td border="1">${this.pos_00} %</td><td border="1"> ${this.pos_01} % </td>
          </tr></table>
    </div>
    `;
}

startAnalysis(){
  //step1 
  this.groupLowAndHighSubjects();

  //step2
  this.computeAverageOfFactor2Data();
  //step3
  this.percentageCalc();
}


percentageCalc(){
  this.pos_00 = (this.factor1Lowfactor2LowSigma/(this.factor1Lowfactor2LowSigma+this.factor1Lowfactor2HighSigma));
  this.pos_00 = Number(this.pos_00).toFixed(2) * 100;

  this.pos_10 = (this.factor1Lowfactor2HighSigma/(this.factor1Lowfactor2LowSigma+this.factor1Lowfactor2HighSigma));
  this.pos_10 = Number(this.pos_10).toFixed(2) * 100;

  this.pos_01 = (this.factor1Highfactor2LowSigma/(this.factor1Highfactor2LowSigma+this.factor1Highfactor2HighSigma));
  this.pos_01 = Number(this.pos_01).toFixed(2) * 100;

  this.pos_11 = (this.factor1Highfactor2HighSigma/(this.factor1Highfactor2LowSigma+this.factor1Highfactor2HighSigma));
  this.pos_11 = Number(this.pos_11).toFixed(2) * 100;


}

computeAverageOfFactor2Data(){

  let factor2DataUnderLowSubjects = this.factor2Data.factor2Data.filter(e=>this.subjectsUnderLow.includes(e.subject));
  let factor2DataUnderHighSubjects = this.factor2Data.factor2Data.filter(e=>this.subjectsUnderHigh.includes(e.subject));

  //assigning sum value of factor2
  factor2DataUnderLowSubjects.forEach(e=>{
    this.factor1Lowfactor2LowSigma = parseInt(e.factor2LowValue)+parseInt(this.factor1Lowfactor2LowSigma);
    this.factor1Lowfactor2HighSigma =parseInt(e.factor2HighValue)+parseInt(this.factor1Lowfactor2HighSigma);
  });

  factor2DataUnderHighSubjects.forEach(e=>{
    this.factor1Highfactor2LowSigma = parseInt(e.factor2LowValue)+parseInt(this.factor1Highfactor2LowSigma);
    this.factor1Highfactor2HighSigma =parseInt(e.factor2HighValue)+parseInt(this.factor1Highfactor2HighSigma);
  });

}

groupLowAndHighSubjects(){

  let lowValues   = this.factor1Config.lowValues;
  let highValues  = this.factor1Config.highValues;

        lowValues.forEach(function(entry){ 
          var values = entry.split('-');
          this.factor1Data.factor1Data.forEach(function(e) {
              if(e.factor1Value > values[0] && e.factor1Value <= values[1]){
                this.subjectsUnderLow.push(e.subject);
              }
          },this);
        },this);

        highValues.forEach(function(entry){ 
          var values = entry.split('-');
          this.factor1Data.factor1Data.forEach(function(e) {
              if(e.factor1Value > values[0] && e.factor1Value <= values[1]){
                this.subjectsUnderHigh.push(e.subject);
                  }
              },this);  
          },this);   
      }


}

customElements.define('run-analysis-view', RunAnalysisView);