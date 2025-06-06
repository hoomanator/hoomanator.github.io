# Step-by-Step WebGPU Graphics Programming (4) 
## Create a Triangle with different vertex color using GLSL Shader

SPIR-V (Standard Portable Intermediate Representation - V) is a binary intermediate language used for representing graphical shaders and compute kernels in the graphics and compute industry. It acts as a bridge between shader languages (like GLSL or HLSL) and hardware drivers, allowing for portability and flexibility in shader development. 

1. Write the shadering code using GLSL 4.5
2. Compile the shadering code into the SPIR-V binary using @webgpu/glsalng compiler

### Run nmp install to install all the packages

PS C:\Hooman\WebGPU\gpu004> npm install

### Update the index.html under dist directory
<!DOCTYPE html>
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <title>WebGPU Step-by-Step 4</title>
   <meta name="description" content="">
   <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
   <div>  
    <div class="grid">
      <div class="item1">
         <h1>Create Triangle using GLSL Shaders</h1><br>
      </div>
      <div class="item2">
         <canvas id="canvas-webgpu" width="640" height="480"></canvas>
      </div>
   </div>
   <script src="main.bundle.js"></script>
</body>
</html>

### install glsl compiler
npm i @webgpu/glslang

### Update shaders.ts under src folder
export const GlslShaders = () => {
    const vertex = `
        #version 450
        const vec2 pos[3] = vec2[3](
            vec2( 0.0f,  0.5f), 
            vec2(-0.5f, -0.5f), 
            vec2( 0.5f, -0.5f)
        );

        const vec3 color[3] = vec3[3](
            vec3(1.0f, 0.0f, 0.0f),
            vec3(0.0f, 1.0f, 0.0f),
            vec3(0.0f, 0.0f, 1.0f)
        );

        layout(location=0) out vec4 vColor;

        void main() {
            vColor = vec4(color[gl_VertexIndex], 1.0f);
            gl_Position = vec4(pos[gl_VertexIndex], 0.0, 1.0);
        }
    `;

    const fragment = `
        #version 450    
        layout(location=0) in vec4 vColor;
        layout(location=0) out vec4 fragColor;

        void main() {
            fragColor = vColor;
        }
    `;
return {vertex, fragment};
}

export const Shaders = () => {
    const vertex = `
        const pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(
            vec2<f32>(0.0, 0.5),
            vec2<f32>(-0.5, -0.5),
            vec2<f32>(0.5, -0.5)
        );

        const color : array<vec3<f32>, 3> = array<vec3<f32>, 3>(
            vec3<f32>(1.0, 0.0, 0.0),
            vec3<f32>(0.0, 1.0, 0.0),
            vec3<f32>(0.0, 0.0, 1.0)
        );

        [[builtin(position)]] var<out> Position : vec4<f32>;
        [[builtin(vertex_idx)]] var<in> VertexIndex : i32;
        [[location(0)]] var<out> vColor : vec4<f32>;

        [[stage(vertex)]]
        fn main() -> void {
            Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
            vColor = vec4<f32>(color[VertexIndex], 1.0);
            return;
        }
    `;

    const fragment = `
        [[location(0)]] var<in> vColor : vec4<f32>;
        [[location(0)]] var<out> fragColor : vec4<f32>;

        [[stage(fragment)]]
        fn main() -> void {
            fragColor = vColor;
            return;
        }
    `;
    return {vertex, fragment};
}

### Update main.ts file

import glslangModule from '@webgpu/glslang/dist/web-devel-onefile/glslang';
import { CheckWebGPU } from './helper';
import { GlslShaders } from './shaders';

const CreateTriangle = async () => {
    const checkgpu = CheckWebGPU();
    if(checkgpu.includes('Your current browser does not support WebGPU!')){
        console.log(checkgpu);
        throw('Your current browser does not support WebGPU!');
    }

    const glslang = await glslangModule() as any;

    const canvas = document.getElementById('canvas-webgpu') as HTMLCanvasElement;        
    const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;       
    const device = await adapter?.requestDevice() as GPUDevice;
    const context = canvas.getContext('webgpu') as unknown as GPUCanvasContext;
    const format = 'bgra8unorm';
    /*const swapChain = context.configureSwapChain({
        device: device,
        format: swapChainFormat,
    });*/
    context.configure({
        device: device,
        format: format,
    });
    
    const shader = GlslShaders();
    const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
            module: device.createShaderModule({                    
                code: glslang.compileGLSL(shader.vertex, 'vertex')
            }),
            entryPoint: "main"
        },
        fragment: {
            module: device.createShaderModule({                    
                code: glslang.compileGLSL(shader.fragment, 'fragment')
            }),
            entryPoint: "main",
            targets: [{
                format: format as GPUTextureFormat
            }]
        },
        primitive:{
            topology: "triangle-list"
        } 
    });

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
            view: textureView,
            clearValue: [0.5, 0.5, 0.8, 1], //background color
            loadOp: 'clear',
            storeOp: 'store'
        }]
    });
    renderPass.setPipeline(pipeline);
    renderPass.draw(3, 1, 0, 0);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
}

CreateTriangle();

### npm run prod
PS C:\Hooman\WebGPU\gpu004> npm run prod