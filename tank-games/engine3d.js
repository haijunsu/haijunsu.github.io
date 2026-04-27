// Shared 3D Tank Game Engine - configurable via window.GAME_CONFIG
(function(){
const C=window.GAME_CONFIG||{};
const gc=document.getElementById('gc'),ov=document.getElementById('ov'),fl=document.getElementById('fl'),hd=document.getElementById('hd'),arSvg=document.getElementById('ar');
let W=gc.clientWidth,H=gc.clientHeight;
const scene=new THREE.Scene();scene.background=new THREE.Color(0x8fb3c8);scene.fog=new THREE.Fog(0x8fb3c8,C.fogNear||80,C.fogFar||280);
const camera=new THREE.PerspectiveCamera(65,W/H,.1,1800);
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(W,H);renderer.shadowMap.enabled=true;gc.appendChild(renderer.domElement);
function onR(){W=gc.clientWidth;H=gc.clientHeight;camera.aspect=W/H;camera.updateProjectionMatrix();renderer.setSize(W,H);if(arSvg){arSvg.setAttribute('viewBox','0 0 '+W+' '+H);arSvg.setAttribute('width',W);arSvg.setAttribute('height',H)}}
addEventListener('resize',onR);
scene.add(new THREE.AmbientLight(0xffffff,.55));
const sun=new THREE.DirectionalLight(0xffffff,.9);sun.position.set(60,C.sunHeight||80,40);sun.castShadow=true;
const sh=C.arena||100;sun.shadow.mapSize.width=1024;sun.shadow.mapSize.height=1024;
sun.shadow.camera.left=-sh;sun.shadow.camera.right=sh;sun.shadow.camera.top=sh;sun.shadow.camera.bottom=-sh;
sun.shadow.camera.near=1;sun.shadow.camera.far=sh*2.5;scene.add(sun);
const AR=C.arena||100,CL=C.ceiling||80;
const gnd=new THREE.Mesh(new THREE.PlaneGeometry(AR*2,AR*2),new THREE.MeshLambertMaterial({color:0x5a7a3f}));
gnd.rotation.x=-Math.PI/2;gnd.receiveShadow=true;scene.add(gnd);
const grid=new THREE.GridHelper(AR*2,Math.min(120,Math.floor(AR/2.5)),0x2f4020,0x2f4020);
grid.material.opacity=.22;grid.material.transparent=true;scene.add(grid);

// Clouds if flying
if(C.canFly){for(let i=0;i<20;i++){const mt=new THREE.MeshLambertMaterial({color:0xffffff,transparent:true,opacity:.7});const cg=new THREE.Group();const s=6+Math.random()*10;for(let j=0;j<4;j++){const p=new THREE.Mesh(new THREE.SphereGeometry(s*(.7+Math.random()*.5),8,6),mt);p.position.set((Math.random()-.5)*s*2,(Math.random()-.5)*s*.4,(Math.random()-.5)*s*2);cg.add(p)}cg.position.set((Math.random()-.5)*AR*1.8,35+Math.random()*70,(Math.random()-.5)*AR*1.8);scene.add(cg)}}

// Walls
const wm=new THREE.MeshLambertMaterial({color:0x4a3a26});
function aw(x,z,w,d){const m=new THREE.Mesh(new THREE.BoxGeometry(w,3,d),wm);m.position.set(x,1.5,z);m.castShadow=true;scene.add(m)}
aw(0,-AR,AR*2,2);aw(0,AR,AR*2,2);aw(-AR,0,2,AR*2);aw(AR,0,2,AR*2);

let craters=[],obs=[];
function addCrater(pos){if(!C.hasNuke)return;const r=C.craterR||6;const m=new THREE.Mesh(new THREE.CircleGeometry(r,24),new THREE.MeshBasicMaterial({color:0x2a1a10,transparent:true,opacity:.85}));m.rotation.x=-Math.PI/2;m.position.set(pos.x,.02,pos.z);scene.add(m);craters.push(m);if(craters.length>24){scene.remove(craters.shift())}}
function sO(){for(const o of obs)scene.remove(o.mesh);obs=[];for(const c of craters)scene.remove(c);craters=[];const rm=new THREE.MeshLambertMaterial({color:0x8a6a3e});const ct=C.obsCount||14;for(let i=0;i<ct;i++){const w=4+Math.random()*6,d=4+Math.random()*6,h=2+Math.random()*2.5;const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),rm);const x=(Math.random()-.5)*AR*1.7,z=(Math.random()-.5)*AR*1.7;if(Math.hypot(x,z)<18)continue;mesh.position.set(x,h/2,z);mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);obs.push({mesh,x,z,w,d,h,halfW:w/2,halfD:d/2})}}

