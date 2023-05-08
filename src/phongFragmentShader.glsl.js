export default`
struct PointLight {
    vec3 u_lightPos;
    vec4 u_diffuseColor;
    vec4 u_specularColor;
    float u_a;
    float u_b;
    float u_c;
};

uniform int num_lights;
uniform PointLight pointLights[2];
uniform vec3 u_cameraPos;
uniform float u_kd;
uniform float u_ka;
uniform float u_ks;
uniform float u_alpha;
uniform vec4 u_ambientColor;
uniform sampler2D u_texture;
uniform int tex_mapping_mode;

varying vec3 v_normal;
varying vec3 v_position;
varying mat4 v_viewMatrix;
varying vec2 tex_coord;

vec3 lighting(PointLight pl, vec3 unitNormal) {

    vec3 rlw = normalize(pl.u_lightPos - v_position);

    vec3 rlv = (v_viewMatrix * vec4( rlw, 0.0)).xyz;

    float dA = max(0.0, dot(rlv, unitNormal));
    vec3 dC = vec3(u_kd * pl.u_diffuseColor.xyz * dA);

    vec3 vertToCam = normalize(u_cameraPos - v_position);
    vec3 halfwayVectorWld = normalize(vertToCam + rlw);
    vec3 halfwayVectorView = (v_viewMatrix * vec4( halfwayVectorWld, 0.0)).xyz;
    
    float specAmt = pow(max(0.0, dot(halfwayVectorView, unitNormal)), u_alpha);

    vec3 sC = vec3(u_ks * pl.u_specularColor.xyz * specAmt);

    float dis = length(pl.u_lightPos - v_position);
    float atten = 1.0/(pl.u_a + pl.u_b * dis + pl.u_c * dis * dis);

    vec3 aC = vec3(u_ka * u_ambientColor);

    return (atten * (dC + sC) + aC);
}

void main() {

    vec3 unitNormal = normalize(v_normal); 

    vec3 res = vec3(0.0,0.0,0.0);
    for(int i = 0; i < num_lights; i++) {
        res += lighting(pointLights[i], unitNormal);
    }

    vec4 textureColor = texture2D(u_texture, tex_coord);

    if(tex_mapping_mode == 0) //No texture mapping
    {
        gl_FragColor = vec4(res, 1.0);
    }
    else //Either Spherical or Cylindrical texture mapping
    {
        gl_FragColor = vec4(textureColor.rgb * res, textureColor.a);
    }
}
`;