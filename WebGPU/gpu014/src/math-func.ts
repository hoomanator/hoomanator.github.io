import { vec3 } from 'gl-matrix';

export const CylinderPosition = (radius:number, theta:number, y:number, center:vec3 = [0,0,0]) => {
    let sn = Math.sin(theta*Math.PI/180);
    let cn = Math.cos(theta*Math.PI/180);
    return vec3.fromValues(radius*cn + center[0], y+center[1], -radius*sn + center[2]);
}

export const SpherePosition = (radius:number, theta:number, phi:number, center:vec3 = [0,0,0]) => {
    const snt = Math.sin(theta*Math.PI/180);
    const cnt = Math.cos(theta*Math.PI/180);
    const snp = Math.sin(phi*Math.PI/180);
    const cnp = Math.cos(phi*Math.PI/180);
    return vec3.fromValues(radius*snt*cnp + center[0], radius*cnt + center[1], -radius*snt*snp + center[2]);     
}