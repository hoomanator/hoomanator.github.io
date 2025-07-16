import { CreateShapeWithLight } from './light';
import { LightInputs } from './shaders';
import { ConeData } from './vertex_data';
import $ from 'jquery';

const CreateShape = async (li:LightInputs, rtop = 0.7, rbottom = 2, height = 2.5, n = 30, isAnimation = true) => {
    const data =ConeData(rtop, rbottom, height, n);
    await CreateShapeWithLight(data?.vertexData!, data?.normalData!, li, isAnimation);
}

let rtop = 0.7;
let rbottom = 2;
let height = 2.5;
let n = 30;
let li:LightInputs = {};
let isAnimation = true;

CreateShape(li,rtop, rbottom, height, n, isAnimation);

$('#id-radio input:radio').on('click', function(){
    let val = $('input[name="options"]:checked').val();
    if(val === 'animation') isAnimation = true;
    else isAnimation = false;
    CreateShape(li,rtop, rbottom, height, n, isAnimation);
});

$('#btn-redraw').on('click', function(){
    li.color = $('#id-color').val()?.toString();
    li.isPhong = $('#id-isphong').val()?.toString();
    li.ambientIntensity = $('#id-ambient').val()?.toString();
    li.diffuseIntensity = $('#id-diffuse').val()?.toString();
    li.specularIntensity= $('#id-specular').val()?.toString();
    li.shininess= $('#id-shininess').val()?.toString();
    li.specularColor = $('#id-scolor').val()?.toString();
    rtop = parseFloat($('#id-rtop').val()?.toString()!);
    rbottom = parseFloat($('#id-rbottom').val()?.toString()!);
    height = parseFloat($('#id-height').val()?.toString()!);
    n = parseInt($('#id-n').val()?.toString()!);
    CreateShape(li,rtop, rbottom, height, n, isAnimation);
});