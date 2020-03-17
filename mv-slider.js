import { LitElement, html, css } from "lit-element";
import "mv-tooltip";

export class MvSlider extends LitElement {
  static get properties() {
    return {
      leftSliderValue: { type: Number },
      rightSliderValue: { type: Number },
      defaultSliderValue: { type: Number },
      max: { type: Number, attribute: true },

      //  valid type: values are: "default", "double"
      //    default: "default"
      type: { type: String, attribute: true },

      //  valid theme values are: "light", "dark"
      //    default: "dark"
      theme: { type: String, attribute: true },
      width: { type: Number, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
        --mv-slider-font-family: var(--font-family, MuseoSans);
        --mv-slider-font-size: var(--font-size-m, 16px);
        --track-light-background: var(--mv-slider-track-light-background, linear-gradient(to left, #F01F14, #00F2FE));
        --track-dark-background: var(--mv-slider-track-dark-background);
        --light-color: var(--mv-slider-light-color, #818181);
        --dark-color: var(--mv-slider-dark-color);
        --input-width: var(--mv-slider-input-width, 24px);
        --input-height: var(--mv-slider-input-height, 24px);
        --border-input-light-color: var(--mv-slider-border-input-light-color, 1px solid #27539B);
        --border-input-dark-color: var(--mv-slider-border-input-dark-color);
        --thumb-light-background: var(--mv-slider-thumb-light-background, #FFFFFF);
        --thumb-dark-background: var(--mv-slider-thumb-dark-background);
        --tooltip-light-border: var(--mv-slider-tooltip-light-border);
        --tooltip-dark-border: var(--mv-slider-tooltip-dark-border, #00F2FE);
      }

      .slider {
        font-family: var(--mv-slider-font-family);
        font-size: var(--mv-slider-font-size);
        position: relative;
        width: var(--width, 324px);
        height: var(--height, 7px);
        margin: 60px auto 20px;
      }

      input {
        pointer-events: none;
        -webkit-appearance: none;
        position: absolute;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -webkit-transition: .2s;
        transition: opacity .2s;
        left: 0;
        top: 15px;
        width: 100%;
        height: 7px;
        outline: none;
        margin: 0;
        padding: 0;
        border-radius: 8px;
        background: #d3d3d3;
      }

      input::-webkit-slider-thumb {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        pointer-events: auto;
        position: relative;
        z-index: 100;
        outline: 0;
        -webkit-appearance: none;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background-color: var(--thumb-background-color, #3F4753);
        border: var(--border-input-color, 1px solid #00F2FE);
        cursor: pointer;
      }

      input::-moz-range-thumb {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        pointer-events: auto;
        position: relative;
        z-index: 100;
        outline: 0;
        -webkit-appearance: none;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background-color: var(--thumb-background-color, #3F4753);
        border: var(--border-input-color, 1px solid #00F2FE);
        cursor: pointer;
      }

      .tooltip {
        position: absolute;
        top: -2.5em;
        height: 1em;
        font-weight: bold;
        white-space: nowrap;
        margin-top: 50px;
        margin-left: 10px;
      }

      .progress {
        position: absolute;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        left: 0;
        top: 15px;
        height: 7px;
        outline: none;
        margin: 0;
        padding: 0;
        border-radius: 0;
        background: var(--track-background, linear-gradient(to left, #4FACFE, #00F2FE));
      }

      .progress1 {
        border-radius: 0 8px 8px 0;
      }

      .min {
        position: absolute;
        left: 0;
        top: 45px;
        color: var(--color, #A9A9A9);
      }

      .max {
        position: absolute;
        right: 0;
        top: 45px;
        color: var(--color, #A9A9A9);
      }

      mv-tooltip {
        --mv-tooltip-min-width: 47px;
        --mv-tooltip-height: 26px;
        --mv-tooltip-content-font-size: var(--mv-slider-font-size);
        --mv-tooltip-border: var(--tooltip-border);
      }

      .thumb2 {
        background: none;
      }

      .light {
        --track-background: var(--track-light-background);
        --color: var(--light-color);
        --border-input-color: var(--border-input-light-color);
        --thumb-background-color: var(--thumb-light-background);
        --tooltip-border: var(--tooltip-light-border);
      }

      .dark {
        --track-background: var(--track-dark-background);
        --color: var(--dark-color);
        --border-input-color: var(--border-input-dark-color);
        --thumb-background-color: var(--thumb-dark-background);
        --tooltip-border: var(--tooltip-dark-border);
      }
   `;
  }

  constructor() {
    super();
    this.leftSliderValue = 0;
    this.rightSliderValue = 100;
    this.defaultSliderValue = 0;
    this.type = "default";
    this.width = 324;
    this.max = 100;
    this.theme = "dark";
  }

  renderSliderDefault() {
    const { width, defaultSliderValue, max } = this;
    const currentValue = (max * defaultSliderValue) / 100;
    const formattedCurrentValue = Number.isInteger(currentValue)
      ? currentValue
      : currentValue.toFixed(1);
    const leftProgress = (this.defaultSliderValue * (width - 24)) / 100;
    const widthProgress = width - leftProgress;

    return html`
      <div class="slider ${this.theme}" style="--width: ${width}px">
        <input
          value="0"
          min="0"
          max="100"
          type="range"
          @input="${this.inputChangeDefault}"
        />
        <span
          class="progress progress1"
          style="width: ${widthProgress - 24}px; left: ${leftProgress + 24}px"
        ></span>
        <span class="tooltip" style="left: ${leftProgress}px">
          <mv-tooltip
            position="top"
            open="true"
            .noAutoClose=${true}
            .theme="${this.theme}"
          >
            <div slot="tooltip-content">${formattedCurrentValue}</div>
          </mv-tooltip>
        </span>
        <div class="min">0</div>
        <div class="max">${max}</div>
      </div>
    `;
  }

  renderSliderDouble() {
    const { width, leftSliderValue, rightSliderValue, max } = this;
    const maxTrack = (width - 24) / 100;
    const widthTrack = width - (width - rightSliderValue * maxTrack + leftSliderValue * maxTrack);
    const leftTrack = leftSliderValue * maxTrack;
    const rightTrack = rightSliderValue * maxTrack;
    const currentLeftValue = (max * leftSliderValue) / 100;
    const currentRightValue = (max * rightSliderValue) / 100;
    const formattedCurrentLeftValue = Number.isInteger(currentLeftValue)
      ? currentLeftValue
      : currentLeftValue.toFixed(1);
    const formattedCurrentRightValue = Number.isInteger(currentRightValue)
      ? currentRightValue
      : currentRightValue.toFixed(1);

    return html`
      <div class="slider ${this.theme}" style="--width: ${width}px">
        <input
          class="thumb1"
          value="0"
          min="0"
          max="100"
          type="range"
          @input="${this.inputChangeDouble}"
        />
        <input
          class="thumb2"
          value="100"
          min="0"
          max="100"
          type="range"
          @input="${this.inputChangeDouble}"
        />
        <span
          class="progress"
          style="width: ${widthTrack - 24}px; left: ${leftTrack + 24}px"
        ></span>

        <span class="tooltip" style="left: ${leftTrack}px;">
          <mv-tooltip
            position="top"
            open="true"
            .noAutoClose=${true}
            .theme="${this.theme}"
          >
            <div slot="tooltip-content">${formattedCurrentLeftValue}</div>
          </mv-tooltip>
        </span>
        <span class="tooltip" style="left: ${rightTrack}px">
          <mv-tooltip
            position="top"
            open="true"
            .noAutoClose=${true}
            .theme="${this.theme}"
          >
            <div slot="tooltip-content">${formattedCurrentRightValue}</div>
          </mv-tooltip>
        </span>
        <div class="min">0</div>
        <div class="max">${this.max}</div>
      </div>
    `;
  }

  render() {
    if (this.type === "default") {
      return html`
        ${this.renderSliderDefault()}
      `;
    }
    if (this.type === "double") {
      return html`
        ${this.renderSliderDouble()}
      `;
    }
  }

  inputChangeDefault = () => {
    const sliders = this.renderRoot.querySelectorAll("input[type=range]");
    this.defaultSliderValue = parseInt(sliders[0].value);
    this.dispatchEvent(
      new CustomEvent("silder-change", {
        detail: { value: this.defaultSliderValue }
      })
    );
  };

  inputChangeDouble = () => {
    const sliders = this.renderRoot.querySelectorAll("input[type=range]");
    var leftSliderValue = parseInt(sliders[0].value);
    var rightSliderValue = parseInt(sliders[1].value);
    if (leftSliderValue >= rightSliderValue) {
      sliders[0].value = rightSliderValue;
    }
    if (rightSliderValue <= leftSliderValue) {
      sliders[1].value = leftSliderValue;
    }
    this.leftSliderValue = leftSliderValue;
    this.rightSliderValue = rightSliderValue;

    this.dispatchEvent(
      new CustomEvent("silder-change", {
        detail: {
          value: { left: this.leftSliderValue, right: this.rightSliderValue }
        }
      })
    );
  };
}

customElements.define("mv-slider", MvSlider);