// Tank builder
function bT(bc,tc,isPlayer){
const g=new THREE.Group();
const tm2=new THREE.MeshLambertMaterial({color:0x222222});
const tl=new THREE.Mesh(new THREE.BoxGeometry(4.2,.9,1.3),tm2);tl.position.set(0,.45,-1.7);tl.castShadow=true;g.add(tl);
const tr=new THREE.Mesh(new THREE.BoxGeometry(4.2,.9,1.3),tm2);tr.position.set(0,.45,1.7);tr.castShadow=true;g.add(tr);
const bd=new THREE.Mesh(new THREE.BoxGeometry(4,1.1,2.6),new THREE.MeshLambertMaterial({color:bc}));bd.position.y=1.1/2+.9;bd.castShadow=true;g.add(bd);
const yw=new THREE.Group();yw.position.y=.9+1.1;
const tMat=new THREE.MeshLambertMaterial({color:tc});

if(isPlayer&&C.hasMinigun){
  // Big turret with minigun
  const dm=new THREE.Mesh(new THREE.BoxGeometry(3.2,1.4,2.6),tMat);dm.position.y=.7;dm.castShadow=true;yw.add(dm);
  const trn=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,2,12),new THREE.MeshLambertMaterial({color:0x222222}));trn.rotation.x=Math.PI/2;trn.position.set(1.2,.7,0);yw.add(trn);
  const pg=new THREE.Group();pg.position.set(1.2,.7,0);yw.add(pg);
  const mt=new THREE.Mesh(new THREE.BoxGeometry(.9,1.3,2),tMat);mt.position.set(.45,0,0);mt.castShadow=true;pg.add(mt);
  const dk=new THREE.MeshLambertMaterial({color:0x141414});
  const podR=C.bigMinigun?.9:.6;
  const pd=new THREE.Mesh(new THREE.CylinderGeometry(podR,podR,1.4,16),new THREE.MeshLambertMaterial({color:0x2a2a2a}));pd.rotation.z=Math.PI/2;pd.position.set(1.2,0,0);pd.castShadow=true;pg.add(pd);
  const bn=new THREE.Mesh(new THREE.CylinderGeometry(podR+.03,podR+.03,.25,16),new THREE.MeshLambertMaterial({color:0xcfa018}));bn.rotation.z=Math.PI/2;bn.position.set(1.85,0,0);pg.add(bn);
  const cl=new THREE.Group();cl.position.set(2.05,0,0);
  const bLen=C.bigMinigun?3:2;const cR=C.bigMinigun?.35:.2;const bR=C.bigMinigun?.14:.08;
  for(let i=0;i<6;i++){const b=new THREE.Mesh(new THREE.CylinderGeometry(bR,bR,bLen,10),dk);b.rotation.z=Math.PI/2;const a=(i/6)*Math.PI*2;b.position.set(bLen/2,Math.sin(a)*cR,Math.cos(a)*cR);b.castShadow=true;cl.add(b)}
  const pn=new THREE.Mesh(new THREE.CylinderGeometry(bR+.04,bR+.04,bLen*.95,10),new THREE.MeshLambertMaterial({color:0x555555}));pn.rotation.z=Math.PI/2;pn.position.set(bLen/2,0,0);cl.add(pn);
  pg.add(cl);
  const mf=new THREE.Mesh(new THREE.SphereGeometry(.4,8,6),new THREE.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:0}));mf.position.set(2.05+bLen+.1,0,0);pg.add(mf);
  g._pitch=pg;g._cluster=cl;g._muzzleFlash=mf;g._barrelTipLocal=new THREE.Vector3(2.05+bLen+.1,0,0);
}else if(isPlayer&&C.hasNuke&&!C.hasMinigun){
  // Nuke launcher turret
  const dm=new THREE.Mesh(new THREE.BoxGeometry(3.2,1.4,2.6),tMat);dm.position.y=.7;dm.castShadow=true;yw.add(dm);
  const mt=new THREE.Mesh(new THREE.BoxGeometry(.8,1.6,2.2),tMat);mt.position.set(1.7,.7,0);mt.castShadow=true;yw.add(mt);
  const slv=new THREE.Mesh(new THREE.CylinderGeometry(.7,.7,2,14),new THREE.MeshLambertMaterial({color:0x2a2a2a}));slv.rotation.z=Math.PI/2;slv.position.set(2.4,.7,0);slv.castShadow=true;yw.add(slv);
  const dk=new THREE.MeshLambertMaterial({color:0x141414});const yl=new THREE.MeshLambertMaterial({color:0xcfa018});
  for(let i=0;i<7;i++){const m=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,.9,14),i%2===0?dk:yl);m.rotation.z=Math.PI/2;m.position.set(3.9+i*.9,.7,0);m.castShadow=true;yw.add(m)}
  const cone=new THREE.Mesh(new THREE.CylinderGeometry(1.1,.85,1.2,14),new THREE.MeshLambertMaterial({color:0x2a2a2a}));cone.rotation.z=Math.PI/2;cone.position.set(3.9+7*.9+.5,.7,0);cone.castShadow=true;yw.add(cone);
  g._barrelTipLocal=new THREE.Vector3(3.9+7*.9+1.3,.7,0);
}else if(isPlayer&&C.hasBigCannon){
  // Big cannon turret
  const dm=new THREE.Mesh(new THREE.BoxGeometry(3.2,1.4,2.6),tMat);dm.position.y=.7;dm.castShadow=true;yw.add(dm);
  const mt=new THREE.Mesh(new THREE.BoxGeometry(.8,1.6,2.2),tMat);mt.position.set(1.7,.7,0);mt.castShadow=true;yw.add(mt);
  const slv=new THREE.Mesh(new THREE.CylinderGeometry(.7,.7,2,14),new THREE.MeshLambertMaterial({color:0x2a2a2a}));slv.rotation.z=Math.PI/2;slv.position.set(2.4,.7,0);slv.castShadow=true;yw.add(slv);
  const bl=new THREE.Mesh(new THREE.CylinderGeometry(.48,.55,6,16),new THREE.MeshLambertMaterial({color:0x161616}));bl.rotation.z=Math.PI/2;bl.position.set(5,.7,0);bl.castShadow=true;yw.add(bl);
  const brk=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,1.1,14),new THREE.MeshLambertMaterial({color:0x3a3a3a}));brk.rotation.z=Math.PI/2;brk.position.set(8.3,.7,0);brk.castShadow=true;yw.add(brk);
  g._barrelTipLocal=new THREE.Vector3(8.9,.7,0);
}else{
  // Standard turret
  const dm=new THREE.Mesh(new THREE.BoxGeometry(2.2,.9,1.9),tMat);dm.position.y=.45;dm.castShadow=true;yw.add(dm);
  const bl=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,2.8,10),new THREE.MeshLambertMaterial({color:0x1a1a1a}));bl.rotation.z=Math.PI/2;bl.position.set(2.2,.55,0);bl.castShadow=true;yw.add(bl);
  g._barrelTipLocal=new THREE.Vector3(3.6,.55,0);
}

