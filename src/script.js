/*

Instructions to run:
--> npm install
--> npm run dev

Keyboard controls:
1. Use key ‘m’ to toggle between scenes (i.e. between a scene of spheres and that of cylinders)

2. Use key ’s’ to toggle between Gouraud and Phong shading
   --> Gouraud shading is set as the default shader for all meshes

3. Use key ‘l’ to toggle between '1 light source scenario' and '2 light sources scenario'

4. The checkerboard texture (present in static/textures/checkerboard.png) has been used to perform Spherical and Cylindrical texture mapping.
   Use key ’t’ for looping over the scenarios of 'no texture mapping', followed by 'Spherical texture mapping', followed by 'Cylindrical texture mapping'...

Note: Different models have been used in addition to the spheres and cylinders for demonstrating Spherical and Cylindrical texture mapping.

*/


import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui'
import { Sphere } from "./sphere.js";
import { Cylinder } from "./cylinder.js";

import gouraudVertexShader from "./gouraudVertexShader.glsl.js";
import gouraudFragmentShader from "./gouraudFragmentShader.glsl.js";
import phongVertexShader from "./phongVertexShader.glsl.js";
import phongFragmentShader from "./phongFragmentShader.glsl.js";

// http://www.realtimerendering.com/erich/udacity/exercises/unit3_specular_demo.html

 
const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const gui = new dat.GUI();

const sizes = {
  width: 900,
  height: 900,
};

var scene_type = 'spheres'


const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.001, 1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;
scene.add(camera);

//Lighting:
var PointLight1 = {
  lightPos : new THREE.Vector3(-10, 25, 10),
  diffuseColor : new THREE.Vector4(1.0,1.0,1.0,1.0),
  specularColor : new THREE.Vector4(1.0,1.0,1.0,1.0),

  a : 0.01,
  b : 0.01,
  c : 0.0009
};

var PointLight2 = {
  lightPos : new THREE.Vector3(10, -25, 10),
  diffuseColor : new THREE.Vector4(1.0,1.0,1.0,1.0),
  specularColor : new THREE.Vector4(1.0,1.0,1.0,1.0),

  a : 0.01,
  b : 0.01,
  c : 0.0009
};

var num_lights = 1
var max_num_lights = 2
var tex_mapping_mode = 0

//creating 9 spheres:
var spheres = []

