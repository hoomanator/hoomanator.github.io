import { LightInputs } from './shaders';
import { ParametricSurfaceData } from './surface-data';
import { Seashell } from './math-func';
import { CreateSurfaceWithColormap } from './surface';
import $ from 'jquery';

const CreateSurface = async (li:LightInputs, isAnimation = true, colormapName = 'jet', scale = 2, scaley = 0) => {
    const data = ParametricSurfaceData(Seashell, 0, 6*Math.PI, 0, 2*Math.PI, 200, 40, -4, 4, -4, 4, scale, scaley, colormapName);
    await CreateSurfaceWithColormap(data?.vertexData!, data?.normalData!, data?.colorData!, li, isAnimation);
}

let li:LightInputs = {};
let isAnimation = true;
let colormapName = 'jet';
let scale = 2;
let scaley = 0;

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