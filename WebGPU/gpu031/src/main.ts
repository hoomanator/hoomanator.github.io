import { LightInputs } from './shaders';
import { ParametricSurfaceData } from './surface-data';
import { SievertEnneper } from './math-func';
import { CreateSurfaceWithColormap } from './surface';
import $ from 'jquery';

const CreateSurface = async (li:LightInputs, isAnimation = true, colormapName = 'jet', scale = 2, scaley = 0.3) => {
    const data = ParametricSurfaceData(SievertEnneper, -Math.PI/2, Math.PI/2, 0.000001, Math.PI, 60, 200, -2, 2, -2, 2, scale, scaley, colormapName);
    await CreateSurfaceWithColormap(data?.vertexData!, data?.normalData!, data?.colorData!, li, isAnimation);
}

let li:LightInputs = {};
let isAnimation = true;
let colormapName = 'jet';
let scale = 2;
let scaley = 0.3;

CreateSurface(li, isAnimation, colormapName, scale, scaley);

$('#id-radio input:radio').on('click', function(){
    let val = $('input[name="options"]:checked').val();
    if(val === 'animation') isAnimation = true;
    else isAnimation = false;
    CreateSurface(li, isAnimation, colormapName, scale, scaley);
});

$('#btn-redraw').on('click', function(){
    li.isTwoSideLighting = $('#id-istwoside').val()?.toString();   
    scale = parseFloat($('#id-scale').val()?.toString()!);  
    scaley = parseFloat($('#id-scaley').val()?.toString()!);    
    CreateSurface(li, isAnimation, colormapName, scale, scaley);
});

$('#id-colormap').on('change',function(){
    const ele = this as any;
    colormapName = ele.options[ele.selectedIndex].text;
    CreateSurface(li, isAnimation, colormapName, scale, scaley);
});