// Shield light
if(isPlayer&&C.blastImmune){
  const lb=new THREE.Mesh(new THREE.SphereGeometry(.25,8,8),new THREE.MeshBasicMaterial({color:0x22ff66}));lb.position.set(-.8,1.78,0);yw.add(lb);g._warnLight=lb;
}else if(isPlayer&&C.hasNuke){
  const lb=new THREE.Mesh(new THREE.SphereGeometry(.25,8,8),new THREE.MeshBasicMaterial({color:0xff2200}));lb.position.set(-.8,1.78,0);yw.add(lb);g._warnLight=lb;
}

// Thrusters
if(isPlayer&&C.canFly){
  const thrusts=[];
  const tps=[[-1.6,.3,-1.9],[1.6,.3,-1.9],[-1.6,.3,1.9],[1.6,.3,1.9]];
  for(const[px,py,pz]of tps){
    const h=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,.6,12),new THREE.MeshLambertMaterial({color:0x444444}));h.position.set(px,py,pz);h.castShadow=true;g.add(h);
    const fm=new THREE.MeshBasicMaterial({color:0x66bbff,transparent:true,opacity:0});const f=new THREE.Mesh(new THREE.ConeGeometry(.38,1.8,10),fm);f.rotation.x=Math.PI;f.position.set(px,py-1.1,pz);g.add(f);
    thrusts.push({flame:f});
  }
  g._thrusters=thrusts;
}

g.add(yw);g._turret=yw;g._yaw=yw;
return g}

function bWH(){
  const g=new THREE.Group();const r=C.whRadius||.5;const l=C.whLength||2.2;
  const bd=new THREE.Mesh(new THREE.CylinderGeometry(r,r,l,12),new THREE.MeshLambertMaterial({color:0xdddddd}));bd.rotation.z=Math.PI/2;bd.castShadow=true;g.add(bd);
  const ns=new THREE.Mesh(new THREE.ConeGeometry(r,r*2,12),new THREE.MeshLambertMaterial({color:0xc02222}));ns.rotation.z=-Math.PI/2;ns.position.x=l/2+r;ns.castShadow=true;g.add(ns);
  const st=new THREE.Mesh(new THREE.CylinderGeometry(r+.01,r+.01,r*.5,12),new THREE.MeshLambertMaterial({color:0x111111}));st.rotation.z=Math.PI/2;st.position.x=l*.2;g.add(st);
  const fm=new THREE.MeshLambertMaterial({color:0x333333});
  for(let i=0;i<4;i++){const f=new THREE.Mesh(new THREE.BoxGeometry(l*.4,.04,r*.8),fm);f.position.x=-l*.4;f.rotation.x=i*Math.PI/2;f.position.y=Math.sin(i*Math.PI/2)*r;f.position.z=Math.cos(i*Math.PI/2)*r;g.add(f)}
  return g}

