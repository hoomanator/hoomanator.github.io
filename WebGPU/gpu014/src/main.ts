import { CreateWireframe } from './wireframe';
import { CylinderWireframeData } from './vertex_data';
import { vec3 } from 'gl-matrix';
import $ from 'jquery';

const Create3DObject = async (rin:number,rout:number, height:number, n:number, center:vec3, isAnimation:boolean) => {
    const wireframeData = CylinderWireframeData(rin, rout, height, n, center) as Float32Array;
    await CreateWireframe(wireframeData, isAnimation);
}

let rin = 0.5;
let rout = 1.5;
let height = 3;
let n = 20;
let center:vec3 = [0,0,0];
let isAnimation = true;

Create3DObject(rin, rout, height, n, center, isAnimation);

$('#id-radio input:radio').on('click', function(){
    let val = $('input[name="options"]:checked').val();
    if(val === 'animation') isAnimation = true;
    else isAnimation = false;
    Create3DObject(rin, rout, height, n, center, isAnimation);
});

$('#btn-redraw').on('click', function() {
    const val = $('#id-center').val();
    center = val?.toString().split(',').map(Number) as vec3;
    rin = parseFloat($('#id-rin').val()?.toString() as string);
    rout = parseFloat($('#id-rout').val()?.toString() as string);
    height = parseFloat($('#id-height').val()?.toString() as string);
    n = parseInt($('#id-n').val()?.toString() as string);
    Create3DObject(rin, rout, height, n, center, isAnimation);
});