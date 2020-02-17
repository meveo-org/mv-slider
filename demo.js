import { LitElement, html, css } from "lit-element";
import "mv-container";
import "mv-font-awesome";
import "./mv-slider.js";

export class MvSliderDemo extends LitElement {
  static get properties() {
    return {
      theme: { type: String, attribute: true },
      open: { type: Boolean, attribute: true }
    };
  }

  static get styles() {
    return css`
       mv-container {
         --mv-container-min-width: 376px;
         --mv-container-min-height: 198px;
         --mv-container-margin: 20px auto;
         --mv-container-padding: 20px 30px; 
       }
        
       mv-fa[icon="lightbulb"] {
         font-size: 50px;
         cursor: pointer;
         margin: 20px;
       }
        
       .theme {
         display: flex;
         justify-content: flex-start;
       } 
       
       h3 {
         color: #A9A9A9;
       }
    `;
  }

  constructor() {
    super();
    this.open = false;
    this.theme = "dark";
  }

  render() {
    const styleContainer = this.open ? "" : "--mv-container-background: #3F4753";
    return html`
    <div class="theme">
      <mv-fa icon="lightbulb" style="color: ${this.open ? "yellow" : ""}" @click=${this.toggleLightBulb}></mv-fa>
    </div>
    <mv-container style="${styleContainer}">
      <h3>Default</h3>
      <mv-slider 
        .theme="${this.theme}"
        max="100"
      ></mv-slider>
    </mv-container>
    
    <mv-container style="${styleContainer}">
      <h3>Double</h3>
      <mv-slider 
        type="double" 
        .theme="${this.theme}"
        max="12.7"
      ></mv-slider>
    </mv-container>
    `;
  }

  toggleLightBulb = () => {
    this.open = !this.open;
    if (this.open) {
      this.theme = "light";
    } else {
      this.theme = "dark";
    }
  };
}

customElements.define("mv-slider-demo", MvSliderDemo);
