import "./style.css";
import * as THREE from "three";
import gouraudVertexShader from "./gouraudVertexShader.glsl.js";
import gouraudFragmentShader from "./gouraudFragmentShader.glsl.js";
import phongVertexShader from "./phongVertexShader.glsl.js";
import phongFragmentShader from "./phongFragmentShader.glsl.js";

export class Sphere
{
    constructor(camera, scene, radius, position, scale, color, props, lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2, a1, a2, b1, b2, c1, c2)
    {
        this.radius = radius
        this.position = position
        this.scale = scale
        this.props = props
        this.shader_type = "gouraud"
        this.scene = scene

        this.phongMaterial = new THREE.ShaderMaterial( {
            uniforms: {
                "pointLights" : {
                    value : [
                        {
                            u_lightPos: lightPos1,
                            u_diffuseColor: diffuseColor1,
                            u_specularColor: specularColor1,
                            u_a : a1,
                            u_b : b1,
                            u_c : c1
                        },
        
                        {
                            u_lightPos: lightPos2,
                            u_diffuseColor: diffuseColor2,
                            u_specularColor: specularColor2,
                            u_a : a2,
                            u_b : b2,
                            u_c : c2
                        }
                    ]
                },
        
                'u_cameraPos' : {value : new THREE.Vector3(
                    camera.position.x,
                    camera.position.y,
                    camera.position.z
                )},
        
                'u_kDiffuse' : {value : props.kDiffuse},
                'u_kAmbient' : {value : props.kAmbient},
                'u_kSpecular' : {value : props.kSpecular},
                'u_alpha' : {value : props.alpha},
                'u_ambientColor' : {value: ambientColor1}
            },
            vertexShader: phongVertexShader,
            fragmentShader: phongFragmentShader
        } );
        
        this.phongMaterial.side = THREE.DoubleSide

        this.gouraudMaterial = new THREE.ShaderMaterial( {
            uniforms: {
                "pointLights" : {
                    value : [
                        {
                            u_lightPos: lightPos1,
                            u_diffuseColor: diffuseColor1,
                            u_specularColor: specularColor1,
                            u_a : a1,
                            u_b : b1,
                            u_c : c1
                        },
        
                        {
                            u_lightPos: lightPos2,
                            u_diffuseColor: diffuseColor2,
                            u_specularColor: specularColor2,
                            u_a : a2,
                            u_b : b2,
                            u_c : c2
                        }
                    ]
                },
        
                'u_cameraPos' : {value : new THREE.Vector3(
                    camera.position.x,
                    camera.position.y,
                    camera.position.z
                )},
        
                'u_kDiffuse' : {value : props.kDiffuse},
                'u_kAmbient' : {value : props.kAmbient},
                'u_kSpecular' : {value : props.kSpecular},
                'u_alpha' : {value : props.alpha},
                'u_ambientColor' : {value: ambientColor1}
            },
            vertexShader: gouraudVertexShader,
            fragmentShader: gouraudFragmentShader
        } );
        
        this.gouraudMaterial.side = THREE.DoubleSide

        this.sphereGeometry = new THREE.SphereGeometry(this.radius, 40, 40);
        this.sphereMaterial = this.gouraudMaterial
        this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
        this.sphereMesh.position.set(this.position[0], this.position[1], this.position[2]);
        this.sphereMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
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
}