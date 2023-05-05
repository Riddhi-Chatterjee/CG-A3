import "./style.css";
import * as THREE from "three";


export class Cylinder
{
    constructor(camera, scene, radius, height, position, scale, color, props, lightPos1, lightPos2, diffuseColor1, diffuseColor2, ambientColor1, ambientColor2, specularColor1, specularColor2)
    {
        this.radius = radius
        this.height = height
        this.position = position
        this.scale = scale
        this.color = color
        this.props = props
        this.scene = scene

        this.cylinderGeometry = new THREE.CylinderGeometry(this.radius, this.radius, this.height, 40, 40);
        this.cylinderMaterial = new THREE.MeshPhongMaterial({color:this.color});
        this.cylinderMesh = new THREE.Mesh(this.cylinderGeometry, this.cylinderMaterial);
        this.cylinderMesh.position.set(this.position[0], this.position[1], this.position[2]);
        this.cylinderMesh.scale.set(this.scale[0], this.scale[1], this.scale[2]);
    }
}