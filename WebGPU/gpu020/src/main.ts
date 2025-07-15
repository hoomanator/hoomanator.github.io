import { CreateShapeWithLight } from './light';
import { LightInputs } from './shaders';
import { CylinderData } from './vertex_data';
import $ from 'jquery';

const CreateShape = async (li:LightInputs, rin = 0.7, rout = 1.5, height =3, n = 30, isAnimation = true) => {
    const data =CylinderData(rin, rout, height, n);
    await CreateShapeWithLight(data?.vertexData!, data?.normalData!, li, isAnimation);
}

let rin = 0.7;
let rout = 1.5;
let height = 3;
let n = 30;
let li:LightInputs = {};
let isAnimation = true;

CreateShape(li, rin, rout, height, n, isAnimation);

$('#id-radio input:radio').on('click', function(){
    let val = $('input[name="options"]:checked').val();
    if(val === 'animation') isAnimation = true;
    else isAnimation = false;
    CreateShape(li, rin, rout, height, n, isAnimation);
});

$('#btn-redraw').on('click', function(){
    li.color = $('#id-color').val()?.toString();
    li.isPhong = $('#id-isphong').val()?.toString();
    li.ambientIntensity = $('#id-ambient').val()?.toString();
    li.diffuseIntensity = $('#id-diffuse').val()?.toString();
    li.specularIntensity= $('#id-specular').val()?.toString();
    li.shininess= $('#id-shininess').val()?.toString();
    li.specularColor = $('#id-scolor').val()?.toString();
    rin = parseFloat($('#id-rin').val()?.toString()!);
    rout = parseFloat($('#id-rout').val()?.toString()!);
    height = parseFloat($('#id-height').val()?.toString()!);
    n = parseInt($('#id-n').val()?.toString()!);
    CreateShape(li, rin, rout, height, n, isAnimation);
});