import Handlebars from "handlebars";
import centeredFullscreen from './partials/centeredFullscreen/centeredFullscreen.prt.ts'
import input from './partials/input/input.prt.ts'
import button from './partials/button/button.prt.ts'
import link from './partials/link/link.prt.ts'

Handlebars.registerPartial('centeredFullscreen', centeredFullscreen);
Handlebars.registerPartial('input', input);
Handlebars.registerPartial('button', button);
Handlebars.registerPartial('link', link);