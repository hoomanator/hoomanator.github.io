import { ParametricSurfaceData } from './surface-data';
import { Wellenkugel } from './math-func';
import { CreateSurfaceWithColormap, LightInputs } from './surface';
import $ from 'jquery';
import "./site.css";

const CreateSurface = async (li:LightInputs, isAnimation = true, colormapName = 'jet', scale = 1.5, scaley = 0) => {
    const data = ParametricSurfaceData(Wellenkugel, 0, 14.5, 0, 5, 100, 50, -10, 10, -10, 10, scale, scaley, colormapName);
    await CreateSurfaceWithColormap(data?.vertexData!, data?.normalData!, data?.colorData!, li, isAnimation);
}

let li:LightInputs = {};
let isAnimation = true;
let colormapName = 'jet';
let scale = 1.5;
let scaley = 0;

CreateSurface(li, isAnimation, colormapName, scale, scaley);

$('#id-radio input:radio').on('click', function(){
    let val = $('input[name="options"]:checked').val();
    if(val === 'animation') isAnimation = true;
    else isAnimation = false;
    CreateSurface(li, isAnimation, colormapName, scale, scaley);
});

$('#btn-redraw').on('click', function(){
    li.isTwoSideLighting = parseFloat($('#id-istwoside').val()?.toString()!);   
    scale = parseFloat($('#id-scale').val()?.toString()!);  
    scaley = parseFloat($('#id-scaley').val()?.toString()!);    
    CreateSurface(li, isAnimation, colormapName, scale, scaley);
});

$('#id-colormap').on('change',function(){
    const ele = this as any;
    colormapName = ele.options[ele.selectedIndex].text;
    CreateSurface(li, isAnimation, colormapName, scale, scaley);
});