let player,pVY=0,spinR=0,spinA=0,recoil=0,heat=0;
let enemies=[],bullets=[],eBullets=[],particles=[],blasts=[];
let score=0,lives=3,wave=0,lastShot=0,invuln=0,camShake=0,flashI=0,running=false;

const BSPD=C.bulletSpeed||60,FCD=C.fireCooldown||280,BMR=C.blastRadius||0,BES=C.blastExpandSpeed||90,BDU=C.blastDuration||3.5,MBL=C.maxBlasts||6;
const PSP=C.playerSpeed||14,PTR=C.playerTurnRate||2.4;
const ESP=C.enemySpeed||6,ETR=1.2,EFR=C.enemyFireRange||70;
const ebGeo=new THREE.SphereGeometry(.22,8,8),ebMat=new THREE.MeshBasicMaterial({color:0xff5a3a});
const bGeo=C.hasNuke?null:new THREE.SphereGeometry(.22,8,8);
const bMat=C.hasNuke?null:new THREE.MeshBasicMaterial({color:0xffd966});

const keys={};const mNDC=new THREE.Vector2(0,0);const mRaw={x:W/2,y:H/2,d:false};const ray=new THREE.Raycaster();
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if([' ','arrowup','arrowdown','arrowleft','arrowright','shift','control'].includes(e.key.toLowerCase()))e.preventDefault()});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
renderer.domElement.addEventListener('mousemove',e=>{const r=renderer.domElement.getBoundingClientRect();mRaw.x=e.clientX-r.left;mRaw.y=e.clientY-r.top;mNDC.x=(mRaw.x/r.width)*2-1;mNDC.y=-((mRaw.y/r.height)*2-1)});
renderer.domElement.addEventListener('mousedown',()=>mRaw.d=true);
renderer.domElement.addEventListener('mouseup',()=>mRaw.d=false);

function aimP(){ray.setFromCamera(mNDC,camera);const gp=new THREE.Plane(new THREE.Vector3(0,1,0),0);const o=new THREE.Vector3();if(ray.ray.intersectPlane(gp,o)&&Math.abs(o.x)<AR*1.3&&Math.abs(o.z)<AR*1.3)return o;const fb=new THREE.Plane(new THREE.Vector3(0,1,0),-(player?player.position.y:0));const o2=new THREE.Vector3();ray.ray.intersectPlane(fb,o2);return o2}
function rcc(rx,rz,hw,hd2,cx,cz,cr){const nx=Math.max(rx-hw,Math.min(cx,rx+hw)),nz=Math.max(rz-hd2,Math.min(cz,rz+hd2));return Math.hypot(cx-nx,cz-nz)<cr}
function tryM(e,dx,dz,r,alt){const col=!alt||alt<4.5;let nx=e.position.x+dx,bl=false;if(col)for(const o of obs)if(rcc(o.x,o.z,o.halfW,o.halfD,nx,e.position.z,r)){bl=true;break}if(Math.abs(nx)>AR-r)bl=true;if(!bl)e.position.x=nx;let nz=e.position.z+dz;bl=false;if(col)for(const o of obs)if(rcc(o.x,o.z,o.halfW,o.halfD,e.position.x,nz,r)){bl=true;break}if(Math.abs(nz)>AR-r)bl=true;if(!bl)e.position.z=nz}
function spP(pos,cl,n,ub,sp2){ub=ub||0;sp2=sp2||8;const mt=new THREE.MeshBasicMaterial({color:cl});for(let i=0;i<n;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.3,.3,.3),mt);m.position.copy(pos);scene.add(m);particles.push({mesh:m,vx:(Math.random()-.5)*sp2,vy:Math.random()*6+ub,vz:(Math.random()-.5)*sp2,life:1})}}

