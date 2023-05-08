import "./style.css";
import * as THREE from "three";
import gouraudVertexShader from "./gouraudVertexShader.glsl.js";
import gouraudFragmentShader from "./gouraudFragmentShader.glsl.js";
import phongVertexShader from "./phongVertexShader.glsl.js";
import phongFragmentShader from "./phongFragmentShader.glsl.js";
import { LightHandler } from "./lightHandler.js";

export class Sphere
{
    constructor(camera, scene, radius, position, scale, ambientColor, kd, ka, ks, alpha, PointLight1, PointLight2, num_lights, max_num_lights, tex_mapping_mode)
    {
        this.radius = radius
        this.position = position
        this.scale = scale
        this.shader_type = "gouraud"
        this.scene = scene

        this.camera = camera
        this.ambientColor = ambientColor
        this.kd = kd
        this.ka = ka
        this.ks = ks
        this.alpha = alpha

        this.lightHandler = new LightHandler([PointLight1, PointLight2], num_lights, max_num_lights)
        this.tex_mapping_mode = tex_mapping_mode
        this.tsc = false

        this.PointLights = []

        var i;
        for(i=0;i<this.lightHandler.max_num_lights;i++)
        {
            this.PointLights.push({
                            u_lightPos: this.lightHandler.lights[i].lightPos,
                            u_diffuseColor: this.lightHandler.lights[i].diffuseColor,
                            u_specularColor: this.lightHandler.lights[i].specularColor,
                            u_a : this.lightHandler.lights[i].a,
                            u_b : this.lightHandler.lights[i].b,
                            u_c : this.lightHandler.lights[i].c
            })
        }


        this.createMaterials()

        this.sphereGeometry = new THREE.SphereGeometry(this.radius, 40, 40);
        this.sphereMaterial = this.gouraudMaterial
        this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
        this.sphereMesh.position.set(this.position[0], this.position[1], this.position[2]);
        this.sphereMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
    }

    createMaterials()
    {
        this.phongMaterial = new THREE.ShaderMaterial(  
        {
            uniforms: {
                
                "u_SphereCenter" : {value: this.position},

                "u_texture" : {value: new THREE.TextureLoader().load("/textures/checkerboard.png")},
                
                "tex_mapping_mode" : { 
                    value: this.tex_mapping_mode
                },
                
                "num_lights" : { 
                    value: this.lightHandler.num_lights
                },

                "pointLights" : {
                    value : this.PointLights
                },
          
                'u_cameraPos' : {value : new THREE.Vector3(
                    this.camera.position.x,
                    this.camera.position.y,
                    this.camera.position.z
                )},

          
                'u_kd' : {value : this.kd},
                'u_ka' : {value : this.ka},
                'u_ks' : {value : this.ks},
                'u_alpha' : {value : this.alpha},
                'u_ambientColor' : {value: this.ambientColor}
            },
          vertexShader: phongVertexShader,
          fragmentShader: phongFragmentShader
          }
        );
        
        this.phongMaterial.side = THREE.DoubleSide



        this.gouraudMaterial = new THREE.ShaderMaterial(         {
            uniforms: {
                
                "u_SphereCenter" : {value: this.position},

                "u_texture" : {value: new THREE.TextureLoader().load("/textures/checkerboard.png")},
                
                "tex_mapping_mode" : { 
                    value: this.tex_mapping_mode
                },
                
                "num_lights" : { 
                    value: this.lightHandler.num_lights
                },

                "pointLights" : {
                    value : this.PointLights
                },
          
                'u_cameraPos' : {value : new THREE.Vector3(
                    this.camera.position.x,
                    this.camera.position.y,
                    this.camera.position.z
                )},
          
                'u_kd' : {value : this.kd},
                'u_ka' : {value : this.ka},
                'u_ks' : {value : this.ks},
                'u_alpha' : {value : this.alpha},
                'u_ambientColor' : {value: this.ambientColor}
    
            },
          vertexShader: gouraudVertexShader,
          fragmentShader: gouraudFragmentShader
          } );
        
        this.gouraudMaterial.side = THREE.DoubleSide
    }

    changeShading()
    {
        if(this.shader_type == "gouraud")
        {
            this.shader_type = "phong"
            this.sphereMaterial = this.phongMaterial
            this.scene.remove(this.sphereMesh)
            this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
            this.sphereMesh.position.set(this.position[0], this.position[1], this.position[2]);
            this.sphereMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
            this.scene.add(this.sphereMesh)
        }
        else if(this.shader_type == "phong")
        {
            this.shader_type = "gouraud"
            this.sphereMaterial = this.gouraudMaterial
            this.scene.remove(this.sphereMesh)
            this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
            this.sphereMesh.position.set(this.position[0], this.position[1], this.position[2]);
            this.sphereMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
            this.scene.add(this.sphereMesh)
        }
    }

    loadMaterial()
    {
        if(this.shader_type == "phong")
        {
            this.sphereMaterial = this.phongMaterial
            this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
            this.sphereMesh.position.set(this.position[0], this.position[1], this.position[2]);
            this.sphereMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
        }
        else if(this.shader_type == "gouraud")
        {
            this.sphereMaterial = this.gouraudMaterial
            this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
            this.sphereMesh.position.set(this.position[0], this.position[1], this.position[2]);
            this.sphereMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
        }
    }
}