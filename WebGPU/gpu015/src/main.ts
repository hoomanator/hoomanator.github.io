import { CreateWireframe } from './wireframe';
import { ConeWireframeData } from './vertex_data';
import { vec3 } from 'gl-matrix';
import $ from 'jquery';

const Create3DObject = async (rtop:number, rbottom:number, height:number, n:number, center:vec3, isAnimation:boolean) => {
    const wireframeData = ConeWireframeData(rtop, rbottom, height, n, center) as Float32Array;
    await CreateWireframe(wireframeData, isAnimation);
}

let rtop= 0.5;
let rbottom = 2;
let height = 3;
let n = 20;
let center:vec3 = [0,0,0];
let isAnimation = true;

Create3DObject(rtop, rbottom, height, n, center, isAnimation);

$('#id-radio input:radio').on('click', function(){
    let val = $('input[name="options"]:checked').val();
    if(val === 'animation') isAnimation = true;
    else isAnimation = false;
    Create3DObject(rtop, rbottom, height, n, center, isAnimation);
});

$('#btn-redraw').on('click', function(){
    const val = $('#id-center').val();
    center = val?.toString().split(',').map(Number) as vec3;
    rtop = parseFloat($('#id-rtop').val()?.toString() as string);
    rbottom = parseFloat($('#id-rbottom').val()?.toString() as string);
    height = parseFloat($('#id-height').val()?.toString() as string);
    n = parseInt($('#id-n').val()?.toString() as string);
    Create3DObject(rtop, rbottom, height, n, center, isAnimation);
});