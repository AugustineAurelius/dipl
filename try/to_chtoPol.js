U = 363000;
Unr = (Math.sqrt(2)/Math.sqrt(3))*U
console.log(Unr)
l = 280
d=60 //sm
tmax = 25
p=772

r0 = 1.12

s1=s2 = 4+4.2+4.2+4;
s3=s1/2;
sekv = Math.cbrt(s1*s2*s3);
console.log(sekv + ' = Sekv');

rp = d/(2*Math.sin(Math.PI/2));
console.log(rp + ' = rp');
rekv = Math.sqrt(r0*2*rp);
console.log(rekv + '   = r ekv');
e0 = 8.85418781762039 * Math.pow(10,-12);

condensation = 2.4*Math.PI*e0*((1/(Math.log(sekv/rekv)))-0.018);
condkr = condensation*0.95;
console.log(condensation + '  c0' );
console.log(condkr + '  condkr' );

