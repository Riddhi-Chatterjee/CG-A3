export default`
varying vec3 v_normal;
varying vec3 v_position;
varying mat4 v_viewMatrix;
varying vec2 tex_coord;

uniform vec3 u_SphereCenter;
uniform sampler2D u_texture;
uniform int tex_mapping_mode;

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

    v_normal = normalMatrix * normal;
    v_position = (modelMatrix * vec4( position, 1.0)).xyz;
    v_viewMatrix = viewMatrix;

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