function detN(pos){if(blasts.length>=MBL){const ol=blasts.shift();scene.remove(ol.fire);scene.remove(ol.stem);scene.remove(ol.cap);scene.remove(ol.ring);scene.remove(ol.ring2)}addCrater(pos);flashI=Math.min(1,flashI+(C.flashAdd||.5));camShake=Math.max(camShake,C.shakeAdd||2);
const fire=new THREE.Mesh(new THREE.SphereGeometry(1,16,14),new THREE.MeshBasicMaterial({color:0xffe28a,transparent:true,opacity:1}));fire.position.copy(pos);fire.position.y=Math.max(pos.y,2);scene.add(fire);
const stem=new THREE.Mesh(new THREE.CylinderGeometry(1,1.2,1,12),new THREE.MeshBasicMaterial({color:0xdddddd,transparent:true,opacity:.9}));stem.position.copy(pos);stem.position.y=.5;scene.add(stem);
const cap=new THREE.Mesh(new THREE.SphereGeometry(1,14,12),new THREE.MeshBasicMaterial({color:0xeeeeee,transparent:true,opacity:.92}));cap.position.copy(pos);cap.position.y=2;scene.add(cap);
const ring=new THREE.Mesh(new THREE.RingGeometry(.5,1.5,36),new THREE.MeshBasicMaterial({color:0xffddaa,transparent:true,opacity:.9,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(pos.x,.1,pos.z);scene.add(ring);
const ring2=new THREE.Mesh(new THREE.RingGeometry(.3,1.2,36),new THREE.MeshBasicMaterial({color:0xff7722,transparent:true,opacity:.85,side:THREE.DoubleSide}));ring2.rotation.x=-Math.PI/2;ring2.position.set(pos.x,.12,pos.z);scene.add(ring2);
blasts.push({pos:pos.clone(),fire,stem,cap,ring,ring2,radius:1,time:0,hitE:new Set()});
spP(pos,0x444444,14,4,12);spP(pos,0xff6a1a,10,3,10);spP(pos,0xffb347,8,5,12)}

function fP(){const now=performance.now();if(now-lastShot<FCD)return;lastShot=now;
const tu=player._pitch||player._turret;const tip=(player._barrelTipLocal||new THREE.Vector3(3.6,.55,0)).clone();tu.localToWorld(tip);
const dir=new THREE.Vector3(1,0,0).applyQuaternion(tu.getWorldQuaternion(new THREE.Quaternion()));
if(!C.canPitch)dir.y=0;dir.normalize();
if(C.hasMinigun){dir.x+=(Math.random()-.5)*.01;dir.y+=(Math.random()-.5)*.01;dir.z+=(Math.random()-.5)*.01;dir.normalize()}

if(C.hasNuke){
  const wh=bWH();wh.position.copy(tip);wh.rotation.y=Math.atan2(-dir.z,dir.x);scene.add(wh);
  bullets.push({mesh:wh,vx:dir.x*BSPD,vy:dir.y*BSPD,vz:dir.z*BSPD,life:C.bulletLife||4,radius:C.whRadius||.5,st:0,isNuke:true});
}else{
  const m=new THREE.Mesh(bGeo,bMat);m.position.copy(tip);scene.add(m);
  bullets.push({mesh:m,vx:dir.x*BSPD,vz:dir.z*BSPD,vy:0,life:2,radius:.2,st:0,isNuke:false});
}
if(player._muzzleFlash){player._muzzleFlash.material.opacity=1;player._muzzleFlash.scale.set(1,1,1)}
spP(tip,0xffeaa0,5,.5,3);spP(tip,0x777777,4,.3,2);
recoil=Math.min(1.5,recoil+(C.recoilAdd||.3));
camShake=Math.max(camShake,C.shotShake||.2)}

function fE(e){const tu=e.tank._turret;const tip=(e.tank._barrelTipLocal||new THREE.Vector3(3.6,.55,0)).clone();tu.localToWorld(tip);
const dx=player.position.x-tip.x,dy=(player.position.y+1.2)-tip.y,dz=player.position.z-tip.z;const len=Math.hypot(dx,dy,dz)||1;
const m=new THREE.Mesh(ebGeo,ebMat);m.position.copy(tip);scene.add(m);
eBullets.push({mesh:m,vx:dx/len*42,vy:C.canFly?dy/len*42:0,vz:dz/len*42,life:3})}

function clr(){if(player)scene.remove(player);for(const e of enemies)scene.remove(e.tank);for(const b of bullets)scene.remove(b.mesh);for(const b of eBullets)scene.remove(b.mesh);for(const p of particles)scene.remove(p.mesh);for(const c of craters)scene.remove(c);for(const bl of blasts){scene.remove(bl.fire);scene.remove(bl.stem);scene.remove(bl.cap);scene.remove(bl.ring);scene.remove(bl.ring2)}enemies=[];bullets=[];eBullets=[];particles=[];craters=[];blasts=[]}

function reset(){clr();sO();player=bT(0x3a7bc2,0x1f5588,true);player.position.set(0,0,0);player._radius=2.2;pVY=0;scene.add(player);score=0;lives=C.lives||3;wave=0;lastShot=0;invuln=0;camShake=0;flashI=0;spinR=0;spinA=0;recoil=0;heat=0;nW();uh()}

function nW(){wave++;const n=(C.enemyBase||2)+wave*(C.enemyPerWave||1);for(let i=0;i<n;i++){let ex,ez,t=0;do{ex=(Math.random()-.5)*AR*1.6;ez=(Math.random()-.5)*AR*1.6;t++}while((Math.hypot(ex-player.position.x,ez-player.position.z)<(C.spawnDist||30))&&t<40);const tank=bT(0xc23a2a,0x8a2818,false);tank.position.set(ex,0,ez);tank.rotation.y=Math.random()*Math.PI*2;scene.add(tank);enemies.push({tank,radius:2.2,speed:ESP*(.85+Math.random()*.3),lastShot:performance.now()+Math.random()*1500,hp:C.enemyHp||2})}uh()}

function uh(){document.getElementById('sc').textContent='Score: '+score;document.getElementById('lv').textContent='Lives: '+lives;document.getElementById('wv').textContent='Wave: '+wave;if(hd)hd.textContent='ALT '+Math.round(player?player.position.y:0)+' · enemies '+enemies.length}
function sad(t,c2){let d=t-c2;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;return d}

function uEA(){if(!arSvg||!C.hasRadar)return;const mg=40,cx=W/2,cy=H/2;const pv=new THREE.Vector3();let svg='';
for(const e of enemies){pv.set(e.tank.position.x,e.tank.position.y+1.5,e.tank.position.z);const vs=pv.clone().applyMatrix4(camera.matrixWorldInverse);const bh=vs.z>0;pv.project(camera);let sx=(pv.x*.5+.5)*W,sy=(-pv.y*.5+.5)*H;const on=!bh&&sx>=mg&&sx<=W-mg&&sy>=mg&&sy<=H-mg;const dist=Math.hypot(e.tank.position.x-player.position.x,e.tank.position.z-player.position.z);
if(on){if(dist<100)continue;svg+='<g transform="translate('+sx.toFixed(1)+','+(sy-24).toFixed(1)+')"><polygon points="0,0 -6,-10 6,-10" fill="rgba(255,70,55,.9)" stroke="rgba(0,0,0,.6)" stroke-width="1"/><text x="0" y="-14" font-size="10" text-anchor="middle" fill="rgba(255,240,240,.85)" font-family="sans-serif">'+Math.round(dist)+'m</text></g>';continue}
let dx=sx-cx,dy=sy-cy;if(bh){dx=-dx;dy=-dy}const m2=Math.hypot(dx,dy)||1;dx/=m2;dy/=m2;const tx=dx>0?(W-mg-cx)/dx:(mg-cx)/dx;const ty=dy>0?(H-mg-cy)/dy:(mg-cy)/dy;const t=Math.min(tx,ty);const ex=cx+dx*t,ey=cy+dy*t;const angle=Math.atan2(dy,dx)*180/Math.PI;const alpha=Math.max(.55,1-dist/900);
svg+='<g transform="translate('+ex.toFixed(1)+','+ey.toFixed(1)+') rotate('+angle.toFixed(1)+')"><polygon points="16,0 -12,-10 -7,0 -12,10" fill="rgba(255,70,55,'+alpha.toFixed(2)+')" stroke="rgba(0,0,0,.65)" stroke-width="1"/><text x="-2" y="22" font-size="10" text-anchor="middle" fill="rgba(255,240,240,.9)" font-family="sans-serif" transform="rotate('+(-angle).toFixed(1)+')">'+Math.round(dist)+'m</text></g>'}arSvg.innerHTML=svg}

let lt=0;
function lp(now){if(!running)return;const dt=Math.min(.05,(now-lt)/1000);lt=now;
let f=0,tn=0;if(keys.w||keys.arrowup)f++;if(keys.s||keys.arrowdown)f--;if(keys.a||keys.arrowleft)tn--;if(keys.d||keys.arrowright)tn++;
const thr=C.canFly&&!!keys.shift,desc=C.canFly&&!!keys.control;
player.rotation.y-=tn*PTR*dt;const h=player.rotation.y,fx=Math.cos(h),fz=-Math.sin(h);
tryM(player,fx*PSP*f*dt*(player.position.y>2?1.15:1),fz*PSP*f*dt*(player.position.y>2?1.15:1),player._radius,player.position.y);

if(C.canFly){let vA=-22;if(thr)vA+=70;if(desc)vA-=32;pVY+=vA*dt;pVY*=.92;player.position.y+=pVY*dt;if(player.position.y<=0){player.position.y=0;if(pVY<0)pVY=0}if(player.position.y>=CL){player.position.y=CL;if(pVY>0)pVY=0}
player.rotation.x=THREE.MathUtils.lerp(player.rotation.x,-f*.08,.1);player.rotation.z=THREE.MathUtils.lerp(player.rotation.z,tn*.12,.1);
if(player._thrusters){const int=thr?1:desc?.15:.35;for(const t of player._thrusters){t.flame.material.opacity=int;t.flame.scale.set(1,.8+int*1.2+Math.random()*.2,1)}}}

// Turret aim
const aim=aimP();if(aim&&isFinite(aim.x)){const ax=aim.x-player.position.x,ay=aim.y-(player.position.y+2),az=aim.z-player.position.z;const hD=Math.hypot(ax,az);const wy=Math.atan2(-az,ax);player._yaw.rotation.y=wy-player.rotation.y;
if(player._pitch&&C.canPitch){let pA=Math.atan2(ay,hD);pA=Math.max(-Math.PI/2+.1,Math.min(Math.PI/3,pA));player._pitch.rotation.z=THREE.MathUtils.lerp(player._pitch.rotation.z||0,pA,.25)}}

// Minigun spin
if(C.hasMinigun){const firing=mRaw.d||!!keys[' '];const tS=firing?45:0;spinR+=(tS-spinR)*Math.min(1,dt*3.5);spinA+=spinR*dt;if(player._cluster)player._cluster.rotation.x=spinA;if(firing&&spinR>20)fP()}else{if(keys[' ']||mRaw.d)fP()}

// Muzzle flash fade
if(player._muzzleFlash){player._muzzleFlash.material.opacity=Math.max(0,player._muzzleFlash.material.opacity-dt*6);const s=player._muzzleFlash.scale.x+dt*4;player._muzzleFlash.scale.set(s,s,s)}

recoil=Math.max(0,recoil-dt*3);camShake=Math.max(0,camShake-dt*2);flashI=Math.max(0,flashI-dt*2);
if(fl)fl.style.opacity=flashI*.85;
if(player._turret)player._turret.position.x=-recoil*.8;
if(player._warnLight){const p=.5+.5*Math.sin(now*.02);if(C.blastImmune)player._warnLight.material.color.setRGB(.13,.6+p*.4,.25);else player._warnLight.material.color.setRGB(1,.15+p*.35,.1)}
if(invuln>0)invuln-=dt;

// Bullets
for(const b of bullets){const steps=4;const sx=b.vx*dt/steps,sy=(b.vy||0)*dt/steps,sz=b.vz*dt/steps;
b.st-=dt;if(b.st<=0&&b.isNuke){spP(b.mesh.position,0x888888,1,0,1);b.st=.04}
for(let s=0;s<steps&&b.life>0;s++){b.mesh.position.x+=sx;b.mesh.position.y+=sy;b.mesh.position.z+=sz;
if(b.mesh.position.y<=.5){if(b.isNuke){const p=b.mesh.position.clone();p.y=.5;detN(p)}b.life=0;break}
if(b.mesh.position.y<5){for(const o of obs)if(rcc(o.x,o.z,o.halfW,o.halfD,b.mesh.position.x,b.mesh.position.z,b.radius)){if(b.isNuke)detN(b.mesh.position.clone());else spP(b.mesh.position,0xaaaaaa,5);b.life=0;break}}
if(b.life<=0)break;
for(const e of enemies){const hd2=Math.hypot(b.mesh.position.x-e.tank.position.x,b.mesh.position.z-e.tank.position.z);if(hd2<e.radius+b.radius&&(b.mesh.position.y<6||!C.canFly)){if(b.isNuke){detN(b.mesh.position.clone());score+=25}else{e.hp-=(C.directDamage||1);if(e.hp<=0){spP(e.tank.position.clone().setY(1.5),0xff6644,20);score+=100}else spP(b.mesh.position,0xffaa66,6)}b.life=0;break}}}
if(!b.isNuke&&b.vy!==undefined){}else if(b.isNuke)b.vy-=6*dt;
b.life-=dt;if(Math.abs(b.mesh.position.x)>AR||Math.abs(b.mesh.position.z)>AR){if(b.isNuke)detN(b.mesh.position.clone());b.life=0}}

// Blasts
for(const bl of blasts){bl.time+=dt;bl.radius=Math.min(BMR,bl.radius+BES*dt);const t=bl.time;
const fs=Math.min(bl.radius*.7,C.maxFireScale||18);bl.fire.scale.set(fs,fs,fs);bl.fire.material.opacity=Math.max(0,1-t*.6);
const ss=1+t*4;bl.stem.scale.set(ss*.7,ss*3.5,ss*.7);bl.stem.position.y=ss*2;bl.stem.material.opacity=Math.max(0,.9-t*.3);
bl.cap.position.y=8+t*14;const cs=4+t*5;bl.cap.scale.set(cs,cs*.7,cs);bl.cap.material.opacity=Math.max(0,.92-t*.22);
const rs=bl.radius;bl.ring.scale.set(rs,rs,rs);bl.ring.material.opacity=Math.max(0,.9-t*.6);
bl.ring2.scale.set(rs*.7,rs*.7,rs*.7);bl.ring2.material.opacity=Math.max(0,.85-t*.8);
for(let i=0;i<enemies.length;i++){const e=enemies[i];if(bl.hitE.has(e))continue;if(Math.hypot(e.tank.position.x-bl.pos.x,e.tank.position.z-bl.pos.z)<=bl.radius){bl.hitE.add(e);e.hp=-99}}
// Player damage from own nuke?
if(!C.blastImmune&&invuln<=0){const dp=Math.hypot(player.position.x-bl.pos.x,player.position.z-bl.pos.z);if(dp<=Math.min(bl.radius,(C.selfDamageR||14))){lives--;invuln=1.4;camShake=Math.max(camShake,1.5);if(lives<=0){eg();return}}}}
for(let i=blasts.length-1;i>=0;i--)if(blasts[i].time>BDU){const bl=blasts[i];scene.remove(bl.fire);scene.remove(bl.stem);scene.remove(bl.cap);scene.remove(bl.ring);scene.remove(bl.ring2);blasts.splice(i,1)}

// Enemy bullets
for(const b of eBullets){b.mesh.position.x+=b.vx*dt;b.mesh.position.y+=(b.vy||0)*dt;b.mesh.position.z+=b.vz*dt;if(b.mesh.position.y<=.1){b.life=0;continue}for(const o of obs)if(b.mesh.position.y<4&&rcc(o.x,o.z,o.halfW,o.halfD,b.mesh.position.x,b.mesh.position.z,.2)){b.life=0;break}b.life-=dt;if(Math.abs(b.mesh.position.x)>AR||Math.abs(b.mesh.position.z)>AR)b.life=0}

// Enemy AI
for(const e of enemies){const t=e.tank,dx=player.position.x-t.position.x,dz=player.position.z-t.position.z,dist=Math.hypot(dx,dz);const da=Math.atan2(-dz,dx);let tb=da;if(dist<25)tb+=Math.PI/2;const d2=sad(tb,t.rotation.y);t.rotation.y+=Math.max(-ETR*dt,Math.min(ETR*dt,d2));const eh=t.rotation.y;tryM(t,Math.cos(eh)*e.speed*dt,-Math.sin(eh)*e.speed*dt,e.radius,0);t._turret.rotation.y=da-t.rotation.y;const nm=performance.now();if(nm-e.lastShot>1500+Math.random()*700&&dist<EFR){e.lastShot=nm;fE(e)}}
for(let i=enemies.length-1;i>=0;i--)if(enemies[i].hp<=0){score+=100;scene.remove(enemies[i].tank);enemies.splice(i,1)}

// Enemy bullets hit player
if(invuln<=0){for(const b of eBullets){if(b.life<=0)continue;const d=Math.hypot(b.mesh.position.x-player.position.x,b.mesh.position.z-player.position.z);const dy=Math.abs(b.mesh.position.y-(player.position.y+1.2));if(d<player._radius&&dy<2.2){b.life=0;lives--;invuln=1.4;camShake=Math.max(camShake,1);if(lives<=0){eg();return}break}}}

// Ramming
if(player.position.y<3){for(const e of enemies){const d=Math.hypot(e.tank.position.x-player.position.x,e.tank.position.z-player.position.z);if(d<e.radius+player._radius-.2&&invuln<=0){lives--;invuln=1.4;const a=Math.atan2(player.position.z-e.tank.position.z,player.position.x-e.tank.position.x);player.position.x+=Math.cos(a)*2;player.position.z+=Math.sin(a)*2;if(lives<=0){eg();return}}}}

// Cleanup
for(let i=bullets.length-1;i>=0;i--)if(bullets[i].life<=0){scene.remove(bullets[i].mesh);bullets.splice(i,1)}
for(let i=eBullets.length-1;i>=0;i--)if(eBullets[i].life<=0){scene.remove(eBullets[i].mesh);eBullets.splice(i,1)}
for(const p of particles){p.mesh.position.x+=p.vx*dt;p.mesh.position.y+=p.vy*dt;p.mesh.position.z+=p.vz*dt;p.vy-=12*dt;p.life-=dt*2.2}
for(let i=particles.length-1;i>=0;i--)if(particles[i].life<=0){scene.remove(particles[i].mesh);particles.splice(i,1)}

player.visible=!(invuln>0&&Math.floor(invuln*10)%2===0);

// Chase camera
const cd=C.camDist||14,ch=C.camHeight||9;
const bx=player.position.x-Math.cos(player.rotation.y)*cd;const bz=player.position.z+Math.sin(player.rotation.y)*cd;
const shX=(Math.random()-.5)*camShake,shY=(Math.random()-.5)*camShake,shZ=(Math.random()-.5)*camShake;
camera.position.lerp(new THREE.Vector3(bx+shX,player.position.y+ch+shY,bz+shZ),.12);
camera.lookAt(player.position.x,player.position.y+2,player.position.z);
if(enemies.length===0&&blasts.length===0)nW();uh();renderer.render(scene,camera);uEA();requestAnimationFrame(lp)}

function eg(){running=false;if(hd)hd.style.display='none';if(arSvg)arSvg.style.display='none';ov.style.display='flex';ov.innerHTML='<div style="font-size:22px;font-weight:600;margin-bottom:8px">Game Over</div><div style="font-size:14px;margin-bottom:16px;opacity:.9">Score: '+score+' · Wave '+wave+'</div><button onclick="sg()" style="background:#fff;color:#222;border:none;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer">Play Again</button>'}
window.sg=function(){ov.style.display='none';if(hd)hd.style.display='block';if(arSvg)arSvg.style.display='block';onR();reset();running=true;lt=performance.now();requestAnimationFrame(lp)};
document.getElementById('sb').addEventListener('click',sg);renderer.render(scene,camera);
})();
