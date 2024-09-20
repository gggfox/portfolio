    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
        return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {

        vec2 uv = (vUv-0.5) * 2.0 ;
        uv.x *= uResolution.x / uResolution.y;
        vec3 finalColor = vec3(0.0);

        for(float i = 0.0; i < 2.0; i++) {
        vec2 uv0 = uv;
        
        
        uv = fract(uv * 3.14159/2.0) - 0.5;

        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette(
            length(uv0) + i * 0.4+ uTime*0.4,           
            vec3(0.517, 0.318, 0.788),
            vec3(0.298, 0.637, 0.071),
            vec3(1.354, 0.764, 0.852),
            vec3(-0.293, -2.493, 0.712) 
        );


            d = sin(d * 8.0 + uTime)/8.0;
            d = abs(d);
            float darkness = 0.9;
            d = pow(0.01 / d, darkness);



            finalColor += col * d;
        }


      gl_FragColor = vec4(finalColor, 1.0);
    }