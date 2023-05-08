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
uniform vec3 u_SphereCenter;
uniform sampler2D u_texture;
uniform int tex_mapping_mode;

varying vec3 v_normal;
varying vec3 v_position;
varying mat4 v_viewMatrix;
varying vec2 tex_coord;

varying vec4 v_color;

vec3 lighting(PointLight pl, vec3 unitNormal, vec3 position) {

    vec3 rlw = normalize(pl.u_lightPos - position);

    vec3 rlv = (viewMatrix * vec4( rlw, 0.0)).xyz;

    float dA = max(0.0, dot(rlv, unitNormal));
    vec3 dC = vec3(u_kd * pl.u_diffuseColor.xyz * dA);

    vec3 vertToCam = normalize(u_cameraPos - position);
    vec3 halfwayVectorWld = normalize(vertToCam + rlw);
    vec3 halfwayVectorView = (viewMatrix * vec4( halfwayVectorWld, 0.0)).xyz;
    
    float specAmt = pow(max(0.0, dot(halfwayVectorView, unitNormal)), u_alpha);

    vec3 sC = vec3(u_ks * pl.u_specularColor.xyz * specAmt);

    float dis = length(pl.u_lightPos - position);
    float atten = 1.0/(pl.u_a + pl.u_b * dis + pl.u_c * dis * dis);

    vec3 aC = vec3(u_ka * u_ambientColor);

    return (atten * (dC + sC) + aC);
}

vec2 SphericalMapping()
{
  float r_sphere = 2.0;

  v_position[0] = v_position[0] - u_SphereCenter[0];
  v_position[1] = v_position[1] - u_SphereCenter[1];
  v_position[2] = v_position[2] - u_SphereCenter[2];
  
  vec3 position_vec = normalize(v_position);
  float x_sphere = r_sphere*position_vec[2];
  float y_sphere = r_sphere*position_vec[0];
  float z_sphere = r_sphere*position_vec[1];

  float u;
  float v;

  u = (3.14159*2.0 + 2.0*atan(x_sphere, y_sphere))/(4.0*3.14159);
  v = (2.0*acos(z_sphere/sqrt(r_sphere*r_sphere + z_sphere*z_sphere))/3.14159) - 0.5;

  vec2 tc;
  tc = vec2(u,v);
  return tc;
}

vec2 CylindricalMapping()
{
  float r_cylinder = 4.0;
  float h_cylinder = 12.0;
  
  float x_cylinder;
  float y_cylinder;
  float z_cylinder;

  v_position[0] = v_position[0] - u_SphereCenter[0];
  v_position[1] = v_position[1] - u_SphereCenter[1];
  v_position[2] = v_position[2] - u_SphereCenter[2];
  
  vec3 position_vec = normalize(v_position);

  float lambda = r_cylinder/sqrt(position_vec[2]*position_vec[2] + position_vec[0]*position_vec[0]);

  x_cylinder = lambda*position_vec[2];
  y_cylinder = lambda*position_vec[0];
  z_cylinder = lambda*position_vec[1];

  float u;
  float v;

  u = (3.14159*2.0 + 2.0*atan(x_cylinder, y_cylinder))/(4.0*3.14159);
  v = z_cylinder/h_cylinder + 0.5;


  if(z_cylinder <= -h_cylinder*30.0)
  {
    u=0.0;
    v=0.0;
  }
  if(z_cylinder >= h_cylinder*30.0)
  {
    u = 1.0;
    v = 1.0;
  }

  vec2 tc;
  tc = vec2(u,v);
  return tc;
}

void main() {

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );

    vec3 unitNormal = normalize(normalMatrix * normal);
    vec3 position = (modelMatrix * vec4( position, 1.0)).xyz;

    vec3 res = vec3(0.0,0.0,0.0);
    for(int i = 0; i < num_lights; i++) {
        res += lighting(pointLights[i], unitNormal, position);
    }

    v_color = vec4 (
        res, 
        1.0
    );

    if(tex_mapping_mode == 1) //Spherical texture mapping
    {
      tex_coord = SphericalMapping();
    }
    else //Cylindrical texture mapping
    {
      tex_coord = CylindricalMapping();
    }
}
`;
