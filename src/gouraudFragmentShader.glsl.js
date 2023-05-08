export default`
varying vec4 v_color;
varying vec2 tex_coord;
varying vec3 v_normal;
varying vec3 v_position;
varying mat4 v_viewMatrix;


uniform sampler2D u_texture;
uniform int tex_mapping_mode;

void main() {

    vec4 textureColor = texture2D(u_texture, tex_coord);

    if(tex_mapping_mode == 0) //No texture mapping
    {
        gl_FragColor = v_color;
    }
    else //Either Spherical or Cylindrical texture mapping
    {
        gl_FragColor = vec4(textureColor.rgb * v_color.rgb, textureColor.a * v_color.a);
    }
}
`;