spheres.push(new Sphere(camera, scene, 0.4, [3,-3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.1, 0.2, 1.0, 15, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
spheres.push(new Sphere(camera, scene, 0.4, [0.5,-3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.1, 0.2, 0.7, 40, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
spheres.push(new Sphere(camera, scene, 0.4, [-2,-3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.1, 0.2, 0.01, 100, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
spheres.push(new Sphere(camera, scene, 0.4, [3,0,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.4, 0.5, 0.9, 15, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
spheres.push(new Sphere(camera, scene, 0.4, [0.5,0,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.4, 0.5, 0.7, 40, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
spheres.push(new Sphere(camera, scene, 0.4, [-2,0,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.4, 0.5, 0.01, 100, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
spheres.push(new Sphere(camera, scene, 0.4, [3,3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.8, 0.9, 0.9, 40, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
spheres.push(new Sphere(camera, scene, 0.4, [0.5,3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.6, 0.9, 0.7, 80, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
spheres.push(new Sphere(camera, scene, 0.4, [-2,3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.5, 0.9, 0.01, 100, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))

//Creating 9 cylinders:
var cylinders = []
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [3,-3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.1, 0.2, 1.0, 2, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [0.5,-3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.3, 0.2, 0.7, 3, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [-2,-3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.5, 0.2, 0.01, 4, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [3,0,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.1, 0.5, 1.0, 4, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [0.5,0,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.3, 0.5, 0.7, 5, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [-2,0,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.5, 0.5, 0.01, 6, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [3,3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.1, 0.9, 1.0, 5, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [0.5,3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.3, 0.9, 0.7, 6, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))
cylinders.push(new Cylinder(camera, scene, 0.3, 0.8, [-2,3,0], [2.5, 2.5, 2.5], [1.0,0.0,0.0,1.0], 0.5, 0.9, 0.01, 7, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode))

var i;
for(i=0;i<spheres.length;i++)
{
  scene.add(spheres[i].sphereMesh)
}

// Controls
let mouseCntrl = {
  "controlsEnabled": true
}
let controls;
gui.add(mouseCntrl, "controlsEnabled").name("Enable Controls");

controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enabled = true;


//Renderer:
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setClearColor( 0xffffff, 0 );
renderer.physicallyBasedShading = true;
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; 


document.addEventListener("keydown", event => {
  ////console.log(event);
  if (event.key == "m")
  {
    if(scene_type == 'spheres')
    {
      scene_type = 'cylinders'
      var i
      for(i=0;i<spheres.length;i++)
      {
        scene.remove(spheres[i].sphereMesh)
      }
      for(i=0;i<cylinders.length;i++)
      {
        scene.add(cylinders[i].cylinderMesh)
      }
    }
    else if(scene_type == 'cylinders')
    {
      scene_type = 'spheres'
      var i
      for(i=0;i<cylinders.length;i++)
      {
        scene.remove(cylinders[i].cylinderMesh)
      }
      for(i=0;i<spheres.length;i++)
      {
        scene.add(spheres[i].sphereMesh)
      }
    }
  }

  if(event.key == "s")
  {
    if(scene_type == 'spheres')
    {
      var i;
      for(i=0;i<spheres.length;i++)
      {
        if(spheres[i].tex_mapping_mode == 0)
        {
          spheres[i].changeShading()
        }
      }
    }
    else if(scene_type == "cylinders")
    {
      var i;
      for(i=0;i<cylinders.length;i++)
      {
        if(cylinders[i].tex_mapping_mode == 0)
        {
          cylinders[i].changeShading()
        }
      }
    }
  }

  if(event.key == "l")
  {
    var i;
    for(i=0;i<spheres.length;i++)
    {
      if(scene_type == 'spheres')
      {
        scene.remove(spheres[i].sphereMesh)
      }

      if(spheres[i].lightHandler.num_lights == 1)
      {
        spheres[i].lightHandler.num_lights = 2
      }
      else if(spheres[i].lightHandler.num_lights == 2)
      {
        spheres[i].lightHandler.num_lights = 1
      }
      spheres[i].createMaterials()
      spheres[i].loadMaterial()

      if(scene_type == 'spheres')
      {
        scene.add(spheres[i].sphereMesh)
      }
    }
    
    for(i=0;i<cylinders.length;i++)
    {
      if(scene_type == 'cylinders')
      {
        scene.remove(cylinders[i].cylinderMesh)
      }

      if(cylinders[i].lightHandler.num_lights == 1)
      {
        cylinders[i].lightHandler.num_lights = 2
      }
      else if(cylinders[i].lightHandler.num_lights == 2)
      {
        cylinders[i].lightHandler.num_lights = 1
      }
      cylinders[i].createMaterials()
      cylinders[i].loadMaterial()

      if(scene_type == 'cylinders')
      {
        scene.add(cylinders[i].cylinderMesh)
      }
    }
  }

  if(event.key == "t")
  {
    var i;
    for(i=0;i<spheres.length;i++)
    {
      if(scene_type == 'spheres')
      {
        scene.remove(spheres[i].sphereMesh)
      }

      spheres[i].tex_mapping_mode = (spheres[i].tex_mapping_mode + 1)%3

      if(spheres[i].tex_mapping_mode == 0)
      {
        spheres[i].sphereGeometry = new THREE.SphereGeometry(spheres[i].radius, 40, 40);
        if(spheres[i].tsc)
        {
          spheres[i].tsc = false
          spheres[i].shader_type = "gouraud"
        }
        spheres[i].ambientColor = [1.0,0.0,0.0,1.0]
      }
      else //Sphere settings while performing texture mapping
      {
        if(spheres[i].shader_type == "gouraud")
        {
          spheres[i].tsc = true
          spheres[i].shader_type = "phong"
        }

        if(i==0)
        {
          spheres[i].sphereGeometry = new THREE.TorusKnotGeometry(0.25,0.06,400, 400);
        }
        if(i==1)
        {
          spheres[i].sphereGeometry = new THREE.SphereGeometry(spheres[i].radius, 40, 40);
        }
        if(i==2)
        {
          spheres[i].sphereGeometry = new THREE.BoxGeometry(0.6,0.6,0.6, 40, 40, 40);
        }
        if(i==3)
        {
          spheres[i].sphereGeometry = new THREE.SphereGeometry(spheres[i].radius, 40, 40);
        }
        if(i==4)
        {
          spheres[i].sphereGeometry = new THREE.TorusGeometry(0.3,0.08,400, 400);
        }
        if(i==5)
        {
          spheres[i].sphereGeometry = new THREE.SphereGeometry(spheres[i].radius, 40, 40);
        }
        if(i==6)
        {
          spheres[i].sphereGeometry = new THREE.SphereGeometry(spheres[i].radius, 40, 40);
        }
        if(i==7)
        {
          spheres[i].sphereGeometry = new THREE.BoxGeometry(0.6,0.6,0.6, 40, 40, 40);
        }
        if(i==8)
        {
          spheres[i].sphereGeometry = new THREE.TorusKnotGeometry(0.25,0.06,400, 400);
        }

        spheres[i].ambientColor = [1.0,1.0,1.0,1.0]
      }

      //console.log(spheres[i].shader_type)
      spheres[i].createMaterials()
      spheres[i].loadMaterial()

      if(scene_type == 'spheres')
      {
        scene.add(spheres[i].sphereMesh)
      }
    }
    
    for(i=0;i<cylinders.length;i++)
    {
      if(scene_type == 'cylinders')
      {
        scene.remove(cylinders[i].cylinderMesh)
      }

      cylinders[i].tex_mapping_mode = (cylinders[i].tex_mapping_mode + 1)%3

      if(cylinders[i].tex_mapping_mode == 0)
      {
        cylinders[i].cylinderGeometry = new THREE.CylinderGeometry(cylinders[i].radius, cylinders[i].radius, cylinders[i].height, 40, 40);
        if(cylinders[i].tsc)
        {
          cylinders[i].tsc = false
          cylinders[i].shader_type = "gouraud"
        }
        cylinders[i].ambientColor = [1.0,0.0,0.0,1.0]
      }
      else //Cylinder settings while performing texture mapping
      {
        if(cylinders[i].shader_type == "gouraud")
        {
          cylinders[i].tsc = true
          cylinders[i].shader_type = "phong"
        }

        if(i==0)
        {
          cylinders[i].cylinderGeometry = new THREE.TorusKnotGeometry(0.25,0.06,400, 400);
        }
        if(i==1)
        {
          cylinders[i].cylinderGeometry = new THREE.CylinderGeometry(cylinders[i].radius, cylinders[i].radius, cylinders[i].height, 40, 40);
        }
        if(i==2)
        {
          cylinders[i].cylinderGeometry = new THREE.BoxGeometry(0.6,0.6,0.6, 40, 40, 40);
        }
        if(i==3)
        {
          cylinders[i].cylinderGeometry = new THREE.CylinderGeometry(cylinders[i].radius, cylinders[i].radius, cylinders[i].height, 40, 40);
        }
        if(i==4)
        {
          cylinders[i].cylinderGeometry = new THREE.TorusGeometry(0.3,0.08,400, 400);
        }
        if(i==5)
        {
          cylinders[i].cylinderGeometry = new THREE.CylinderGeometry(cylinders[i].radius, cylinders[i].radius, cylinders[i].height, 40, 40);
        }
        if(i==6)
        {
          cylinders[i].cylinderGeometry = new THREE.CylinderGeometry(cylinders[i].radius, cylinders[i].radius, cylinders[i].height, 40, 40);
        }
        if(i==7)
        {
          cylinders[i].cylinderGeometry = new THREE.BoxGeometry(0.6,0.6,0.6, 40, 40, 40);
        }
        if(i==8)
        {
          cylinders[i].cylinderGeometry = new THREE.TorusKnotGeometry(0.25,0.06,400, 400);
        }

        cylinders[i].ambientColor = [1.0,1.0,1.0,1.0]
      }

      cylinders[i].createMaterials()
      cylinders[i].loadMaterial()

      if(scene_type == 'cylinders')
      {
        scene.add(cylinders[i].cylinderMesh)
      }
    }
  }

});


//Animate:
const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;

    // Update controls
    if(mouseCntrl.controlsEnabled)
    {
        controls.enabled = true;
        controls.update();
    } else 
    {
        controls.enabled = false;
    }


    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();