# Step-by-Step WebGPU Graphics Programming (2) 

## Set Up a single triangle

### Run nmp install to install all the packages

PS C:\Hooman\WebGPU\gpu002> npm install

### Update the index.html under dist folder
<!DOCTYPE html>
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <title>WebGPU Step-by-Step 2</title>
   <meta name="description" content="">
   <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
   <div>
      <h1>Create Triangle</h1><br>
      <label> Color:</label>
      <input type="text" id="id-color" value="(1.0,1.0,1.0,1.0)">
      <button type="button" id="id-btn">Change Color</button>
      <br><br>
      <canvas id="canvas-webgpu" width="640" height="480"></canvas>
   </div>
   <script src="main.bundle.js"></script>
</body>
</html>

### Create shaders.ts under src folder

export const Shaders = (color:string) => {
    const vertex = `
        @vertex
        fn main(@builtin(vertex_index) VertexIndex: u32) -> @builtin(position) vec4<f32> {
            var pos = array<vec2<f32>, 3>(
                vec2<f32>(0.0, 0.5),
                vec2<f32>(-0.5, -0.5),
                vec2<f32>(0.5, -0.5));
            return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
        }
    `;

    const fragment = `
        @fragment
        fn main() -> @location(0) vec4<f32> {
            return vec4<f32>${color};
        }
    `;
    return {vertex, fragment};
}

export const Shaders1 = (color:string) => {
    const vertex = `
        var pos = array<vec2<f32>, 3>(
            vec2<f32>(0.0, 0.5),
            vec2<f32>(-0.5, -0.5),
            vec2<f32>(0.5, -0.5));

        [[stage(vertex)]]
        fn main([[builtin(vertex_index)]] VertexIndex: u32) -> [[builtin(position)]] vec4<f32> {
            return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
        }
    `;

    const fragment = `
        [[stage(fragment)]]
        fn main() -> [[location(0)]] vec4<f32> {
            return vec4<f32>${color};
        }
    `;
    return {vertex, fragment};
}

export const ShadersOld = (color:string) => {
    const vertex = `
        const pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(
            vec2<f32>(0.0, 0.5),
            vec2<f32>(-0.5, -0.5),
            vec2<f32>(0.5, -0.5));

        [[builtin(position)]] var<out> Position : vec4<f32>;
        [[builtin(vertex_idx)]] var<in> VertexIndex : i32;

        [[stage(vertex)]]
        fn main() -> void {
            Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
            return;
        }
    `;

    const fragment = `
        [[location(0)]] var<out> outColor : vec4<f32>;

        [[stage(fragment)]]
        fn main() -> void {
            outColor = vec4<f32>${color};
            return;
        }
    `;
    return {vertex, fragment};
}

### Update main.ts
import $ from 'jquery';
import { CheckWebGPU } from './helper';
import { Shaders } from './shaders';

const CreateTriangle = async (color='(1.0,1.0,1.0,1.0)') => {
    const checkgpu = CheckWebGPU();
    if(checkgpu.includes('Your current browser does not support WebGPU!')){
        console.log(checkgpu);
        throw('Your current browser does not support WebGPU!');
    }

    const canvas = document.getElementById('canvas-webgpu') as HTMLCanvasElement;        
    const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;       
    const device = await adapter?.requestDevice() as GPUDevice;
    const context = canvas.getContext('webgpu') as unknown as GPUCanvasContext;
    const format = 'bgra8unorm';
    /*const swapChain = context.configureSwapChain({
        device: device,
        format: format,
    });*/    
    context.configure({
        device: device,
        format: format,
        alphaMode: 'opaque'
    });
    
    const shader = Shaders(color);
    const pipeline = device.createRenderPipeline({
        layout:'auto',
        vertex: {
            module: device.createShaderModule({                    
                code: shader.vertex
            }),
            entryPoint: "main"
        },
        fragment: {
            module: device.createShaderModule({                    
                code: shader.fragment
            }),
            entryPoint: "main",
            targets: [{
                format: format as GPUTextureFormat
            }]
        },
        primitive:{
           topology: "triangle-list",
        }
    });

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
            view: textureView,
            clearValue: { r: 0.5, g: 0.5, b: 0.8, a: 1.0 }, //background color
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
$('#id-btn').on('click', ()=>{
    const color = $('#id-color').val() as string;
    CreateTriangle(color);
});


### Package it up in main.bundle.js with webpack
Run npm run prod in the terminal
Run npm audit fix if you run into some problems.

### Live Server
Right click on index.html and run with Live Server (Go Live link at the status bar works as well)