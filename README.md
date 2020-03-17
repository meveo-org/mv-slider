# mv-slider

 MvSlider is a Meveo slider component based on lit-element.

## Quick Start

To experiment with the MvSlider component.

1. Clone this repo.

2. Serve the project from the root directory with some http server (best served with meveo itself)

3. Update the slider demo component in demo.js file

The `mv-slider` has:
 - 2 `type` variants:
```
default, double
```
- 2 `theme` variants:
```
dark, light
```
## Sample usage

```html
<mv-slider 
  width="300"                           //the width for the slider
  type="double"                         //use the default or double slider
  .theme="${theme}"                     //toggle the light and dark theme mode
  max="12.7"                            //the max value for the slider
  @silder-change="${this.changeValue}"  //custom event dispatched when the silder value is changed
></mv-slider>    
```

You can also check this [demo](https://slider.meveo.org/)