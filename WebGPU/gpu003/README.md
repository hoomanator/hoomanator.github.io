# Step-by-Step WebGPU Graphics Programming (3) 
## Create a Triangle with different vertex color

### Run nmp install to install all the packages

PS C:\Hooman\WebGPU\gpu003> npm install

### Update the index.html under dist folder
<!DOCTYPE html>
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <title>WebGPU Step-by-Step 3</title>
   <meta name="description" content="">
   <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
   <div>  
      <h1>Create Triangle with vertex color</h1><br>
     
      <canvas id="canvas-webgpu" width="640" height="480"></canvas>
    </div>

   <script src="main.bundle.js"></script>
</body>
</html>

### Update the shaders.ts under src folder
export const Shaders = () => {
    const vertex = `
        struct Output {
            [[builtin(position)]] Position : vec4<f32>;
            [[location(0)]] vColor : vec4<f32>;
        };

        [[stage(vertex)]]
        fn main(@builtin(vertex_index) VertexIndex: u32) -> Output {
            var pos = array<vec2<f32>, 3>(
                vec2<f32>(0.0, 0.5),
                vec2<f32>(-0.5, -0.5),
                vec2<f32>(0.5, -0.5));

                var color = array<vec3<f32>, 3>(
                vec2<f32>(1.0, 0.0, 0.0),
                vec2<f32>(0.0, 1.0, 0.0),
                vec2<f32>(0.0, 0.0, 1.0));

             var output: Output;
            output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
            output.vColor = vec4<f32>(color[VertexIndex], 1.0);
            return output;
        }
    `;

    const fragment = `
         [[stage(fragment)]]
        fn main([[location(0)]] vColor: vec4<f32>) -> [[location(0)]] vec4<f32> {
            return vColor;
        }
    `;
    return {vertex, fragment};
}

### Update main.ts
import $ from 'jquery';
import { CheckWebGPU } from './helper';
import { Shaders } from './shaders';

const CreateTriangle = async () => {
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
    
    const shader = Shaders();
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

### run npm audit fix

### run npm run prod



