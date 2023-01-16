import { LitElement, html, css } from "lit-element";
import "@meveo-org/mv-container";
import "./mv-slider.js";

export class MvSliderDemo extends LitElement {
  static get properties() {
    return {
      theme: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }

      mv-container {
        --mv-container-min-width: 376px;
        --mv-container-min-height: 198px;
        --mv-container-margin: 20px auto;
        --mv-container-padding: 20px 30px;
      }

      fieldset > label, label > input {
        cursor: pointer;
      }

      fieldset {
        width: 120px;
        margin-left: 10px;
        border: 2px solid red;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        color: #818181;
      }

      legend {
        font-weight: 500;
        color: red;
      }
    `;
  }

  constructor() {
    super();
    this.theme = "dark";
  }

  render() {
    const { theme } = this;
    return html`
      <fieldset>
        <legend>Theme</legend>
        <label
          ><input
            type="radio"
            name="theme"
            value="light"
            @change="${this.changeTheme}"
          />Light</label
        >
        <label
          ><input
            type="radio"
            name="theme"
            value="dark"
            checked
            @change="${this.changeTheme}"
          />Dark</label
        >
      </fieldset>
      <mv-container .theme="${theme}">
        <h3>Default</h3>
        <mv-slider 
          width="324"
          .theme="${theme}"
          max="100"
        ></mv-slider>
      </mv-container>

      <mv-container .theme="${theme}">
        <h3>Double</h3>
        <mv-slider
          width="324"
          type="double"
          .theme="${theme}"
          max="12.7"
          @silder-change="${this.changeValue}"
        ></mv-slider>
      </mv-container>
    `;
  }

  changeTheme = originalEvent => {
    const {
      target: { value }
    } = originalEvent;
    this.theme = value;
  };

  changeValue = originalEvent => {
    const {
      detail: { value }
    } = originalEvent;
    console.log(value);
  };
}

customElements.define("mv-slider-demo", MvSliderDemo);
