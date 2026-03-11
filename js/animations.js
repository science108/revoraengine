/* ── GATEWAY CANVAS ANIMATION ── */
(function() {
  const canvas = document.getElementById('gw-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, cx, cy, t = 0, running = true;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cx = W / 2; cy = H / 2;
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    const orbitR = Math.min(W, H) * 0.21;
    const cylH = orbitR * 0.28;
    const cylW = orbitR * 0.17;
    const pistonH = cylH * 0.3;
    const pistonW = cylW * 0.68;
    const stroke = cylH * 0.22;
    const orbitAngle = t * 0.38;

    /* grid dots */
    ctx.fillStyle = 'rgba(0,212,255,0.05)';
    for (let x = 60; x < W; x += 60)
      for (let y = 60; y < H; y += 60) {
        ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI*2); ctx.fill();
      }

    /* outer rings */
    ctx.save();
    ctx.setLineDash([6,14]);
    ctx.beginPath(); ctx.arc(cx, cy, orbitR + cylH*0.6 + 22, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(0,212,255,0.22)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(cx, cy, orbitR + cylH*0.6 + 52, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(0,212,255,0.07)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();

    /* pulse */
    const pulse = (Math.sin(t * 1.1) + 1) / 2;
    ctx.beginPath(); ctx.arc(cx, cy, orbitR*1.65 + pulse*28, 0, Math.PI*2);
    ctx.strokeStyle = `rgba(0,212,255,${0.04*(1-pulse)})`; ctx.lineWidth = 1; ctx.stroke();

    /* rotating group */
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(orbitAngle);
    for (let i = 0; i < 3; i++) {
      const a = (i/3)*Math.PI*2;
      const lx = Math.cos(a)*orbitR, ly = Math.sin(a)*orbitR;
      ctx.beginPath(); ctx.moveTo(0,0);
      ctx.lineTo(Math.cos(a)*(orbitR-cylH*0.4), Math.sin(a)*(orbitR-cylH*0.4));
      ctx.strokeStyle = 'rgba(0,212,255,0.28)'; ctx.lineWidth = 1.5; ctx.stroke();

      const worldA = a + orbitAngle;
      const camVal = Math.sin(worldA);
      const isFiring = camVal > 0.8;
      ctx.save(); ctx.translate(lx, ly); ctx.rotate(a + Math.PI/2);
      if (isFiring) { ctx.shadowColor = '#F5A623'; ctx.shadowBlur = 20; }
      ctx.strokeStyle = isFiring ? 'rgba(245,166,35,0.65)' : 'rgba(0,212,255,0.32)';
      ctx.lineWidth = 1.5; ctx.strokeRect(-cylW/2, -cylH/2, cylW, cylH);
      ctx.shadowBlur = 0;
      const py = camVal * stroke;
      ctx.fillStyle = isFiring ? 'rgba(245,166,35,0.55)' : 'rgba(0,212,255,0.4)';
      ctx.strokeStyle = isFiring ? 'rgba(245,166,35,0.85)' : 'rgba(0,212,255,0.75)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.rect(-pistonW/2, py-pistonH/2, pistonW, pistonH);
      ctx.fill(); ctx.stroke();
      ctx.restore();
    }
    /* hub */
    ctx.beginPath(); ctx.arc(0,0,14,0,Math.PI*2);
    ctx.fillStyle='rgba(0,212,255,0.12)'; ctx.fill();
    ctx.strokeStyle='rgba(0,212,255,0.45)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(0,0,4,0,Math.PI*2);
    ctx.fillStyle='rgba(0,212,255,0.75)'; ctx.fill();
    ctx.restore();

    t += 0.016;
    requestAnimationFrame(draw);
  }
  draw();

  /* ── ENTER SITE ── */
  window.enterSite = function() {
    const overlay = document.getElementById('gateway-overlay');
    overlay.classList.add('hide');
    running = false;
    setTimeout(() => {
      overlay.style.display = 'none';
      /* re-apply translations to main page after gateway disappears */
      if (window.setLang && window.__currentLang) {
        window.setLang(window.__currentLang);
      }
    }, 900);
  };
})();

/* ══════════════════════════ */

/* ═══ SIEMENS HALSKE canvas animations ═══ */
(function(){

  /* ── SH.IIIa — rotating cylinder block ── */
  const shC = document.getElementById('shCanvas');
  if(!shC) return;
  const shctx = shC.getContext('2d');
  const SW = shC.width, SH = shC.height;
  const scx = SW/2, scy = SH/2 + 10;

  function drawSH(t){
    shctx.clearRect(0,0,SW,SH);

    // grid bg
    shctx.strokeStyle='rgba(245,166,35,0.05)';
    shctx.lineWidth=1;
    for(let x=0;x<SW;x+=30){shctx.beginPath();shctx.moveTo(x,0);shctx.lineTo(x,SH);shctx.stroke();}
    for(let y=0;y<SH;y+=30){shctx.beginPath();shctx.moveTo(0,y);shctx.lineTo(SW,y);shctx.stroke();}

    const nCyl = 7; // 7 cylinders radially arranged
    const blockR = 88; // block outer radius
    const cylL = 46;   // cylinder length
    const cylW = 14;   // cylinder width
    const blockRot = t * 0.7; // block rotation

    // heat glow — builds up
    const heatPhase = (Math.sin(t*0.4)+1)/2;
    const heatR = 60 + heatPhase * 30;
    const heatGrad = shctx.createRadialGradient(scx,scy,0,scx,scy,heatR);
    heatGrad.addColorStop(0,`rgba(255,80,0,${0.08+heatPhase*0.12})`);
    heatGrad.addColorStop(1,'rgba(255,80,0,0)');
    shctx.fillStyle=heatGrad;
    shctx.beginPath();shctx.arc(scx,scy,heatR+20,0,Math.PI*2);shctx.fill();

    // rotating block
    shctx.save();
    shctx.translate(scx, scy);
    shctx.rotate(blockRot);

    // central hub
    shctx.beginPath();
    shctx.arc(0,0,18,0,Math.PI*2);
    shctx.fillStyle='rgba(245,166,35,0.2)';
    shctx.strokeStyle='rgba(245,166,35,0.5)';
    shctx.lineWidth=2;
    shctx.fill();shctx.stroke();

    // cylinders
    for(let i=0;i<nCyl;i++){
      const a = (i/nCyl)*Math.PI*2;
      const cx2 = Math.cos(a)*blockR*0.55;
      const cy2 = Math.sin(a)*blockR*0.55;

      shctx.save();
      shctx.translate(cx2,cy2);
      shctx.rotate(a + Math.PI/2);

      // cylinder body
      shctx.fillStyle='rgba(245,166,35,0.08)';
      shctx.strokeStyle='rgba(245,166,35,0.35)';
      shctx.lineWidth=1.5;
      shctx.beginPath();
      shctx.rect(-cylW/2,-cylL/2,cylW,cylL);
      shctx.fill();shctx.stroke();

      // piston inside — stationary relative to world (counter-rotate)
      const pistonY = Math.cos(t*2.5+i*0.9)*10;
      shctx.fillStyle='rgba(245,166,35,0.3)';
      shctx.strokeStyle='rgba(245,166,35,0.6)';
      shctx.lineWidth=1;
      shctx.beginPath();
      shctx.rect(-cylW/2+2, pistonY-5, cylW-4, 10);
      shctx.fill();shctx.stroke();

      // heat mark at top
      shctx.fillStyle=`rgba(255,${60+Math.sin(t+i)*40},0,${0.3+heatPhase*0.4})`;
      shctx.beginPath();shctx.arc(0,-cylL/2,5,0,Math.PI*2);shctx.fill();

      shctx.restore();
    }

    // outer block ring
    shctx.beginPath();
    shctx.arc(0,0,blockR,0,Math.PI*2);
    shctx.strokeStyle='rgba(245,166,35,0.25)';
    shctx.lineWidth=2;
    shctx.stroke();

    shctx.restore(); // end rotation

    // stationary crankshaft center
    shctx.beginPath();
    shctx.arc(scx,scy,7,0,Math.PI*2);
    shctx.fillStyle='rgba(255,80,0,0.6)';
    shctx.fill();

    // "HEAT PROBLEM" warning pulse
    if(heatPhase > 0.7){
      shctx.save();
      shctx.globalAlpha = (heatPhase-0.7)/0.3;
      shctx.font='bold 10px JetBrains Mono, monospace';
      shctx.fillStyle='rgba(255,80,0,0.8)';
      shctx.textAlign='center';
      shctx.fillText('⚠ PRZEGRZANIE', scx, scy + blockR + 24);
      shctx.restore();
    }

    // rotation label
    shctx.font='9px JetBrains Mono,monospace';
    shctx.fillStyle='rgba(245,166,35,0.4)';
    shctx.textAlign='left';
    shctx.fillText('⟳ OBRACA SIĘ CAŁY BLOK', 12, SH-12);
  }

  /* ── RCPM 2025 ── */
  const rcC = document.getElementById('shRcpmCanvas');
  const rcctx = rcC.getContext('2d');
  const RW = rcC.width, RH = rcC.height;
  const rcx = RW/2, rcy = RH/2 + 10;

  function drawShRCPM(t){
    rcctx.clearRect(0,0,RW,RH);

    // grid
    rcctx.strokeStyle='rgba(0,212,255,0.04)';
    rcctx.lineWidth=1;
    for(let x=0;x<RW;x+=30){rcctx.beginPath();rcctx.moveTo(x,0);rcctx.lineTo(x,RH);rcctx.stroke();}
    for(let y=0;y<RH;y+=30){rcctx.beginPath();rcctx.moveTo(0,y);rcctx.lineTo(RW,y);rcctx.stroke();}

    const outerR = 92;
    const cylR = 66;

    // outer housing — static
    rcctx.beginPath();
    rcctx.arc(rcx,rcy,outerR+12,0,Math.PI*2);
    rcctx.strokeStyle='rgba(0,212,255,0.18)';
    rcctx.lineWidth=2;
    rcctx.stroke();
    // housing ticks
    for(let i=0;i<40;i++){
      const a=(i/40)*Math.PI*2;
      rcctx.beginPath();
      rcctx.moveTo(rcx+Math.cos(a)*(outerR+8),rcy+Math.sin(a)*(outerR+8));
      rcctx.lineTo(rcx+Math.cos(a)*(outerR+14),rcy+Math.sin(a)*(outerR+14));
      rcctx.strokeStyle='rgba(0,212,255,0.15)';
      rcctx.lineWidth=2;
      rcctx.stroke();
    }

    // rotating cylinder assembly
    rcctx.save();
    rcctx.translate(rcx,rcy);
    rcctx.rotate(t*0.9);

    // AKS glow — cool, controlled
    const aksGrad = rcctx.createRadialGradient(0,0,0,0,0,cylR);
    aksGrad.addColorStop(0,'rgba(0,212,255,0.08)');
    aksGrad.addColorStop(0.6,'rgba(0,232,122,0.04)');
    aksGrad.addColorStop(1,'rgba(0,212,255,0)');
    rcctx.fillStyle=aksGrad;
    rcctx.beginPath();rcctx.arc(0,0,cylR,0,Math.PI*2);rcctx.fill();

    // cylinder body
    rcctx.beginPath();
    rcctx.arc(0,0,cylR,0,Math.PI*2);
    rcctx.strokeStyle='rgba(0,212,255,0.5)';
    rcctx.lineWidth=2.5;
    rcctx.stroke();

    // bore walls
    rcctx.strokeStyle='rgba(0,212,255,0.2)';
    rcctx.lineWidth=1.5;
    rcctx.beginPath();rcctx.moveTo(-16,-cylR+8);rcctx.lineTo(-16,cylR-8);rcctx.stroke();
    rcctx.beginPath();rcctx.moveTo(16,-cylR+8);rcctx.lineTo(16,cylR-8);rcctx.stroke();

    // piston — radial motion
    const pOffset = Math.sin(t*3)*16;
    rcctx.fillStyle='rgba(0,212,255,0.25)';
    rcctx.strokeStyle='rgba(0,212,255,0.7)';
    rcctx.lineWidth=2;
    rcctx.beginPath();rcctx.rect(-14,pOffset-10,28,20);
    rcctx.fill();rcctx.stroke();

    // AKS combustion zone — top of bore
    const aksGlow = rcctx.createRadialGradient(0,-cylR+18,0,0,-cylR+18,20);
    aksGlow.addColorStop(0,'rgba(0,232,122,0.6)');
    aksGlow.addColorStop(1,'rgba(0,232,122,0)');
    rcctx.fillStyle=aksGlow;
    rcctx.beginPath();rcctx.arc(0,-cylR+18,20,0,Math.PI*2);rcctx.fill();

    // spoke lines
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2;
      rcctx.strokeStyle='rgba(0,212,255,0.08)';
      rcctx.lineWidth=1;
      rcctx.beginPath();rcctx.moveTo(0,0);rcctx.lineTo(Math.cos(a)*cylR,Math.sin(a)*cylR);rcctx.stroke();
    }

    // center shaft
    rcctx.beginPath();rcctx.arc(0,0,9,0,Math.PI*2);
    rcctx.fillStyle='rgba(0,212,255,0.7)';
    rcctx.fill();

    rcctx.restore();

    // rotation arrow
    const arA = t*0.9+0.5;
    rcctx.beginPath();
    rcctx.arc(rcx,rcy,outerR+22,arA,arA+1.5);
    rcctx.strokeStyle='rgba(0,212,255,0.45)';
    rcctx.lineWidth=2;
    rcctx.stroke();
    const ahX=rcx+Math.cos(arA+1.5)*(outerR+22);
    const ahY=rcy+Math.sin(arA+1.5)*(outerR+22);
    const ahAng=arA+1.5+Math.PI/2;
    rcctx.beginPath();
    rcctx.moveTo(ahX,ahY);
    rcctx.lineTo(ahX+Math.cos(ahAng-0.4)*9,ahY+Math.sin(ahAng-0.4)*9);
    rcctx.lineTo(ahX+Math.cos(ahAng+0.4)*9,ahY+Math.sin(ahAng+0.4)*9);
    rcctx.fillStyle='rgba(0,212,255,0.5)';
    rcctx.fill();

    // "AKS AKTYWNA" label
    rcctx.font='9px JetBrains Mono,monospace';
    rcctx.fillStyle='rgba(0,232,122,0.55)';
    rcctx.textAlign='center';
    rcctx.fillText('✓ AKS AKTYWNA · CIEPŁO POD KONTROLĄ', rcx, rcy+outerR+30);

    rcctx.font='9px JetBrains Mono,monospace';
    rcctx.fillStyle='rgba(0,212,255,0.4)';
    rcctx.textAlign='left';
    rcctx.fillText('⟳ CYLINDER OBRACA SIĘ', 12, RH-12);
  }

  // loop
  let t0=null;
  function loop(ts){
    if(!t0)t0=ts;
    const t=(ts-t0)*0.001;
    drawSH(t);
    drawShRCPM(t);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // flip cards — touch support
  document.querySelectorAll('.sh-flip').forEach(card=>{
    card.addEventListener('click',()=>card.classList.toggle('flipped'));
  });

})();

/* ══════════════════════════ */

(function(){
          const canvas = document.getElementById('pistonCanvas2');
          if(!canvas) return;
          const ctx = canvas.getContext('2d');
          const W = canvas.width, H = canvas.height;
          // Centre of drawing area — same logic as RCPM (cy = H/2 - 10)
          const cx = W / 2, cy = H / 2 - 10;

          const slider   = document.getElementById('pistonRpmSlider2');
          const rpmValEl = document.getElementById('pistonRpmVal2');
          const forceBar = document.getElementById('pistonForceBar2');
          const forceVal = document.getElementById('pistonForceVal2');

          let rpm = 1000, phase = 0, lastTime = null;
          const MAX_RPM = 9000, WALL_RPM = 6500;

          slider.addEventListener('input', function() {
            rpm = parseInt(this.value);
            rpmValEl.textContent = rpm.toLocaleString('pl-PL') + ' RPM';
            const pct = Math.min(100, Math.pow(rpm / MAX_RPM, 2) * 100);
            forceBar.style.width = Math.max(2, pct) + '%';
            forceVal.textContent = Math.max(1, Math.round(Math.pow(rpm/1000, 2))) + '×';
            forceBar.classList.toggle('rpm-force-crit', rpm >= WALL_RPM);
          });

          // ── Layout — mirror RCPM sizing (R_outer = 64) ──
          // Cylinder spans from top of "ring" area to bottom, centred on cx
          const R = 64;           // same as RCPM R_outer — defines total drawing radius
          const cylW  = 24;       // bore width
          const cylH  = R * 1.4;  // tall cylinder filling the vertical space
          const cylX  = cx - cylW / 2;
          const cylTop = cy - R + 6;         // top of cylinder = top of ring area
          const cylBot = cylTop + cylH;      // bottom of cylinder body
          const pistH  = 18;                 // piston height
          // Crankshaft sits below the cylinder, within total height
          const crankCy = cylBot + 18;
          const crankR  = 14;
          // Force arrows — RIGHT side, same x-offset as RCPM neutralisation label
          const arrowX  = cx + R + 2;        // rightmost useful pixel (matching RCPM label zone)
          const arrowX2 = cx - R - 2;        // mirrored left side (for visual balance)

          function drawPiston(ts) {
            if (lastTime === null) lastTime = ts;
            const dt = Math.min(0.05, (ts - lastTime) / 1000);
            lastTime = ts;

            const visualRPS = 0.5 + (rpm / MAX_RPM) * 3.0;
            phase += visualRPS * 2 * Math.PI * dt;

            ctx.clearRect(0, 0, W, H);

            const rpmFrac = rpm / MAX_RPM;
            const wallFrac = Math.max(0, (rpm - WALL_RPM) / (MAX_RPM - WALL_RPM));

            // Red BG tint
            if (rpm >= WALL_RPM) {
              ctx.fillStyle = `rgba(255,20,20,${0.02 + wallFrac * 0.07})`;
              ctx.fillRect(0, 0, W, H);
            }

            // ── Outer boundary ring (matches RCPM outer ring visually) ──
            ctx.save();
            ctx.strokeStyle = rpm >= WALL_RPM ? `rgba(255,60,60,${0.15 + wallFrac*0.3})` : 'rgba(255,80,80,0.13)';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.stroke();
            // Hatch marks on outer ring
            ctx.strokeStyle = rpm >= WALL_RPM ? 'rgba(255,60,60,0.1)' : 'rgba(255,80,80,0.07)';
            ctx.lineWidth = 1;
            for (let i = 0; i < 20; i++) {
              const a = (i / 20) * Math.PI * 2;
              ctx.beginPath();
              ctx.moveTo(cx + (R - 1) * Math.cos(a), cy + (R - 1) * Math.sin(a));
              ctx.lineTo(cx + (R + 7) * Math.cos(a), cy + (R + 7) * Math.sin(a));
              ctx.stroke();
            }
            ctx.restore();

            // ── Vertical dashed axis (mirrors RCPM axis lines) ──
            ctx.save();
            ctx.strokeStyle = 'rgba(255,80,80,0.2)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath(); ctx.moveTo(cx, cy - R + 3); ctx.lineTo(cx, cy + R - 3); ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();

            // ── Cylinder walls ──
            const strokeAlpha = rpm >= WALL_RPM ? 0.7 : 0.42;
            ctx.strokeStyle = `rgba(255,70,70,${strokeAlpha})`;
            ctx.fillStyle = 'rgba(255,20,20,0.03)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.rect(cylX, cylTop, cylW, cylH);
            ctx.fill();
            ctx.stroke();

            // Hatch marks on cylinder sides
            ctx.strokeStyle = 'rgba(255,80,80,0.13)';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 7; i++) {
              const hy = cylTop + i * (cylH / 7);
              ctx.beginPath(); ctx.moveTo(cylX - 6, hy); ctx.lineTo(cylX, hy); ctx.stroke();
              ctx.beginPath(); ctx.moveTo(cylX + cylW, hy); ctx.lineTo(cylX + cylW + 6, hy); ctx.stroke();
            }

            // ── Piston ──
            const pistTravel = cylH - pistH - 4;
            const pistY = cylTop + 2 + (pistTravel / 2) * (1 + Math.sin(phase - Math.PI / 2));

            const pr = Math.min(255, 190 + Math.round(rpmFrac * 65));
            const pg = Math.max(0, Math.round(70 - rpmFrac * 65));
            ctx.fillStyle = `rgba(${pr},${pg},${pg},0.9)`;
            ctx.strokeStyle = 'rgba(255,120,120,0.95)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.rect(cylX + 2, pistY, cylW - 4, pistH);
            ctx.fill();
            ctx.stroke();
            // Piston rings
            ctx.strokeStyle = 'rgba(255,220,220,0.3)';
            ctx.lineWidth = 0.8;
            [pistY + 5, pistY + 12].forEach(ry => {
              ctx.beginPath();
              ctx.moveTo(cylX + 3, ry); ctx.lineTo(cylX + cylW - 3, ry); ctx.stroke();
            });

            // ── Crankshaft ──
            ctx.strokeStyle = 'rgba(255,80,80,0.3)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(cx, crankCy, crankR, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = 'rgba(255,80,80,0.55)';
            ctx.beginPath(); ctx.arc(cx, crankCy, 3, 0, Math.PI * 2); ctx.fill();

            const pinX = cx + crankR * Math.sin(phase);
            const pinY = crankCy - crankR * Math.cos(phase);
            ctx.fillStyle = 'rgba(255,130,130,0.85)';
            ctx.beginPath(); ctx.arc(pinX, pinY, 3.5, 0, Math.PI * 2); ctx.fill();

            // ── Con-rod ──
            ctx.strokeStyle = 'rgba(255,80,80,0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx, pistY + pistH);
            ctx.lineTo(pinX, pinY);
            ctx.stroke();

            // ── Force arrows ── RIGHT side, scale with RPM²
            const arrowAlpha = Math.min(0.95, 0.1 + rpmFrac * 1.3);
            const maxArrow = R - 10;
            const arrowLen = Math.round(6 + rpmFrac * maxArrow);
            const arrowThick = Math.max(1.5, rpmFrac * 4);
            const arrowMidY = cy; // vertical centre of canvas

            ctx.strokeStyle = `rgba(255,50,50,${arrowAlpha})`;
            ctx.fillStyle   = `rgba(255,50,50,${arrowAlpha})`;
            ctx.lineWidth   = arrowThick;

            // UP arrow
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowMidY);
            ctx.lineTo(arrowX, arrowMidY - arrowLen);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowMidY - arrowLen);
            ctx.lineTo(arrowX - 5, arrowMidY - arrowLen + 9);
            ctx.lineTo(arrowX + 5, arrowMidY - arrowLen + 9);
            ctx.closePath(); ctx.fill();

            // DOWN arrow
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowMidY);
            ctx.lineTo(arrowX, arrowMidY + arrowLen);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowMidY + arrowLen);
            ctx.lineTo(arrowX - 5, arrowMidY + arrowLen - 9);
            ctx.lineTo(arrowX + 5, arrowMidY + arrowLen - 9);
            ctx.closePath(); ctx.fill();

            // F=mv² label — above arrows, never inside ring
            ctx.font = `bold 7px JetBrains Mono, monospace`;
            ctx.fillStyle = `rgba(255,70,70,${arrowAlpha * 0.9})`;
            ctx.textAlign = 'left';
            ctx.fillText('F=mv²', arrowX - 10, arrowMidY - arrowLen - 6);

            // ── Labels ──
            ctx.font = '7px JetBrains Mono, monospace';
            ctx.textAlign = 'center';

            // Top — housing label (mirrors RCPM "OBUDOWA")
            ctx.fillStyle = 'rgba(255,80,80,0.38)';
            ctx.fillText('OBUDOWA (klasyczna)', cx, cy - R - 9);

            // Bottom — RPM display (mirrors RCPM RPM display below ring)
            const rpmY = cy + R + 15;
            if (rpmY < H - 2) {
              ctx.font = `bold ${rpm >= 6500 ? 10 : 9}px JetBrains Mono, monospace`;
              ctx.fillStyle = rpm >= WALL_RPM
                ? `rgba(255,60,60,${0.7 + wallFrac * 0.3})`
                : `rgba(255,100,100,${0.4 + rpmFrac * 0.5})`;
              const label = rpm >= WALL_RPM ? '⚠ ' + rpm.toLocaleString('pl-PL') : rpm.toLocaleString('pl-PL');
              ctx.fillText(label + ' RPM ↕', cx, rpmY);
            }

            requestAnimationFrame(drawPiston);
          }

          requestAnimationFrame(drawPiston);
        })();

/* ══════════════════════════ */

(function(){
          const canvas = document.getElementById('rcpmCanvas');
          if(!canvas) return;
          const ctx = canvas.getContext('2d');
          const W = canvas.width, H = canvas.height;
          const cx = W/2, cy = H/2 - 10;

          const slider = document.getElementById('rcpmRpmSlider');
          const rpmValEl = document.getElementById('rcpmRpmVal');
          const freeBar = document.getElementById('rcpmFreeBar');
          const freeValEl = document.getElementById('rcpmFreeVal');

          let rcpmRpm = 1000;
          let isPeak = false; // hysteresis state — only flip with buffer zone
          const PEAK_ON  = 19000; // enter peak mode at this value
          const PEAK_OFF = 18400; // exit peak mode only when dropping below this

          slider.addEventListener('input', function(){
            rcpmRpm = parseInt(this.value);
            rpmValEl.textContent = rcpmRpm.toLocaleString('pl-PL') + ' RPM';
            const pct = Math.min(100, (rcpmRpm / 22000) * 100);
            freeBar.style.width = pct + '%';

            // Hysteresis: flip state only when clearly crossing threshold
            if (!isPeak && rcpmRpm >= PEAK_ON)  isPeak = true;
            if ( isPeak && rcpmRpm <  PEAK_OFF) isPeak = false;

            if(isPeak) {
              freeValEl.textContent = '🚀 CEL OSIĄGNIĘTY: ' + rcpmRpm.toLocaleString('pl-PL') + ' RPM';
              freeBar.classList.add('rpm-force-peak');
            } else {
              freeBar.classList.remove('rpm-force-peak');
              freeValEl.textContent = '↑ brak limitu';
            }
          });

          // Dimensions from patent drawings
          const R_outer = 64;
          const R_disk  = 24;
          const diskEcc = 15;
          const cylW    = 8;
          const cylH    = 34;
          const pistW   = 7;
          const pistH   = 12;

          let angle = 0;

          function drawFrame() {
            ctx.clearRect(0, 0, W, H);

            // Visual speed scales with slider RPM (capped for visibility)
            const visualOmega = Math.min(0.18, 0.01 + (rcpmRpm / 22000) * 0.17);

            // Outer housing ring (static)
            ctx.save();
            ctx.strokeStyle = 'rgba(0,212,255,0.2)';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(cx, cy, R_outer, 0, Math.PI*2);
            ctx.stroke();
            // hatching marks
            ctx.strokeStyle = 'rgba(0,212,255,0.08)';
            ctx.lineWidth = 1;
            for(let i=0;i<20;i++){
              const a = (i/20)*Math.PI*2;
              ctx.beginPath();
              ctx.moveTo(cx+(R_outer-1)*Math.cos(a), cy+(R_outer-1)*Math.sin(a));
              ctx.lineTo(cx+(R_outer+7)*Math.cos(a), cy+(R_outer+7)*Math.sin(a));
              ctx.stroke();
            }
            ctx.restore();

            // Rotating assembly
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);

            // Axis lines (dashed)
            ctx.strokeStyle = 'rgba(0,212,255,0.2)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4,4]);
            ctx.beginPath();
            ctx.moveTo(0, -R_outer+3); ctx.lineTo(0, R_outer-3); ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-R_outer+3, 0); ctx.lineTo(R_outer-3, 0); ctx.stroke();
            ctx.setLineDash([]);

            // Eccentric disk
            const diskCx = diskEcc * Math.cos(-angle * 0.5);
            const diskCy = diskEcc * Math.sin(-angle * 0.5);
            ctx.save();
            ctx.shadowColor = 'rgba(0,212,255,0.2)';
            ctx.shadowBlur = 8;
            ctx.fillStyle = 'rgba(120,150,170,0.2)';
            ctx.strokeStyle = 'rgba(0,212,255,0.4)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(diskCx, diskCy, R_disk, 0, Math.PI*2);
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(0,212,255,0.8)';
            ctx.beginPath();
            ctx.arc(diskCx, diskCy, 2.5, 0, Math.PI*2);
            ctx.fill();
            ctx.restore();

            // Cylinder slots
            ctx.fillStyle = 'rgba(0,212,255,0.05)';
            ctx.strokeStyle = 'rgba(0,212,255,0.3)';
            ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.rect(-cylW/2, -R_outer+3, cylW, cylH); ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.rect(-cylW/2, R_outer-3-cylH, cylW, cylH); ctx.fill(); ctx.stroke();

            // Piston positions driven by eccentric disk
            const pistTopY = diskCy - R_disk - pistH/2;
            const pistBotY = diskCy + R_disk + pistH/2;
            const py_top = Math.min(-pistH, Math.max(-R_outer+8+pistH, pistTopY));
            const py_bot = Math.max(pistH,  Math.min(R_outer-8-pistH, pistBotY));

            // Glow intensity scales with RPM
            const glowAlpha = Math.min(0.9, 0.2 + (rcpmRpm/22000)*0.7);

            function drawPiston(x, y, w, h) {
              ctx.save();
              ctx.shadowColor = `rgba(0,212,255,${glowAlpha * 0.6})`;
              ctx.shadowBlur = 6 + (rcpmRpm/22000)*12;
              ctx.fillStyle = `rgba(0,${Math.round(160+glowAlpha*50)},255,${0.5+glowAlpha*0.3})`;
              ctx.strokeStyle = `rgba(0,212,255,${0.6+glowAlpha*0.3})`;
              ctx.lineWidth = 1;
              const r = 2;
              ctx.beginPath();
              ctx.roundRect(x-w/2, y-h/2, w, h, r);
              ctx.fill();
              ctx.stroke();
              ctx.strokeStyle = 'rgba(255,255,255,0.2)';
              ctx.lineWidth = 0.7;
              [y-h/4, y+h/4].forEach(ry=>{
                ctx.beginPath();
                ctx.moveTo(x-w/2+1, ry); ctx.lineTo(x+w/2-1, ry); ctx.stroke();
              });
              ctx.restore();
            }

            drawPiston(0, py_top, pistW, pistH);
            drawPiston(0, py_bot, pistW, pistH);

            // Connecting rods
            ctx.strokeStyle = 'rgba(0,212,255,0.35)';
            ctx.lineWidth = 1;
            ctx.setLineDash([2,3]);
            ctx.beginPath();
            ctx.moveTo(0, py_top+pistH/2); ctx.lineTo(diskCx, diskCy-R_disk); ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, py_bot-pistH/2); ctx.lineTo(diskCx, diskCy+R_disk); ctx.stroke();
            ctx.setLineDash([]);

            // Main shaft
            ctx.fillStyle = 'rgba(0,212,255,0.95)';
            ctx.beginPath(); ctx.arc(0, 0, 3.5, 0, Math.PI*2); ctx.fill();
            ctx.strokeStyle = 'rgba(0,212,255,0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI*2); ctx.stroke();

            // Rotation arrow
            const arrowR = R_outer - 10;
            ctx.strokeStyle = `rgba(0,212,255,${0.4+glowAlpha*0.4})`;
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.arc(0, 0, arrowR, -Math.PI*0.2, Math.PI*0.55);
            ctx.stroke();
            const aA = Math.PI*0.55;
            const ax = arrowR*Math.cos(aA), ay = arrowR*Math.sin(aA);
            const t = aA + Math.PI/2;
            ctx.fillStyle = `rgba(0,212,255,${0.4+glowAlpha*0.4})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(ax-6*Math.cos(t-0.4), ay-6*Math.sin(t-0.4));
            ctx.lineTo(ax-6*Math.cos(t+0.4), ay-6*Math.sin(t+0.4));
            ctx.closePath(); ctx.fill();

            ctx.restore(); // end rotating assembly

            // Static labels — above and below the ring, in clear space
            ctx.font = '7px JetBrains Mono, monospace';
            ctx.fillStyle = 'rgba(0,212,255,0.38)';
            ctx.textAlign = 'center';
            // Top label — above ring
            ctx.fillText('OBUDOWA (nieruchoma)', cx, cy - R_outer - 9);

            // Neutralization label — RIGHT of ring, vertically centred, never inside ring
            if(rcpmRpm >= 3000) {
              const labelX = cx + R_outer + 6;
              ctx.save();
              ctx.font = `bold 7px JetBrains Mono, monospace`;
              ctx.fillStyle = `rgba(0,212,255,${Math.min(0.85, glowAlpha)})`;
              ctx.textAlign = 'left';
              ctx.fillText('F↑+F↓', labelX, cy - 5);
              ctx.fillText('= 0', labelX, cy + 5);
              ctx.restore();
            }

            // RPM display — in a dedicated strip BELOW the ring
            const rpmY = cy + R_outer + 15;
            if(rpmY < H - 2) {
              const displayRpm = isPeak
                ? '🚀 ' + rcpmRpm.toLocaleString('pl-PL')
                : rcpmRpm.toLocaleString('pl-PL');
              ctx.font = 'bold 10px JetBrains Mono, monospace'; // fixed size — no jitter
              ctx.fillStyle = isPeak
                ? 'rgba(80,255,160,0.95)'
                : `rgba(0,212,255,${0.45 + glowAlpha * 0.45})`;
              ctx.textAlign = 'center';
              ctx.fillText(displayRpm + ' RPM ↻', cx, rpmY);
            }

            angle += visualOmega;
            requestAnimationFrame(drawFrame);
          }

          // Polyfill roundRect
          if (!CanvasRenderingContext2D.prototype.roundRect) {
            CanvasRenderingContext2D.prototype.roundRect = function(x,y,w,h,r){
              this.beginPath();
              this.moveTo(x+r,y); this.lineTo(x+w-r,y);
              this.quadraticCurveTo(x+w,y,x+w,y+r);
              this.lineTo(x+w,y+h-r);
              this.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
              this.lineTo(x+r,y+h);
              this.quadraticCurveTo(x,y+h,x,y+h-r);
              this.lineTo(x,y+r);
              this.quadraticCurveTo(x,y,x+r,y);
              this.closePath();
            };
          }

          drawFrame();
        })();

/* ══════════════════════════ */

(function(){
  /* ── PORSCHE — hypocycloid animation ── */
  const pc = document.getElementById('porscheCanvas');
  if(!pc) return;
  const pctx = pc.getContext('2d');
  const W = pc.width, H = pc.height;
  const cx = W/2, cy = H/2 + 10;
  let pAngle = 0;

  function drawPorsche(t){
    pctx.clearRect(0,0,W,H);

    // dark bg grid
    pctx.strokeStyle = 'rgba(255,48,48,0.06)';
    pctx.lineWidth = 1;
    for(let x=0;x<W;x+=30){ pctx.beginPath();pctx.moveTo(x,0);pctx.lineTo(x,H);pctx.stroke(); }
    for(let y=0;y<H;y+=30){ pctx.beginPath();pctx.moveTo(0,y);pctx.lineTo(W,y);pctx.stroke(); }

    // annulus (outer ring gear)
    const R = 90; // annulus radius
    const r = R * 3/5; // planet wheel radius (3:5 ratio)
    const e = 11; // eccentricity

    // draw annulus
    pctx.beginPath();
    pctx.arc(cx, cy, R+14, 0, Math.PI*2);
    pctx.strokeStyle='rgba(255,48,48,0.25)';
    pctx.lineWidth=2;
    pctx.stroke();

    // draw planet gear teeth (simplified)
    for(let i=0;i<32;i++){
      const a = (i/32)*Math.PI*2;
      const r1=R+10, r2=R+16;
      pctx.beginPath();
      pctx.moveTo(cx+Math.cos(a)*r1, cy+Math.sin(a)*r1);
      pctx.lineTo(cx+Math.cos(a)*r2, cy+Math.sin(a)*r2);
      pctx.strokeStyle='rgba(255,48,48,0.3)';
      pctx.lineWidth=2.5;
      pctx.stroke();
    }

    // draw annulus inner circle
    pctx.beginPath();
    pctx.arc(cx, cy, R, 0, Math.PI*2);
    pctx.strokeStyle='rgba(255,48,48,0.15)';
    pctx.lineWidth=1;
    pctx.stroke();

    // hypocycloid path trace (3 revolutions = full cycle)
    pctx.beginPath();
    let first=true;
    for(let a=0;a<Math.PI*6;a+=0.04){
      const px = cx + (R-r)*Math.cos(a) + e*Math.cos((R-r)*a/r);
      const py = cy + (R-r)*Math.sin(a) - e*Math.sin((R-r)*a/r);
      if(first){pctx.moveTo(px,py);first=false;}else pctx.lineTo(px,py);
    }
    pctx.strokeStyle='rgba(255,48,48,0.3)';
    pctx.lineWidth=1;
    pctx.stroke();

    // planet wheel center
    const pcx2 = cx + (R-r)*Math.cos(t);
    const pcy2 = cy + (R-r)*Math.sin(t);

    // planet wheel
    pctx.beginPath();
    pctx.arc(pcx2, pcy2, r, 0, Math.PI*2);
    pctx.strokeStyle='rgba(255,80,80,0.5)';
    pctx.lineWidth=1.5;
    pctx.stroke();
    pctx.fillStyle='rgba(255,48,48,0.08)';
    pctx.fill();

    // planet teeth
    for(let i=0;i<18;i++){
      const a = (i/18)*Math.PI*2 + t*(R/r);
      const r1=r-2, r2=r+3;
      pctx.beginPath();
      pctx.moveTo(pcx2+Math.cos(a)*r1, pcy2+Math.sin(a)*r1);
      pctx.lineTo(pcx2+Math.cos(a)*r2, pcy2+Math.sin(a)*r2);
      pctx.strokeStyle='rgba(255,80,80,0.4)';
      pctx.lineWidth=2;
      pctx.stroke();
    }

    // connecting rod pin (eccentric)
    const pinA = t*(R/r);
    const pinX = pcx2 + e*Math.cos(pinA);
    const pinY = pcy2 + e*Math.sin(pinA);

    // piston position (y projection of pin)
    const pistonY = cy - 120 + (pinY - pcy2) * 0.5;
    const pistonX = cx;

    // connecting rod
    pctx.beginPath();
    pctx.moveTo(pinX, pinY);
    pctx.lineTo(pistonX, pistonY);
    pctx.strokeStyle='rgba(255,120,120,0.6)';
    pctx.lineWidth=3;
    pctx.stroke();

    // piston
    pctx.fillStyle='rgba(255,60,60,0.15)';
    pctx.strokeStyle='rgba(255,80,80,0.55)';
    pctx.lineWidth=2;
    pctx.beginPath();
    pctx.rect(pistonX-24, pistonY-20, 48, 36);
    pctx.fill(); pctx.stroke();

    // cylinder walls
    pctx.strokeStyle='rgba(255,48,48,0.2)';
    pctx.lineWidth=1.5;
    pctx.beginPath(); pctx.moveTo(pistonX-28, cy-135); pctx.lineTo(pistonX-28, cy-80); pctx.stroke();
    pctx.beginPath(); pctx.moveTo(pistonX+28, cy-135); pctx.lineTo(pistonX+28, cy-80); pctx.stroke();

    // crankshaft center
    pctx.beginPath();
    pctx.arc(cx, cy, 6, 0, Math.PI*2);
    pctx.fillStyle='rgba(255,80,80,0.6)';
    pctx.fill();

    // eccentric pin dot
    pctx.beginPath();
    pctx.arc(pinX, pinY, 4, 0, Math.PI*2);
    pctx.fillStyle='#FF3030';
    pctx.fill();

    // "STILL MOVING UP-DOWN" label
    const arrowY = pistonY - 28;
    pctx.strokeStyle='rgba(255,80,80,0.7)';
    pctx.lineWidth=1.5;
    pctx.setLineDash([3,3]);
    pctx.beginPath(); pctx.moveTo(pistonX+36, arrowY); pctx.lineTo(pistonX+36, arrowY+50); pctx.stroke();
    pctx.setLineDash([]);
    // arrowhead
    pctx.beginPath();
    pctx.moveTo(pistonX+36, arrowY+50);
    pctx.lineTo(pistonX+32, arrowY+42);
    pctx.lineTo(pistonX+40, arrowY+42);
    pctx.fillStyle='rgba(255,80,80,0.7)';
    pctx.fill();
    pctx.font='bold 9px JetBrains Mono, monospace';
    pctx.fillStyle='rgba(255,100,100,0.7)';
    pctx.fillText('↕ RUCH', pistonX+42, arrowY+30);
  }

  /* ── RCPM ── */
  const rc = document.getElementById('rcpmPVCanvas');
  const rctx = rc.getContext('2d');
  const RW = rc.width, RH = rc.height;
  const rcx = RW/2, rcy = RH/2;

  function drawRCPM(t){
    rctx.clearRect(0,0,RW,RH);

    // grid
    rctx.strokeStyle='rgba(0,212,255,0.05)';
    rctx.lineWidth=1;
    for(let x=0;x<RW;x+=30){rctx.beginPath();rctx.moveTo(x,0);rctx.lineTo(x,RH);rctx.stroke();}
    for(let y=0;y<RH;y+=30){rctx.beginPath();rctx.moveTo(0,y);rctx.lineTo(RW,y);rctx.stroke();}

    const OR=95; // outer housing radius
    const CR=68; // cylinder radius
    const pistonR=14; // piston radius

    // outer housing (stationary)
    rctx.beginPath();
    rctx.arc(rcx,rcy,OR+10,0,Math.PI*2);
    rctx.strokeStyle='rgba(0,212,255,0.2)';
    rctx.lineWidth=2;
    rctx.stroke();

    // housing teeth
    for(let i=0;i<40;i++){
      const a=(i/40)*Math.PI*2;
      rctx.beginPath();
      rctx.moveTo(rcx+Math.cos(a)*(OR+8), rcy+Math.sin(a)*(OR+8));
      rctx.lineTo(rcx+Math.cos(a)*(OR+14), rcy+Math.sin(a)*(OR+14));
      rctx.strokeStyle='rgba(0,212,255,0.18)';
      rctx.lineWidth=2;
      rctx.stroke();
    }

    // rotating cylinder assembly
    rctx.save();
    rctx.translate(rcx,rcy);
    rctx.rotate(t);

    // cylinder body
    rctx.beginPath();
    rctx.arc(0,0,CR,0,Math.PI*2);
    rctx.strokeStyle='rgba(0,212,255,0.55)';
    rctx.lineWidth=2.5;
    rctx.stroke();
    rctx.fillStyle='rgba(0,212,255,0.05)';
    rctx.fill();

    // cylindrical bore (vertical inside cylinder)
    rctx.strokeStyle='rgba(0,212,255,0.25)';
    rctx.lineWidth=1.5;
    rctx.beginPath(); rctx.moveTo(-pistonR-4,-CR+8); rctx.lineTo(-pistonR-4,CR-8); rctx.stroke();
    rctx.beginPath(); rctx.moveTo(pistonR+4,-CR+8); rctx.lineTo(pistonR+4,CR-8); rctx.stroke();

    // combustion zone glow (top of bore)
    const grad = rctx.createRadialGradient(0,-CR+20,2,0,-CR+20,18);
    grad.addColorStop(0,'rgba(0,232,122,0.5)');
    grad.addColorStop(1,'rgba(0,232,122,0)');
    rctx.fillStyle=grad;
    rctx.beginPath(); rctx.arc(0,-CR+20,18,0,Math.PI*2); rctx.fill();

    // piston inside bore (radial motion)
    const pistonOffset = Math.sin(t*4)*18; // piston moves radially
    rctx.fillStyle='rgba(0,212,255,0.2)';
    rctx.strokeStyle='rgba(0,212,255,0.7)';
    rctx.lineWidth=2;
    rctx.beginPath();
    rctx.rect(-pistonR, -20+pistonOffset, pistonR*2, 28);
    rctx.fill(); rctx.stroke();

    // shaft center
    rctx.beginPath();
    rctx.arc(0,0,8,0,Math.PI*2);
    rctx.fillStyle='rgba(0,212,255,0.7)';
    rctx.fill();

    // rotation indicator lines
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2;
      rctx.strokeStyle='rgba(0,212,255,0.12)';
      rctx.lineWidth=1;
      rctx.beginPath();
      rctx.moveTo(0,0);
      rctx.lineTo(Math.cos(a)*CR, Math.sin(a)*CR);
      rctx.stroke();
    }

    rctx.restore();

    // rotation arrow outside
    const arrowAngle = t + 0.3;
    const arrowR = OR+22;
    rctx.strokeStyle='rgba(0,212,255,0.5)';
    rctx.lineWidth=2;
    rctx.beginPath();
    rctx.arc(rcx,rcy,arrowR, t, t+1.4);
    rctx.stroke();
    // arrowhead
    const ahX = rcx+Math.cos(t+1.4)*arrowR;
    const ahY = rcy+Math.sin(t+1.4)*arrowR;
    const ahA = t+1.4+Math.PI/2;
    rctx.beginPath();
    rctx.moveTo(ahX,ahY);
    rctx.lineTo(ahX+Math.cos(ahA-0.4)*10, ahY+Math.sin(ahA-0.4)*10);
    rctx.lineTo(ahX+Math.cos(ahA+0.4)*10, ahY+Math.sin(ahA+0.4)*10);
    rctx.fillStyle='rgba(0,212,255,0.6)';
    rctx.fill();

    // "PURE ROTATION" label
    rctx.font='bold 9px JetBrains Mono, monospace';
    rctx.fillStyle='rgba(0,212,255,0.55)';
    rctx.fillText('⟳ CZYSTY OBRÓT', rcx-46, rcy+OR+30);
  }

  // animation loop
  let startTime = null;
  function loop(ts){
    if(!startTime) startTime=ts;
    const t=(ts-startTime)*0.001;
    drawPorsche(t*1.4);
    drawRCPM(t*1.1);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

/* ══════════════════════════ */

// ── HERO CANVAS — PLANETARY IMPACT / MISSION ──
(function(){
  const c = document.getElementById('heroCanvas');
  const ctx = c.getContext('2d');
  let W, H, t = 0;
  let particles = [], co2Clouds = [], energyArcs = [];

  function resize() {
    W = c.width = c.offsetWidth;
    H = c.height = c.offsetHeight;
    initParticles();
  }

  function initParticles() {
    // Floating CO2 molecules drifting up — old world
    co2Clouds = Array.from({length: 28}, (_, i) => ({
      x: W * 0.55 + Math.random() * W * 0.45,
      y: H * 0.3 + Math.random() * H * 0.6,
      vy: -(0.18 + Math.random() * 0.32),
      vx: (Math.random() - 0.5) * 0.12,
      r:  3 + Math.random() * 5,
      op: 0.12 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
    }));

    // Energy particles — bursting from engine core outward
    energyArcs = Array.from({length: 60}, (_, i) => ({
      angle: (i / 60) * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.4,
      r:     0,
      maxR:  60 + Math.random() * 180,
      life:  Math.random(),
      size:  1 + Math.random() * 2,
      color: Math.random() > 0.5 ? '#00D4FF' : '#F5A623',
    }));
  }

  resize();
  window.addEventListener('resize', () => { resize(); });

  // ── Earth helper ──
  // Pre-generate stable city lights & cloud points (so they don't flicker every frame)
  const _cityLights = Array.from({length:52}, () => ({
    ox: (Math.random()*2-1)*0.82, oy: (Math.random()*2-1)*0.82,
    size: 0.6 + Math.random()*1.1,
    warm: Math.random() > 0.3,
    twinkle: 0.5 + Math.random() * 4,
  }));
  const _cloudPts = Array.from({length:80}, () => ({
    ox: (Math.random()*2-1)*0.96, oy: (Math.random()*2-1)*0.96,
    r: 0.04 + Math.random()*0.12,
    op: 0.08 + Math.random()*0.18,
  }));

  function drawEarth(x, y, r, glowAlpha) {

    // ── 1. DEEP OUTER GLOW — layered atmosphere ──
    const atmOuter = ctx.createRadialGradient(x, y, r * 0.92, x, y, r * 1.7);
    atmOuter.addColorStop(0,   `rgba(30,140,255,${glowAlpha * 0.28})`);
    atmOuter.addColorStop(0.3, `rgba(0,100,220,${glowAlpha * 0.14})`);
    atmOuter.addColorStop(0.7, `rgba(0,40,120,${glowAlpha * 0.05})`);
    atmOuter.addColorStop(1,   'transparent');
    ctx.fillStyle = atmOuter;
    ctx.beginPath(); ctx.arc(x, y, r * 1.7, 0, Math.PI*2); ctx.fill();

    // ── 2. OCEAN — rich deep blue with sunlit shimmer ──
    const ocean = ctx.createRadialGradient(x - r*0.30, y - r*0.28, 0, x, y, r);
    ocean.addColorStop(0,   '#1a6fbb');  // sunlit centre
    ocean.addColorStop(0.3, '#0e4f96');
    ocean.addColorStop(0.65,'#063070');
    ocean.addColorStop(1,   '#011428');
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = ocean; ctx.fill();

    // ── 3. CONTINENTS — clipped, textured ──
    ctx.save();
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.clip();

    // Eurasia + Africa
    ctx.beginPath();
    ctx.moveTo(x + r*0.04, y - r*0.58);
    ctx.bezierCurveTo(x + r*0.42, y - r*0.55, x + r*0.52, y - r*0.10, x + r*0.38, y + r*0.18);
    ctx.bezierCurveTo(x + r*0.28, y + r*0.42, x + r*0.10, y + r*0.52, x + r*0.05, y + r*0.38);
    ctx.bezierCurveTo(x - r*0.08, y + r*0.28, x - r*0.02, y + r*0.04, x + r*0.02, y - r*0.18);
    ctx.bezierCurveTo(x - r*0.12, y - r*0.32, x - r*0.08, y - r*0.50, x + r*0.04, y - r*0.58);
    ctx.fillStyle = '#2d6e3e'; ctx.fill();
    // Highlight (sunlit edge)
    ctx.fillStyle = 'rgba(80,180,80,0.18)'; ctx.fill();

    // Americas
    ctx.beginPath();
    ctx.moveTo(x - r*0.38, y - r*0.55);
    ctx.bezierCurveTo(x - r*0.18, y - r*0.58, x - r*0.10, y - r*0.38, x - r*0.14, y - r*0.10);
    ctx.bezierCurveTo(x - r*0.10, y + r*0.12, x - r*0.20, y + r*0.48, x - r*0.30, y + r*0.52);
    ctx.bezierCurveTo(x - r*0.46, y + r*0.48, x - r*0.52, y + r*0.22, x - r*0.50, y - r*0.08);
    ctx.bezierCurveTo(x - r*0.58, y - r*0.28, x - r*0.55, y - r*0.50, x - r*0.38, y - r*0.55);
    ctx.fillStyle = '#256030'; ctx.fill();
    ctx.fillStyle = 'rgba(60,160,60,0.15)'; ctx.fill();

    // Australia
    ctx.beginPath();
    ctx.ellipse(x + r*0.52, y + r*0.38, r*0.16, r*0.12, -0.3, 0, Math.PI*2);
    ctx.fillStyle = '#4a7a2a'; ctx.fill();

    // Antarctica hint
    ctx.beginPath();
    ctx.ellipse(x, y + r*0.78, r*0.55, r*0.14, 0, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(220,235,255,0.55)'; ctx.fill();

    // Greenland / Arctic ice
    ctx.beginPath();
    ctx.ellipse(x - r*0.22, y - r*0.72, r*0.14, r*0.09, 0.4, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(210,230,255,0.5)'; ctx.fill();

    // Ocean surface shimmer streaks
    for (let i = 0; i < 7; i++) {
      const sx = x - r*0.6 + i*r*0.18;
      const sy = y - r*0.15 + i*r*0.06;
      ctx.beginPath();
      ctx.ellipse(sx, sy, r*0.08, r*0.012, -0.3 + i*0.1, 0, Math.PI*2);
      ctx.fillStyle = `rgba(180,220,255,${0.04 + i*0.01})`; ctx.fill();
    }

    ctx.restore();

    // ── 4. CLOUD LAYER — soft wisps ──
    ctx.save();
    ctx.beginPath(); ctx.arc(x, y, r * 0.99, 0, Math.PI*2); ctx.clip();
    _cloudPts.forEach(cp => {
      const cx2 = x + cp.ox * r, cy2 = y + cp.oy * r;
      const dist = Math.hypot(cx2 - x, cy2 - y);
      if (dist > r * 0.94) return;
      const cg = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, cp.r * r);
      cg.addColorStop(0, `rgba(255,255,255,${cp.op})`);
      cg.addColorStop(1, 'transparent');
      ctx.fillStyle = cg;
      ctx.beginPath(); ctx.arc(cx2, cy2, cp.r * r, 0, Math.PI*2); ctx.fill();
    });
    ctx.restore();

    // ── 5. TERMINATOR — day/night boundary ──
    ctx.save();
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.clip();
    const termX = x + r * 0.28;
    const term = ctx.createRadialGradient(termX, y, r*0.05, termX, y, r * 0.95);
    term.addColorStop(0,   'transparent');
    term.addColorStop(0.55,'transparent');
    term.addColorStop(0.78,`rgba(0,0,18,0.45)`);
    term.addColorStop(1,   `rgba(0,0,14,0.82)`);
    ctx.fillStyle = term; ctx.fillRect(x - r, y - r, r*2, r*2);
    ctx.restore();

    // ── 6. CITY LIGHTS — night side, stable positions ──
    ctx.save();
    ctx.beginPath(); ctx.arc(x, y, r * 0.98, 0, Math.PI*2); ctx.clip();
    _cityLights.forEach(cl => {
      const lx = x + cl.ox * r, ly = y + cl.oy * r;
      const dist = Math.hypot(lx - x, ly - y);
      if (dist > r * 0.88) return;
      // Only on night side (right half)
      const nx = (lx - x) / r;
      if (nx < 0.12) return;
      const twinkle = 0.6 + 0.4 * Math.sin(t * cl.twinkle + cl.ox * 10);
      const col = cl.warm ? `rgba(255,210,80,${0.55 * twinkle})` : `rgba(180,210,255,${0.40 * twinkle})`;
      // Glow
      const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, cl.size * 2.5);
      lg.addColorStop(0, col); lg.addColorStop(1, 'transparent');
      ctx.fillStyle = lg;
      ctx.beginPath(); ctx.arc(lx, ly, cl.size * 2.5, 0, Math.PI*2); ctx.fill();
      // Core
      ctx.beginPath(); ctx.arc(lx, ly, cl.size * 0.6, 0, Math.PI*2);
      ctx.fillStyle = col; ctx.fill();
    });
    ctx.restore();

    // ── 7. SPECULAR HIGHLIGHT — sunlit ocean glint ──
    const spec = ctx.createRadialGradient(x - r*0.28, y - r*0.30, 0, x - r*0.28, y - r*0.30, r*0.45);
    spec.addColorStop(0,   'rgba(255,255,255,0.18)');
    spec.addColorStop(0.4, 'rgba(180,220,255,0.06)');
    spec.addColorStop(1,   'transparent');
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = spec; ctx.fill();

    // ── 8. ATMOSPHERE INNER EDGE — thin halo ──
    const atmInner = ctx.createRadialGradient(x, y, r * 0.88, x, y, r * 1.08);
    atmInner.addColorStop(0,   'transparent');
    atmInner.addColorStop(0.5, `rgba(80,160,255,${glowAlpha * 0.22})`);
    atmInner.addColorStop(1,   `rgba(30,100,220,${glowAlpha * 0.08})`);
    ctx.beginPath(); ctx.arc(x, y, r * 1.08, 0, Math.PI*2);
    ctx.fillStyle = atmInner; ctx.fill();

    // Hard rim
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.strokeStyle = `rgba(100,180,255,${glowAlpha * 0.5})`; ctx.lineWidth = 1.2; ctx.stroke();
  }

  // ── CO2 smoke puff ──
  function drawSmokePuff(x, y, r, op) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(80,50,20,${op})`);
    g.addColorStop(0.5, `rgba(50,30,10,${op*0.5})`);
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
  }

  // ── Leaf / clean energy spark ──
  function drawSpark(x, y, size, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.shadowColor = color; ctx.shadowBlur = size * 4;
    ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI*2);
    ctx.fillStyle = color; ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.007;

    const ex = W * 0.68, ey = H * 0.48;
    const eR = Math.min(W, H) * 0.195;

    // ── Deep space bg gradient ──
    const space = ctx.createRadialGradient(ex, ey, 0, ex * 0.5, ey * 0.6, W * 0.9);
    space.addColorStop(0,   'rgba(0,15,35,0.0)');
    space.addColorStop(0.5, 'rgba(0,5,18,0.55)');
    space.addColorStop(1,   'rgba(0,0,8,0.88)');
    ctx.fillStyle = space; ctx.fillRect(0, 0, W, H);

    // ── Stars ──
    ctx.save();
    if (!draw._stars) {
      draw._stars = Array.from({length:120},()=>({
        x: Math.random()*W, y: Math.random()*H,
        r: Math.random()*1.3, op: 0.15+Math.random()*0.55,
        tw: 0.5+Math.random()*3,
      }));
    }
    draw._stars.forEach(s => {
      const flicker = 0.7 + 0.3 * Math.sin(t * s.tw + s.x);
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(200,220,255,${s.op * flicker})`; ctx.fill();
    });
    ctx.restore();

    // ── CO2 clouds drifting up (old combustion waste) ──
    co2Clouds.forEach(p => {
      p.y += p.vy; p.x += p.vx;
      p.phase += 0.018;
      if (p.y < -20) { p.y = H * 0.95; p.x = W * 0.55 + Math.random() * W * 0.45; }
      const wobble = Math.sin(p.phase) * 4;
      drawSmokePuff(p.x + wobble, p.y, p.r + Math.sin(p.phase)*1.5, p.op * 0.6);
    });

    // ── CO2 label (fading as we go clean) ──
    const smokeFade = 0.5 + 0.3 * Math.sin(t * 0.4);
    ctx.font = "bold 9px 'JetBrains Mono', monospace";
    ctx.fillStyle = `rgba(180,120,60,${smokeFade * 0.6})`;
    ctx.textAlign = 'center';
    ctx.fillText('CO₂', W * 0.82, H * 0.22);
    ctx.fillText('CO₂', W * 0.91, H * 0.35);
    ctx.fillText('NOx', W * 0.76, H * 0.41);

    // ── Orbit rings (energy reach) ──
    [1.38, 1.72, 2.12].forEach((mul, i) => {
      ctx.beginPath(); ctx.arc(ex, ey, eR * mul, 0, Math.PI * 2);
      const pulse = 0.03 + 0.015 * Math.sin(t * 1.2 + i * 1.1);
      ctx.strokeStyle = `rgba(0,212,255,${pulse})`;
      ctx.lineWidth = 1; ctx.setLineDash([4, 16]); ctx.stroke();
      ctx.setLineDash([]);
    });

    // ── Orbiting clean-fuel icons ──
    const orbitItems = [
      { label: 'H₂', color: '#00D4FF', orb: 1.40, speed: 0.28, offset: 0 },
      { label: 'e-FUEL', color: '#00E87A', orb: 1.40, speed: 0.28, offset: Math.PI * 2/3 },
      { label: 'BIO', color: '#64CC64', orb: 1.40, speed: 0.28, offset: Math.PI * 4/3 },
      { label: 'EV', color: '#F5A623', orb: 1.75, speed: 0.16, offset: 0.4 },
      { label: 'HYBRID', color: '#FFD060', orb: 1.75, speed: 0.16, offset: Math.PI },
      { label: 'ICE+', color: '#8C95AA', orb: 2.14, speed: 0.09, offset: 1.2 },
    ];

    orbitItems.forEach(item => {
      const a = t * item.speed + item.offset;
      const ox = ex + Math.cos(a) * eR * item.orb;
      const oy = ey + Math.sin(a) * eR * item.orb;

      // Orbit trail
      ctx.beginPath();
      for (let k = 0; k < 24; k++) {
        const ka = a - k * 0.06;
        const kx = ex + Math.cos(ka) * eR * item.orb;
        const ky = ey + Math.sin(ka) * eR * item.orb;
        k === 0 ? ctx.moveTo(kx, ky) : ctx.lineTo(kx, ky);
      }
      ctx.strokeStyle = item.color.replace(')', ',0.25)').replace('rgb(','rgba(') + '25';
      // simpler:
      ctx.strokeStyle = `${item.color}28`;
      ctx.lineWidth = 1.5; ctx.stroke();

      // Connector line to earth
      ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ox, oy);
      ctx.strokeStyle = `${item.color}10`; ctx.lineWidth = 0.5; ctx.stroke();

      // Node glow
      const pulse2 = 0.6 + 0.4 * Math.sin(t * 2.5 + item.offset);
      ctx.shadowColor = item.color; ctx.shadowBlur = 10 * pulse2;
      ctx.beginPath(); ctx.arc(ox, oy, 5, 0, Math.PI*2);
      ctx.fillStyle = item.color; ctx.fill();
      ctx.shadowBlur = 0;

      // Label
      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.fillStyle = item.color;
      ctx.textAlign = 'center';
      ctx.fillText(item.label, ox, oy - 11);
    });

    // ── Ghost RCPM — drawn BEFORE earth so it shows through as a subtle underlayer ──
    // Sits inside the planet silhouette — visible through continents & ocean as a faint
    // rotary suggestion. Uses 'lighter' blend on orbit + normal for earth overlay.
    (function() {
      const nC   = 3;
      const gRot = t * 0.20;              // slow, meditative rotation
      const orbR = eR * 0.62;             // cylinder centres — well inside globe
      const cylL = eR * 0.30;             // cylinder length
      const cylW = eR * 0.072;            // cylinder width

      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(gRot);

      // Spoke arms — hairline gold
      for (let i = 0; i < nC; i++) {
        const a = (i / nC) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * orbR * 0.95, Math.sin(a) * orbR * 0.95);
        ctx.strokeStyle = 'rgba(245,166,35,0.22)';
        ctx.lineWidth = 1; ctx.stroke();
      }

      // Outer orbit ring — dashed
      ctx.beginPath(); ctx.arc(0, 0, orbR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245,166,35,0.10)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 10]); ctx.stroke(); ctx.setLineDash([]);

      // Cylinders
      for (let i = 0; i < nC; i++) {
        const a     = (i / nC) * Math.PI * 2;
        const phase = ((t * 1.0 + i / nC) % 1 + 1) % 1;
        const piston = Math.sin(phase * Math.PI * 2) * cylL * 0.20;
        const firing = phase > 0.48 && phase < 0.74;
        const fi     = firing ? Math.sin((phase - 0.48) / 0.26 * Math.PI) : 0;

        ctx.save();
        ctx.translate(Math.cos(a) * orbR, Math.sin(a) * orbR);
        ctx.rotate(a + Math.PI / 2);

        // Cylinder outline — very faint
        ctx.beginPath();
        ctx.rect(-cylW / 2, -cylL / 2, cylW, cylL);
        ctx.strokeStyle = firing
          ? `rgba(255,190,30,${0.28 + fi * 0.18})`
          : 'rgba(0,200,255,0.16)';
        ctx.lineWidth = 0.9; ctx.stroke();

        // Piston crossbar
        ctx.beginPath();
        ctx.moveTo(-cylW / 2 + 1, piston);
        ctx.lineTo( cylW / 2 - 1, piston);
        ctx.strokeStyle = firing
          ? `rgba(255,210,60,${0.35 + fi * 0.25})`
          : 'rgba(0,220,255,0.20)';
        ctx.lineWidth = 1; ctx.stroke();

        // Firing glow — tiny warm bloom inside chamber
        if (firing && fi > 0.15) {
          ctx.beginPath();
          ctx.rect(-cylW/2 + 1, -cylL/2 + 1, cylW - 2, cylL * 0.32);
          ctx.fillStyle = `rgba(255,160,20,${fi * 0.14})`;
          ctx.fill();
        }

        ctx.restore();
      }

      // Central hub ring
      ctx.beginPath(); ctx.arc(0, 0, eR * 0.042, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245,166,35,0.28)';
      ctx.lineWidth = 0.9; ctx.stroke();
      // Inner dot
      ctx.beginPath(); ctx.arc(0, 0, eR * 0.016, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245,166,35,0.22)'; ctx.fill();

      ctx.restore();
    })();

    // ── Earth ──
    drawEarth(ex, ey, eR, 0.9);

    // ── RCPM CORE — centrum Ziemi jako serce technologii ──
    const corePulse = 0.5 + 0.5 * Math.sin(t * 3.5);
    const coreR = eR * 0.09;
    const badgeR = eR * 0.38;   // solid dark badge circle behind text

    // ── Dark circular backdrop — crisp readable area ──
    ctx.save();
    const badgeBg = ctx.createRadialGradient(ex, ey, 0, ex, ey, badgeR);
    badgeBg.addColorStop(0,   'rgba(3,4,14,0.96)');
    badgeBg.addColorStop(0.7, 'rgba(3,4,14,0.90)');
    badgeBg.addColorStop(1,   'rgba(3,4,14,0.0)');
    ctx.fillStyle = badgeBg;
    ctx.beginPath(); ctx.arc(ex, ey, badgeR * 1.1, 0, Math.PI*2); ctx.fill();

    // Badge border ring
    ctx.beginPath(); ctx.arc(ex, ey, badgeR, 0, Math.PI*2);
    ctx.strokeStyle = `rgba(245,166,35,${0.18 + 0.10 * corePulse})`;
    ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();

    // ── 12 static spokes (dim grid) + 1 smooth rotating needle ──
    const spokesRot = t * 0.18;
    // Dim static spokes — just structural marks
    for (let i = 0; i < 12; i++) {
      const ra = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(ex + Math.cos(ra) * eR * 0.10, ey + Math.sin(ra) * eR * 0.10);
      ctx.lineTo(ex + Math.cos(ra) * badgeR * 0.86, ey + Math.sin(ra) * badgeR * 0.86);
      ctx.strokeStyle = 'rgba(245,166,35,0.06)'; ctx.lineWidth = 0.7; ctx.stroke();
    }
    // Smooth rotating needle — continuous angle, no stepping
    const needleAngle = t * 1.6;  // continuous, smooth
    const nr0 = eR * 0.10, nr1 = badgeR * 0.88;
    // Glow trail (3 fading lines behind needle)
    for (let trail = 3; trail >= 0; trail--) {
      const ta = needleAngle - trail * 0.18;
      const talpha = trail === 0 ? 0.85 : (0.25 - trail * 0.06);
      const twidth = trail === 0 ? 2.0 : (1.2 - trail * 0.3);
      ctx.beginPath();
      ctx.moveTo(ex + Math.cos(ta) * nr0, ey + Math.sin(ta) * nr0);
      ctx.lineTo(ex + Math.cos(ta) * nr1, ey + Math.sin(ta) * nr1);
      ctx.strokeStyle = `rgba(245,166,35,${talpha})`;
      ctx.lineWidth = twidth; ctx.stroke();
    }
    // Bright tip dot
    ctx.beginPath();
    ctx.arc(ex + Math.cos(needleAngle)*nr1, ey + Math.sin(needleAngle)*nr1, 3, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,180,20,${0.9 + 0.1*corePulse})`; ctx.fill();

    // Two counter-rotating arc rings
    for (let ring = 0; ring < 2; ring++) {
      const rr = eR * (0.175 + ring * 0.085);
      const rot = t * (0.5 - ring * 0.2) * (ring === 0 ? 1 : -1);
      for (let s = 0; s < 12; s++) {
        const a0 = (s / 12) * Math.PI * 2 + rot;
        const a1 = a0 + (Math.PI * 2 / 12) * 0.5;
        ctx.beginPath(); ctx.arc(ex, ey, rr, a0, a1);
        ctx.strokeStyle = ring === 0
          ? `rgba(245,166,35,${0.14 + 0.08 * corePulse})`
          : `rgba(0,212,255,${0.09 + 0.06 * corePulse})`;
        ctx.lineWidth = 1; ctx.stroke();
      }
    }

    // Core warm glow
    const cg = ctx.createRadialGradient(ex, ey, 0, ex, ey, eR * 0.15);
    cg.addColorStop(0,   `rgba(255,200,40,${0.55 * corePulse})`);
    cg.addColorStop(0.5, `rgba(245,120,0,${0.18 * corePulse})`);
    cg.addColorStop(1,   'transparent');
    ctx.fillStyle = cg;
    ctx.beginPath(); ctx.arc(ex, ey, eR * 0.15, 0, Math.PI*2); ctx.fill();

    // Hub dot drawn after text block (see below)

    // ── TEXT — RCPM centred, hub dot drawn AFTER so it doesn't overlap ──
    ctx.save();
    ctx.textAlign = 'center';

    // Circular dark backdrop behind text
    const backdropR = eR * 0.36;
    const backdropG = ctx.createRadialGradient(ex, ey, 0, ex, ey, backdropR);
    backdropG.addColorStop(0,   'rgba(2,3,14,0.88)');
    backdropG.addColorStop(0.75,'rgba(2,3,14,0.80)');
    backdropG.addColorStop(1,   'rgba(2,3,14,0.0)');
    ctx.fillStyle = backdropG;
    ctx.beginPath(); ctx.arc(ex, ey, backdropR, 0, Math.PI*2); ctx.fill();

    // ── "RCPM" — neon cyan, large, centred ──
    ctx.font = `bold ${Math.round(eR * 0.275)}px 'Bebas Neue', sans-serif`;
    ctx.shadowColor = '#00D4FF'; ctx.shadowBlur = 22 * corePulse;
    ctx.fillStyle = `rgba(0,212,255,${0.95 + 0.05*corePulse})`;
    ctx.fillText('RCPM', ex, ey - eR * 0.02);
    ctx.shadowBlur = 0;

    // ── separator line ──
    const sw = eR * 0.26;
    ctx.beginPath();
    ctx.moveTo(ex - sw, ey + eR * 0.025);
    ctx.lineTo(ex + sw, ey + eR * 0.025);
    ctx.strokeStyle = `rgba(0,212,255,0.20)`; ctx.lineWidth = 0.8; ctx.stroke();

    // ── "12 stroke" ──
    ctx.font = `${Math.round(eR * 0.060)}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = 'rgba(255,255,255,0.38)';
    ctx.fillText('12 stroke', ex, ey + eR * 0.118);

    // ── "Rotating Cylindrical / Piston Machine" ──
    ctx.font = `${Math.round(eR * 0.048)}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = 'rgba(255,255,255,0.20)';
    ctx.fillText('Rotating Cylindrical', ex, ey + eR * 0.195);
    ctx.fillText('Piston Machine', ex, ey + eR * 0.260);

    ctx.restore();



    // ── Floating stat pills — RIGHT side of earth ──
    // Positioned to the right so they don't overlap hero text on the left
    const stats = [
      { label: 'CO₂ REDUCTION',  val: '-46g/km',   color: '#00E87A', y: ey - eR * 0.62 },
      { label: 'EFFICIENCY',      val: '>60%',       color: '#00D4FF', y: ey + eR * 0.08 },
      { label: 'MARKET REACH',    val: '1.4B VEH',   color: '#F5A623', y: ey + eR * 0.72 },
    ];

    // Pills — anchored to far right edge of canvas, stacked vertically
    const pw = 152, ph = 38;
    // Anchor from right edge: always W - pw - 14
    const pillX = W - pw - 14;
    // Only render if pills don't overlap earth + margin
    const earthRight = ex + eR * 1.18;
    if (pillX > earthRight) {
      stats.forEach((s, i) => {
        const hover = Math.sin(t * 0.9 + i * 1.4) * 3;
        // Stack vertically in upper-right quadrant
        const py = ey - eR * 0.7 + i * (ph + 12) + hover;
        const px = pillX;

        // Short connector dot → pill
        const connX0 = ex + eR * 1.08;
        ctx.beginPath();
        ctx.moveTo(connX0, s.y);
        ctx.bezierCurveTo(
          connX0 + (px - connX0) * 0.4, s.y,
          px - 20, py + ph/2,
          px, py + ph/2
        );
        ctx.strokeStyle = `${s.color}15`; ctx.lineWidth = 1;
        ctx.setLineDash([2,7]); ctx.stroke(); ctx.setLineDash([]);

        // pill bg
        ctx.fillStyle = 'rgba(3,3,16,0.92)';
        ctx.strokeStyle = `${s.color}30`; ctx.lineWidth = 1;
        roundRect(ctx, px, py, pw, ph, 3);
        ctx.fill(); ctx.stroke();

        // label
        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.fillStyle = `${s.color}65`; ctx.textAlign = 'left';
        ctx.fillText(s.label, px + 10, py + 14);
        ctx.font = "bold 15px 'Bebas Neue', sans-serif";
        ctx.fillStyle = s.color;
        ctx.fillText(s.val, px + 10, py + ph - 8);

        // left accent bar
        ctx.fillStyle = s.color;
        ctx.fillRect(px, py, 3, ph);
      });
    }

    ctx.textAlign = 'left';
    requestAnimationFrame(draw);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  draw();
})();

// ── TECH CANVAS (small RCPM) ──
(function(){
  const c=document.getElementById('techCanvas'),ctx=c.getContext('2d');
  let t=0;
  function draw(){
    ctx.clearRect(0,0,400,300);t+=0.018;
    const cx=200,cy=150,oR=72,nC=3,rotS=1.0,oA=t*rotS;
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,110);
    bg.addColorStop(0,'rgba(245,166,35,0.06)');bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg;ctx.fillRect(0,0,400,300);
    ctx.save();ctx.setLineDash([3,7]);
    ctx.beginPath();ctx.arc(cx,cy,oR+28,0,Math.PI*2);
    ctx.strokeStyle='rgba(0,212,255,0.15)';ctx.lineWidth=1.2;ctx.stroke();
    ctx.setLineDash([]);ctx.restore();
    ctx.save();ctx.translate(cx,cy);ctx.rotate(oA);
    for(let i=0;i<nC;i++){
      const a=(i/nC)*Math.PI*2;
      ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*(oR-22),Math.sin(a)*(oR-22));
      ctx.strokeStyle='#F5A623';ctx.lineWidth=2;ctx.stroke();
    }
    for(let i=0;i<nC;i++){
      const a=(i/nC)*Math.PI*2,wA=a+oA,cam=Math.sin(wA),fire=cam>0.82,pp=cam*10;
      ctx.save();ctx.translate(Math.cos(a)*oR,Math.sin(a)*oR);ctx.rotate(a+Math.PI/2);
      if(fire){ctx.shadowColor='#FFD050';ctx.shadowBlur=14;}
      ctx.fillStyle='rgba(10,14,28,0.9)';ctx.strokeStyle=fire?'#FFD050':'rgba(245,166,35,0.7)';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.rect(-14,-22,28,44);ctx.fill();ctx.stroke();ctx.shadowBlur=0;
      ctx.fillStyle=fire?'rgba(255,200,60,0.9)':'rgba(0,212,255,0.8)';ctx.strokeStyle=fire?'#FFE066':'#00D4FF';ctx.lineWidth=1.2;
      ctx.beginPath();ctx.rect(-10,pp-8,20,16);ctx.fill();ctx.stroke();
      ctx.strokeStyle=fire?'#FFD050':'#00FF88';ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(-8,pp-4);ctx.lineTo(8,pp-4);ctx.stroke();
      ctx.beginPath();ctx.moveTo(-8,pp+4);ctx.lineTo(8,pp+4);ctx.stroke();
      ctx.restore();
    }
    ctx.beginPath();ctx.arc(0,0,16,0,Math.PI*2);ctx.fillStyle='#F5A623';ctx.fill();
    ctx.beginPath();ctx.arc(0,0,7,0,Math.PI*2);ctx.fillStyle='#060510';ctx.fill();
    ctx.beginPath();ctx.arc(0,0,2.5,0,Math.PI*2);ctx.fillStyle='#F5A623';ctx.fill();
    ctx.restore();
    ctx.fillStyle='rgba(0,212,255,0.5)';ctx.font="9px 'JetBrains Mono',monospace";ctx.textAlign='center';
    ctx.fillText('RCPM · RUCH PROMIENIOWY',cx,cy+oR+48);ctx.textAlign='left';
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── ENGINE EVOLUTION ──
const engines=[
  {id:'steam',year:'1807',name:'Parowy',tag:'Rewolucja przemysłowa',era:'Era Pary · 1807',inv:'Robert Fulton / James Watt',desc:'Pierwsza maszyna cieplna. Ogromna, nieefektywna, niemożliwa do miniaturyzacji. Zapoczątkowała 200 lat poszukiwań silnika doskonałego.',stats:[{v:'5–8%',l:'Sprawność'},{v:'200 rpm',l:'Maks. RPM'},{v:'1–50t',l:'Masa'}],barrier:'Brak: masa, sprawność — niemożliwe do miniaturyzacji',ok:false,eff:7,color:'#888',anim:'steam'},
  {id:'otto',year:'1877',name:'Otto 4-suw',tag:'Fundament motoryzacji',era:'Era Benzynowa · 1877',inv:'Nikolaus August Otto',desc:'Czterosuwowy cykl — fundament wszystkich silników spalinowych przez 150 lat. Elegancki, ale tłok musi się zatrzymywać i odwracać. Siły bezwładności rosną z v².',stats:[{v:'25–35%',l:'Sprawność'},{v:'6 500 rpm',l:'Maks. RPM'},{v:'80–200 kg',l:'Masa'}],barrier:'Ruch posuwisto-zwrotny: siły bezwładności F∝v² → twardy limit 6 500 rpm',ok:false,eff:30,color:'#4488FF',anim:'piston'},
  {id:'diesel',year:'1893',name:'Diesel',tag:'Wyższa sprawność',era:'Era Diesla · 1893',inv:'Rudolf Diesel',desc:'Zapłon samoczynny — wyższe ciśnienia, wyższa sprawność. Idealny do ciężkiego transportu. Ten sam fundament: ruch posuwisto-zwrotny.',stats:[{v:'35–45%',l:'Sprawność'},{v:'4 500 rpm',l:'Maks. RPM'},{v:'100–400 kg',l:'Masa'}],barrier:'Cięższy, głośniejszy — i wciąż tłok musi się zatrzymywać',ok:false,eff:40,color:'#886622',anim:'piston'},
  {id:'wankel',year:'1954',name:'Wankel',tag:'Rotacyjna nadzieja',era:'Rewolucja Rotacyjna · 1954',inv:'Felix Wankel / NSU Motorenwerke',desc:'Przełom: brak tłoka, brak sił bezwładności. Mazda wyprodukowała 2 mln egzemplarzy. Ale apex seals — trójkątne uszczelki wierzchołkowe — okazały się Achillesową piętą.',stats:[{v:'20–28%',l:'Sprawność'},{v:'9 000 rpm',l:'Maks. RPM'},{v:'60–140 kg',l:'Masa'}],barrier:'Apex seals: uszczelnienie trójkątnego wirnika = nieszczelności, niskie ciśnienie, ~25% sprawność',ok:false,eff:25,color:'#FF6622',anim:'wankel'},
  {id:'turbo',year:'2000',name:'Downsizing',tag:'Sufit technologiczny',era:'Era Turbo · 2000–2023',inv:'BMW / Mercedes / VAG Group',desc:'Direct injection, VVT, hybrydy 48V. Inżynierowie wycisnęli z 4-suwowego tłokowego absolutnie wszystko. Sufit ~42%. Dalej bez zmiany architektury — niemożliwe.',stats:[{v:'38–42%',l:'Sprawność'},{v:'7 000 rpm',l:'Maks. RPM'},{v:'95–180 kg',l:'Masa'}],barrier:'Sufit termodynamiczny osiągnięty. Dalszy postęp wymaga fundamentalnie innej architektury.',ok:false,eff:41,color:'#00AAFF',anim:'piston'},
  {id:'rcpm',year:'2025',name:'RCPM',tag:'Ruch promieniowy · Patent',era:'Przełom · 2025',inv:'Zbigniew Sadlak / IBS Monachium',desc:'Rotating Cylindrical Piston Machine. Cylindryczne tłoki w obracającym się wirniku. Cylindryczne uszczelnienie zamiast apex seals. AKS. 12-suwowy cykl. Brak sufitu RPM.',stats:[{v:'>60%',l:'Sprawność'},{v:'&gt;11500',l:'RPM'},{v:'&lt;10 kg',l:'Masa PSG100'}],barrier:'✓ Cylindryczne uszczelnienie · Ruch promieniowy · AKS · Patent do 2036',ok:true,eff:62,color:'#F5A623',anim:'rcpm'},
];

const evoIcons={
  steam:`<svg viewBox="0 0 44 44" fill="none" stroke="#888" stroke-width="1.5"><rect x="8" y="18" width="28" height="14" rx="2"/><line x1="22" y1="32" x2="22" y2="40"/><circle cx="22" cy="40" r="3"/><line x1="8" y1="12" x2="36" y2="12"/><line x1="15" y1="12" x2="15" y2="18"/><line x1="22" y1="12" x2="22" y2="18"/><line x1="29" y1="12" x2="29" y2="18"/><line x1="22" y1="4" x2="22" y2="12"/></svg>`,
  otto:`<svg viewBox="0 0 44 44" fill="none" stroke="#4488FF" stroke-width="1.5"><rect x="14" y="8" width="16" height="28" rx="1"/><rect x="17" y="18" width="10" height="12" rx="1" fill="rgba(68,136,255,0.15)"/><line x1="22" y1="30" x2="22" y2="40"/><circle cx="22" cy="36" r="2"/><line x1="22" y1="8" x2="22" y2="4"/></svg>`,
  diesel:`<svg viewBox="0 0 44 44" fill="none" stroke="#886622" stroke-width="1.5"><rect x="12" y="6" width="20" height="30" rx="1"/><rect x="15" y="18" width="14" height="12" rx="1" fill="rgba(136,102,34,0.15)"/><line x1="22" y1="36" x2="22" y2="42"/><circle cx="22" cy="40" r="2.5"/><line x1="22" y1="6" x2="22" y2="2"/></svg>`,
  wankel:`<svg viewBox="0 0 44 44" fill="none" stroke="#FF6622" stroke-width="1.5"><circle cx="22" cy="22" r="16"/><path d="M22 10 L32 28 L12 28 Z" fill="rgba(255,102,34,0.15)"/><circle cx="22" cy="22" r="3" fill="#FF6622" opacity="0.5"/></svg>`,
  turbo:`<svg viewBox="0 0 44 44" fill="none" stroke="#00AAFF" stroke-width="1.5"><rect x="14" y="10" width="16" height="24" rx="1"/><rect x="17" y="18" width="10" height="10" rx="1" fill="rgba(0,170,255,0.15)"/><line x1="22" y1="34" x2="22" y2="40"/><circle cx="22" cy="38" r="2"/></svg>`,
  rcpm:`<svg viewBox="0 0 44 44" fill="none" stroke="#F5A623" stroke-width="1.5"><circle cx="22" cy="22" r="14"/><circle cx="22" cy="22" r="8"/><line x1="22" y1="8" x2="22" y2="14"/><line x1="22" y1="30" x2="22" y2="36"/><line x1="8" y1="22" x2="14" y2="22"/><line x1="30" y1="22" x2="36" y2="22"/><circle cx="22" cy="22" r="3" fill="#F5A623" opacity="0.8"/></svg>`,
};

const rail=document.getElementById('evoRail');
engines.forEach(eng=>{
  const nd=document.createElement('div');
  nd.className='eng-node'+(eng.id==='rcpm'?' rcpm-nd':'');
  nd.id='eng-'+eng.id;
  nd.innerHTML=`<div class="eng-node-year">${eng.year}</div><div class="eng-node-icon">${evoIcons[eng.id]||''}</div><div class="eng-node-dot"></div><div class="eng-node-name">${eng.name}</div><div class="eng-node-tag">${eng.tag}</div>`;
  nd.addEventListener('click',()=>openEng(eng));
  rail.appendChild(nd);
});

let engAF=null;
function openEng(eng){
  document.querySelectorAll('.eng-node').forEach(n=>n.classList.remove('active'));
  document.getElementById('eng-'+eng.id).classList.add('active');
  const panel=document.getElementById('engPanel'),info=document.getElementById('engInfo');
  info.className='eng-info'+(eng.id==='rcpm'?' gold':'');
  info.innerHTML=`
    <div class="eng-info-era">${eng.era}</div>
    <div class="eng-info-title">${eng.name.toUpperCase()}</div>
    <div class="eng-info-inv">↳ ${eng.inv}</div>
    <p class="eng-info-desc">${eng.desc}</p>
    <div class="eng-stats-row">${eng.stats.map(s=>`<div class="eng-stat"><span class="eng-stat-v">${s.v}</span><span class="eng-stat-l">${s.l}</span></div>`).join('')}</div>
    <div class="eng-barrier${eng.ok?' ok':''}">
      <span class="eng-barrier-lbl">${eng.ok?'// PRZEŁOM':'// BARIERA'}</span>${eng.barrier}
    </div>
    ${eng.id!=='steam'?`<div style="margin-top:14px;display:flex;align-items:center;gap:10px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--muted);">SPRAWNOŚĆ</span>
      <div style="flex:1;height:3px;background:rgba(255,255,255,.05);">
        <div style="height:100%;width:${Math.min(eng.eff,65)/65*100}%;background:${eng.ok?'var(--gold)':eng.eff<28?'var(--red)':'var(--neon)'}"></div>
      </div>
      <span style="font-family:'Bebas Neue',sans-serif;font-size:18px;color:${eng.ok?'var(--gold)':'var(--neon)'};">${eng.eff}%</span>
    </div>`:''}
  `;
  panel.classList.add('open');
  setTimeout(()=>panel.scrollIntoView({behavior:'smooth',block:'nearest'}),50);
  if(engAF) cancelAnimationFrame(engAF);
  runEngAnim(eng);
}
function closeEngPanel(){
  document.getElementById('engPanel').classList.remove('open');
  document.querySelectorAll('.eng-node').forEach(n=>n.classList.remove('active'));
  if(engAF) cancelAnimationFrame(engAF);
}
function runEngAnim(eng){
  const cv=document.getElementById('engCanvas'),ctx=cv.getContext('2d');
  let t=0;
  function loop(){
    ctx.clearRect(0,0,480,340);t+=0.025;
    if(eng.anim==='piston') animPiston(ctx,480,340,t,eng.color);
    else if(eng.anim==='steam') animSteam(ctx,480,340,t,eng.color);
    else if(eng.anim==='wankel') animWankel(ctx,480,340,t,eng.color);
    else if(eng.anim==='rcpm') animRCPM(ctx,480,340,t,eng.color);
    engAF=requestAnimationFrame(loop);
  }
  loop();
}

function animPiston(ctx,W,H,t,color){
  const cx=W/2,cy=H/2;
  for(let x=0;x<W;x+=30){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.strokeStyle='rgba(255,255,255,0.03)';ctx.lineWidth=1;ctx.stroke();}
  const bW=65,bH=110,bx=cx-bW/2,by=cy-bH/2;
  ctx.strokeStyle='rgba(255,255,255,0.18)';ctx.lineWidth=2;ctx.strokeRect(bx,by,bW,bH);
  const pY=(Math.sin(t*3)*0.5+0.5),py=by+8+pY*(bH-34);
  if(pY<0.15){const g=ctx.createRadialGradient(cx,by+4,0,cx,by+4,46);g.addColorStop(0,'rgba(255,200,50,0.55)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(bx,by,bW,56);}
  ctx.beginPath();ctx.moveTo(cx,py+12);ctx.lineTo(cx,cy+72);ctx.strokeStyle=color;ctx.lineWidth=3;ctx.stroke();
  const cR=36,cA=t*3-Math.PI/2,pX=cx+Math.cos(cA)*cR,pnY=cy+72+Math.sin(cA)*cR;
  ctx.beginPath();ctx.arc(cx,cy+72,cR,0,Math.PI*2);ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1.5;ctx.stroke();
  ctx.beginPath();ctx.arc(pX,pnY,5,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.1)';ctx.strokeStyle=color;ctx.lineWidth=2;
  ctx.beginPath();ctx.rect(bx+4,py,bW-8,20);ctx.fill();ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,0.2)';ctx.font="10px 'JetBrains Mono',monospace";ctx.textAlign='center';
  ctx.fillText('↕ RUCH POSUWISTO-ZWROTNY',cx,H-30);
  const vel=Math.abs(Math.cos(t*3));
  ctx.fillStyle=vel>0.9?'rgba(255,80,80,0.9)':'rgba(255,255,255,0.3)';
  ctx.fillText(`PRĘDKOŚĆ TŁOKA: ${(vel*100).toFixed(0)}%`,cx,H-14);ctx.textAlign='left';
}

function animSteam(ctx,W,H,t,color){
  const cx=W/2,cy=H/2+20;
  ctx.strokeStyle=color+'55';ctx.lineWidth=2;ctx.strokeRect(cx-60,cy-50,120,80);
  const px=cx-45+Math.sin(t*2)*40;
  ctx.fillStyle='rgba(136,136,136,0.25)';ctx.strokeStyle=color;ctx.lineWidth=2;
  ctx.beginPath();ctx.rect(px,cy-40,30,60);ctx.fill();ctx.stroke();
  for(let i=0;i<4;i++){
    const pt=(t*1.5+i*0.8)%(Math.PI*2);
    ctx.beginPath();ctx.arc(cx-72-Math.sin(pt)*18,cy-28+i*20,7+Math.sin(pt)*4,0,Math.PI*2);
    ctx.fillStyle=`rgba(200,200,200,${0.28-i*0.05})`;ctx.fill();
  }
  ctx.fillStyle='rgba(255,255,255,0.22)';ctx.font="10px 'JetBrains Mono',monospace";ctx.textAlign='center';
  ctx.fillText('// PARA WODNA · RUCH LINIOWY',cx,H-20);ctx.textAlign='left';
}

function animWankel(ctx,W,H,t,color){
  const cx=W/2,cy=H/2,R=82,r=27,e=13;
  ctx.beginPath();
  for(let a=0;a<=Math.PI*2;a+=0.01){
    const x=cx+(R+r)*Math.cos(a)-e*Math.cos((R/r+1)*a),y=cy+(R+r)*Math.sin(a)-e*Math.sin((R/r+1)*a);
    a===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  }
  ctx.closePath();ctx.strokeStyle='rgba(255,255,255,0.18)';ctx.lineWidth=2;ctx.stroke();
  const rA=t*0.8,verts=[0,1,2].map(i=>{const a=rA+i*Math.PI*2/3;return{x:cx+R*0.5*Math.cos(a),y:cy+R*0.5*Math.sin(a)};});
  [0,1,2].forEach((_,i)=>{
    const a=rA+(i+0.5)*Math.PI*2/3,ph=(t+i*Math.PI*2/3)%(Math.PI*2);
    const cc=ph<Math.PI*0.5?'rgba(100,180,255,0.13)':ph<Math.PI?'rgba(255,200,50,0.1)':ph<Math.PI*1.5?'rgba(255,80,20,0.18)':'rgba(70,70,70,0.08)';
    const g=ctx.createRadialGradient(cx+R*0.7*Math.cos(a),cy+R*0.7*Math.sin(a),0,cx+R*0.7*Math.cos(a),cy+R*0.7*Math.sin(a),30);
    g.addColorStop(0,cc);g.addColorStop(1,'transparent');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx+R*0.7*Math.cos(a),cy+R*0.7*Math.sin(a),30,0,Math.PI*2);ctx.fill();
  });
  ctx.beginPath();ctx.moveTo(verts[0].x,verts[0].y);
  for(let i=0;i<3;i++){const v0=verts[i],v1=verts[(i+1)%3],mx=(v0.x+v1.x)/2,my=(v0.y+v1.y)/2;ctx.quadraticCurveTo(mx+(cx-mx)*0.22,my+(cy-my)*0.22,v1.x,v1.y);}
  ctx.closePath();ctx.fillStyle='rgba(255,102,34,0.13)';ctx.fill();ctx.strokeStyle=color;ctx.lineWidth=2;ctx.stroke();
  verts.forEach(v=>{
    ctx.beginPath();ctx.arc(v.x,v.y,5,0,Math.PI*2);ctx.fillStyle='#FF2D2D';ctx.fill();
    const lg=ctx.createRadialGradient(v.x,v.y,0,v.x,v.y,13);lg.addColorStop(0,'rgba(255,45,45,0.45)');lg.addColorStop(1,'transparent');
    ctx.fillStyle=lg;ctx.beginPath();ctx.arc(v.x,v.y,13,0,Math.PI*2);ctx.fill();
  });
  ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();
  ctx.fillStyle='#FF2D2D';ctx.font="bold 10px 'JetBrains Mono',monospace";ctx.textAlign='center';
  ctx.fillText('● APEX SEALS — NIESZCZELNE',cx,H-30);
  ctx.fillStyle='rgba(255,255,255,0.28)';ctx.font="10px 'JetBrains Mono',monospace";
  ctx.fillText('→ ~25% SPRAWNOŚĆ',cx,H-14);ctx.textAlign='left';
}

function animRCPM(ctx,W,H,t,color){
  const cx=W/2,cy=H/2,nC=3,oR=78,cW=32,cH=46,pW=22,pH=14,st=11,rs=1.2,oA=t*rs;
  const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,130);bg.addColorStop(0,'rgba(245,166,35,0.06)');bg.addColorStop(1,'transparent');
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.setLineDash([4,8]);ctx.beginPath();ctx.arc(cx,cy,oR+cH/2+15,0,Math.PI*2);
  ctx.strokeStyle='rgba(0,212,255,0.17)';ctx.lineWidth=1.4;ctx.stroke();ctx.setLineDash([]);ctx.restore();
  for(let i=0;i<4;i++){const a=(i/4)*Math.PI*2-Math.PI/4,rr=oR+cH/2+15,mx=cx+Math.cos(a)*rr,my=cy+Math.sin(a)*rr;
    ctx.save();ctx.translate(mx,my);ctx.rotate(a+Math.PI/2);ctx.beginPath();ctx.moveTo(0,-4);ctx.lineTo(3.5,3);ctx.lineTo(-3.5,3);ctx.closePath();ctx.fillStyle='rgba(0,212,255,0.38)';ctx.fill();ctx.restore();}
  ctx.save();ctx.translate(cx,cy);ctx.rotate(oA);
  for(let i=0;i<nC;i++){const a=(i/nC)*Math.PI*2;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*(oR-cH/2+3),Math.sin(a)*(oR-cH/2+3));ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.stroke();}
  for(let i=0;i<nC;i++){
    const a=(i/nC)*Math.PI*2,wA=a+oA,cam=Math.sin(wA),fire=cam>0.82,pp=cam*st;
    ctx.save();ctx.translate(Math.cos(a)*oR,Math.sin(a)*oR);ctx.rotate(a+Math.PI/2);
    if(fire){ctx.shadowColor='#FFD050';ctx.shadowBlur=16;}
    ctx.fillStyle='rgba(8,12,26,0.93)';ctx.strokeStyle=fire?'#FFD050':`${color}88`;ctx.lineWidth=1.8;
    ctx.beginPath();ctx.rect(-cW/2,-cH/2,cW,cH);ctx.fill();ctx.stroke();ctx.shadowBlur=0;
    ctx.fillStyle=fire?'rgba(255,200,60,0.88)':'rgba(0,212,255,0.78)';ctx.strokeStyle=fire?'#FFE066':'#00D4FF';ctx.lineWidth=1.3;
    ctx.beginPath();ctx.rect(-pW/2,pp-pH/2,pW,pH);ctx.fill();ctx.stroke();
    ctx.strokeStyle=fire?'#FFD050':'#00FF88';ctx.lineWidth=1.3;
    ctx.beginPath();ctx.moveTo(-pW/2+2,pp-pH/2+4);ctx.lineTo(pW/2-2,pp-pH/2+4);ctx.stroke();
    ctx.beginPath();ctx.moveTo(-pW/2+2,pp+pH/2-4);ctx.lineTo(pW/2-2,pp+pH/2-4);ctx.stroke();
    ctx.restore();
  }
  ctx.beginPath();ctx.arc(0,0,18,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();
  ctx.beginPath();ctx.arc(0,0,8,0,Math.PI*2);ctx.fillStyle='#050510';ctx.fill();
  ctx.beginPath();ctx.arc(0,0,3,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();
  ctx.restore();
  ctx.fillStyle=color;ctx.font="bold 13px 'JetBrains Mono',monospace";ctx.textAlign='center';
  ctx.fillText('11 500 RPM',cx,cy+oR+cH/2+42);
  ctx.fillStyle='#00FF88';ctx.font="9px 'JetBrains Mono',monospace";
  ctx.fillText('● CYLINDRYCZNE USZCZELNIENIE  ↻ RUCH PROMIENIOWY',cx,cy+oR+cH/2+58);
  ctx.fillStyle='rgba(255,255,255,0.28)';
  ctx.fillText('BRAK SIŁ BEZWŁADNOŚCI · BRAK SUFITU RPM · PATENT DO 2036',cx,cy+oR+cH/2+73);
  ctx.textAlign='left';
}


// ── PRODUCTION FORECAST CHART ──
(function(){
  const canvas = document.getElementById('prodChart');
  if (!canvas) return;

  // Set actual pixel width
  function initChart() {
    const W = canvas.parentElement.offsetWidth - 96; // subtract padding
    canvas.width = W;
    canvas.height = 320;
    drawChart(canvas, W, 320);
  }

  function drawChart(canvas, W, H) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    // Data: [year, EV, Hybrid, ICE] in millions
    const data = [
      { year: '2020', ev: 3,  hyb: 9,  ice: 74 },
      { year: '2021', ev: 6,  hyb: 11, ice: 72 },
      { year: '2022', ev: 10, hyb: 14, ice: 69 },
      { year: '2023', ev: 14, hyb: 18, ice: 64 },
      { year: '2024', ev: 17, hyb: 23, ice: 57 },
      { year: '2025', ev: 21, hyb: 28, ice: 51 },
      { year: '2026', ev: 26, hyb: 33, ice: 44 },
      { year: '2027', ev: 32, hyb: 37, ice: 37 },
      { year: '2028', ev: 39, hyb: 40, ice: 28 },
      { year: '2029', ev: 46, hyb: 42, ice: 22 },
      { year: '2030', ev: 53, hyb: 43, ice: 16 },
    ];

    const PAD_L = 52, PAD_R = 24, PAD_T = 20, PAD_B = 50;
    const chartW = W - PAD_L - PAD_R;
    const chartH = H - PAD_T - PAD_B;
    const maxVal = 80;
    const nYears = data.length;
    const groupW = chartW / nYears;
    const barW = groupW * 0.22;
    const gap = groupW * 0.04;
    const colors = { ev: '#00D4FF', hyb: '#F5A623', ice: '#3A4158' };
    const glows  = { ev: 'rgba(0,212,255,0.35)', hyb: 'rgba(245,166,35,0.35)', ice: 'rgba(58,65,88,0.2)' };

    // Grid lines
    [0, 20, 40, 60, 80].forEach(v => {
      const y = PAD_T + chartH - (v / maxVal) * chartH;
      ctx.beginPath();
      ctx.moveTo(PAD_L, y);
      ctx.lineTo(PAD_L + chartW, y);
      ctx.strokeStyle = v === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      ctx.stroke();
      // Y label
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.textAlign = 'right';
      ctx.fillText(v + 'M', PAD_L - 8, y + 4);
    });

    // Total line (100M reference)
    const yTotal = PAD_T + chartH - (100 / maxVal) * chartH;
    if (yTotal > PAD_T) {
      ctx.beginPath();
      ctx.moveTo(PAD_L, PAD_T);
      ctx.lineTo(PAD_L + chartW, PAD_T);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Bars
    data.forEach((d, i) => {
      const gx = PAD_L + i * groupW + groupW * 0.08;
      const isFuture = d.year >= '2025';

      ['ice', 'hyb', 'ev'].forEach((key, ki) => {
        const val = d[key];
        const bh = (val / maxVal) * chartH;
        const bx = gx + ki * (barW + gap);
        const by = PAD_T + chartH - bh;

        // Bar fill
        const grad = ctx.createLinearGradient(bx, by, bx, by + bh);
        if (isFuture) {
          grad.addColorStop(0, colors[key]);
          grad.addColorStop(1, colors[key] + '88');
        } else {
          grad.addColorStop(0, colors[key] + 'BB');
          grad.addColorStop(1, colors[key] + '44');
        }
        ctx.fillStyle = grad;

        if (isFuture) {
          ctx.shadowColor = glows[key];
          ctx.shadowBlur = key === 'ev' ? 10 : key === 'hyb' ? 8 : 0;
        }

        // Rounded top
        const r = Math.min(3, bh / 2);
        ctx.beginPath();
        ctx.moveTo(bx + r, by);
        ctx.lineTo(bx + barW - r, by);
        ctx.quadraticCurveTo(bx + barW, by, bx + barW, by + r);
        ctx.lineTo(bx + barW, by + bh);
        ctx.lineTo(bx, by + bh);
        ctx.lineTo(bx, by + r);
        ctx.quadraticCurveTo(bx, by, bx + r, by);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        // Value label on top for future years — EV and Hybrid only
        if (isFuture && key !== 'ice' && val >= 20) {
          ctx.fillStyle = colors[key];
          ctx.font = "bold 9px 'JetBrains Mono', monospace";
          ctx.textAlign = 'center';
          ctx.fillText(val + 'M', bx + barW / 2, by - 5);
        }
      });

      // Year label
      const labelX = gx + (3 * barW + 2 * gap) / 2;
      ctx.fillStyle = isFuture ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.25)';
      ctx.font = isFuture ? "bold 10px 'JetBrains Mono', monospace" : "10px 'JetBrains Mono', monospace";
      ctx.textAlign = 'center';
      ctx.fillText(d.year, labelX, H - 14);

      // "PROGNOZA" divider
      if (d.year === '2025') {
        const fx = PAD_L + i * groupW - groupW * 0.1;
        ctx.beginPath();
        ctx.moveTo(fx, PAD_T);
        ctx.lineTo(fx, PAD_T + chartH);
        ctx.strokeStyle = 'rgba(0,212,255,0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.save();
        ctx.translate(fx - 8, PAD_T + chartH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = 'rgba(0,212,255,0.35)';
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.textAlign = 'center';
        ctx.letterSpacing = '2px';
        ctx.fillText('← HISTORIA  |  PROGNOZA →', 0, 0);
        ctx.restore();
      }
    });

    // Axes
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.fillText('MLN SZT./ROK', PAD_L, PAD_T - 6);

    // Callout: 2030 RCPM serves all 3
    const last = data[data.length - 1];
    const totalLast = last.ev + last.hyb + last.ice;
    const callX = PAD_L + 10 * groupW + groupW * 0.5;
    const callY = PAD_T + 10;
    ctx.fillStyle = 'rgba(245,166,35,0.9)';
    ctx.font = "bold 10px 'JetBrains Mono', monospace";
    ctx.textAlign = 'center';
    ctx.fillText('2030: ~' + totalLast + 'M pojazdów', callX - 60, callY);
    ctx.fillStyle = 'rgba(0,212,255,0.7)';
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.fillText('RCPM obsługuje każdy segment', callX - 60, callY + 14);
    ctx.textAlign = 'left';
  }

  // Init after fonts load
  if (document.fonts) {
    document.fonts.ready.then(initChart);
  } else {
    setTimeout(initChart, 300);
  }
  window.addEventListener('resize', initChart);
})();

// nav
window.addEventListener('scroll',()=>{
  document.getElementById('nav').style.background=
    window.scrollY>50?'rgba(5,5,15,0.96)':'rgba(5,5,15,0.88)';
});

/* ══════════════════════════ */

(function() {
  // ── Background particle canvas ──
  const bgCanvas = document.getElementById('visionCanvas');
  if (!bgCanvas) return;
  const bgCtx = bgCanvas.getContext('2d');

  function resizeBg() {
    bgCanvas.width  = bgCanvas.offsetWidth;
    bgCanvas.height = bgCanvas.offsetHeight;
  }
  resizeBg();
  window.addEventListener('resize', resizeBg);

  // Pre-generate particles: leaves + CO2 molecules + dots
  const particles = Array.from({length: 60}, (_, i) => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00018,
    vy: -0.00008 - Math.random() * 0.00012,
    size: 1.5 + Math.random() * 3,
    type: i < 20 ? 'leaf' : i < 38 ? 'co2' : 'dot',
    alpha: 0.06 + Math.random() * 0.1,
    phase: Math.random() * Math.PI * 2,
    drift: (Math.random() - 0.5) * 0.3,
  }));

  function drawLeaf(ctx, x, y, size, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(Math.sin(Date.now() * 0.0004 + x) * 0.3);
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 1.2, -size * 0.4, size * 0.8, size * 0.6, 0, size);
    ctx.bezierCurveTo(-size * 0.8, size * 0.6, -size * 1.2, -size * 0.4, 0, -size);
    ctx.fillStyle = '#00E87A';
    ctx.fill();
    // midrib
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.8);
    ctx.lineTo(0, size * 0.8);
    ctx.strokeStyle = 'rgba(0,180,80,0.4)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.restore();
  }

  function drawCO2(ctx, x, y, size, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha * 0.6;
    ctx.font = `${Math.round(size * 2.2)}px JetBrains Mono, monospace`;
    ctx.fillStyle = '#FF6040';
    ctx.textAlign = 'center';
    ctx.fillText('CO₂', x, y);
    ctx.restore();
  }

  let vt = 0;
  function animBg() {
    if (!bgCanvas.offsetParent && bgCanvas.offsetHeight === 0) {
      requestAnimationFrame(animBg); return;
    }
    vt += 0.008;
    const W = bgCanvas.width, H = bgCanvas.height;
    bgCtx.clearRect(0, 0, W, H);

    // Deep green-black gradient bg
    const grad = bgCtx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,   '#010A04');
    grad.addColorStop(0.5, '#020C06');
    grad.addColorStop(1,   '#020810');
    bgCtx.fillStyle = grad; bgCtx.fillRect(0, 0, W, H);

    // Soft green radial glow — top right
    const gr1 = bgCtx.createRadialGradient(W * 0.75, H * 0.25, 0, W * 0.75, H * 0.25, W * 0.45);
    gr1.addColorStop(0,   'rgba(0,232,122,0.04)');
    gr1.addColorStop(0.5, 'rgba(0,180,80,0.015)');
    gr1.addColorStop(1,   'transparent');
    bgCtx.fillStyle = gr1; bgCtx.fillRect(0, 0, W, H);

    // Particles
    particles.forEach(p => {
      p.x += p.vx + Math.sin(vt * 0.5 + p.phase) * 0.00004;
      p.y += p.vy;
      if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;

      const px = p.x * W, py = p.y * H;
      if (p.type === 'leaf')       drawLeaf(bgCtx, px, py, p.size * 2, p.alpha);
      else if (p.type === 'co2')   drawCO2(bgCtx, px, py, p.size, p.alpha);
      else {
        bgCtx.beginPath(); bgCtx.arc(px, py, p.size * 0.4, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(0,232,122,${p.alpha * 0.5})`; bgCtx.fill();
      }
    });

    // Horizontal grid lines — very faint
    for (let i = 0; i < 6; i++) {
      const ly = (i / 5) * H;
      bgCtx.beginPath();
      bgCtx.moveTo(0, ly); bgCtx.lineTo(W, ly);
      bgCtx.strokeStyle = 'rgba(0,232,122,0.025)'; bgCtx.lineWidth = 1; bgCtx.stroke();
    }

    requestAnimationFrame(animBg);
  }
  animBg();

  // ── Vision Earth canvas ──
  const ec = document.getElementById('visionEarth');
  if (!ec) return;
  const ectx = ec.getContext('2d');
  const ew = ec.width, eh = ec.height;
  const ex = ew / 2, ey = eh / 2, eR = ew * 0.38;

  // Pre-generate stable cloud + city points
  const vclouds = Array.from({length:55}, () => ({
    ox: (Math.random()*2-1)*0.9, oy: (Math.random()*2-1)*0.9,
    r: 0.05 + Math.random()*0.13, op: 0.07 + Math.random()*0.15
  }));
  const vcities = Array.from({length:40}, () => ({
    ox: (Math.random()*2-1)*0.82, oy: (Math.random()*2-1)*0.82,
    sz: 0.5 + Math.random()*1.0, twk: 0.4 + Math.random()*3.5, warm: Math.random() > 0.35
  }));

  let et = 0;
  function animEarth() {
    et += 0.008;
    ectx.clearRect(0, 0, ew, eh);

    // Outer atmosphere
    const atm = ectx.createRadialGradient(ex, ey, eR * 0.9, ex, ey, eR * 1.65);
    atm.addColorStop(0,   'rgba(0,220,100,0.20)');
    atm.addColorStop(0.35,'rgba(0,180,80,0.10)');
    atm.addColorStop(0.7, 'rgba(0,120,50,0.04)');
    atm.addColorStop(1,   'transparent');
    ectx.fillStyle = atm;
    ectx.beginPath(); ectx.arc(ex, ey, eR * 1.65, 0, Math.PI*2); ectx.fill();

    // Ocean — emerald tones (vision has a greener palette)
    const ocean = ectx.createRadialGradient(ex - eR*0.28, ey - eR*0.25, 0, ex, ey, eR);
    ocean.addColorStop(0,   '#0e5a3a');
    ocean.addColorStop(0.4, '#083d28');
    ocean.addColorStop(0.75,'#042418');
    ocean.addColorStop(1,   '#011008');
    ectx.beginPath(); ectx.arc(ex, ey, eR, 0, Math.PI*2);
    ectx.fillStyle = ocean; ectx.fill();

    // Slow rotation of continents
    const rot = et * 0.04;
    ectx.save();
    ectx.beginPath(); ectx.arc(ex, ey, eR, 0, Math.PI*2); ectx.clip();
    ectx.translate(ex, ey); ectx.rotate(rot); ectx.translate(-ex, -ey);

    // Eurasia + Africa
    ectx.beginPath();
    ectx.moveTo(ex + eR*0.04, ey - eR*0.58);
    ectx.bezierCurveTo(ex + eR*0.44, ey - eR*0.52, ex + eR*0.52, ey - eR*0.08, ex + eR*0.36, ey + eR*0.20);
    ectx.bezierCurveTo(ex + eR*0.26, ey + eR*0.44, ex + eR*0.08, ey + eR*0.52, ex + eR*0.03, ey + eR*0.38);
    ectx.bezierCurveTo(ex - eR*0.10, ey + eR*0.26, ex - eR*0.04, ey + eR*0.02, ex + eR*0.02, ey - eR*0.20);
    ectx.bezierCurveTo(ex - eR*0.14, ey - eR*0.34, ex - eR*0.10, ey - eR*0.52, ex + eR*0.04, ey - eR*0.58);
    ectx.fillStyle = '#1a5e30'; ectx.fill();
    ectx.fillStyle = 'rgba(40,160,70,0.12)'; ectx.fill();

    // Americas
    ectx.beginPath();
    ectx.moveTo(ex - eR*0.40, ey - eR*0.54);
    ectx.bezierCurveTo(ex - eR*0.18, ey - eR*0.57, ex - eR*0.10, ey - eR*0.36, ex - eR*0.15, ey - eR*0.08);
    ectx.bezierCurveTo(ex - eR*0.11, ey + eR*0.14, ex - eR*0.22, ey + eR*0.50, ex - eR*0.32, ey + eR*0.53);
    ectx.bezierCurveTo(ex - eR*0.48, ey + eR*0.48, ex - eR*0.54, ey + eR*0.20, ex - eR*0.52, ey - eR*0.10);
    ectx.bezierCurveTo(ex - eR*0.58, ey - eR*0.30, ex - eR*0.56, ey - eR*0.50, ex - eR*0.40, ey - eR*0.54);
    ectx.fillStyle = '#165228'; ectx.fill();
    ectx.fillStyle = 'rgba(30,140,55,0.10)'; ectx.fill();

    // Australia
    ectx.beginPath();
    ectx.ellipse(ex + eR*0.52, ey + eR*0.38, eR*0.16, eR*0.12, -0.3, 0, Math.PI*2);
    ectx.fillStyle = '#2a5e18'; ectx.fill();

    // Polar ice caps — green world = healthy ice
    ectx.beginPath();
    ectx.ellipse(ex, ey - eR*0.78, eR*0.38, eR*0.12, 0, 0, Math.PI*2);
    ectx.fillStyle = 'rgba(200,240,220,0.45)'; ectx.fill();
    ectx.beginPath();
    ectx.ellipse(ex, ey + eR*0.78, eR*0.52, eR*0.14, 0, 0, Math.PI*2);
    ectx.fillStyle = 'rgba(200,240,220,0.50)'; ectx.fill();

    // Green forest shimmer
    for (let i = 0; i < 5; i++) {
      const sx = ex - eR*0.5 + i * eR*0.22;
      const sy = ey - eR*0.1 + i * eR*0.04;
      ectx.beginPath();
      ectx.ellipse(sx, sy, eR*0.1, eR*0.015, -0.2 + i*0.08, 0, Math.PI*2);
      ectx.fillStyle = `rgba(0,220,80,${0.04 + i*0.008})`; ectx.fill();
    }
    ectx.restore();

    // Clouds
    ectx.save();
    ectx.beginPath(); ectx.arc(ex, ey, eR*0.99, 0, Math.PI*2); ectx.clip();
    vclouds.forEach(cp => {
      const cx = ex + cp.ox * eR, cy = ey + cp.oy * eR;
      if (Math.hypot(cx-ex, cy-ey) > eR*0.93) return;
      const cg = ectx.createRadialGradient(cx,cy,0,cx,cy,cp.r*eR);
      cg.addColorStop(0, `rgba(200,255,220,${cp.op})`);
      cg.addColorStop(1, 'transparent');
      ectx.fillStyle = cg;
      ectx.beginPath(); ectx.arc(cx, cy, cp.r*eR, 0, Math.PI*2); ectx.fill();
    });
    ectx.restore();

    // Terminator
    ectx.save();
    ectx.beginPath(); ectx.arc(ex, ey, eR, 0, Math.PI*2); ectx.clip();
    const term = ectx.createRadialGradient(ex+eR*0.30, ey, eR*0.05, ex+eR*0.30, ey, eR*0.95);
    term.addColorStop(0, 'transparent'); term.addColorStop(0.52, 'transparent');
    term.addColorStop(0.76, 'rgba(0,5,2,0.40)'); term.addColorStop(1, 'rgba(0,4,2,0.80)');
    ectx.fillStyle = term; ectx.fillRect(ex-eR, ey-eR, eR*2, eR*2);
    ectx.restore();

    // City lights — night side
    ectx.save();
    ectx.beginPath(); ectx.arc(ex, ey, eR*0.98, 0, Math.PI*2); ectx.clip();
    vcities.forEach(cl => {
      const lx = ex + cl.ox*eR, ly = ey + cl.oy*eR;
      if (Math.hypot(lx-ex, ly-ey) > eR*0.88) return;
      if ((lx-ex)/eR < 0.10) return;
      const tw = 0.5 + 0.5*Math.sin(et * cl.twk + cl.ox*8);
      const col = cl.warm ? `rgba(255,220,80,${0.5*tw})` : `rgba(120,255,160,${0.4*tw})`;
      const lg = ectx.createRadialGradient(lx,ly,0,lx,ly,cl.sz*2.5);
      lg.addColorStop(0, col); lg.addColorStop(1, 'transparent');
      ectx.fillStyle = lg;
      ectx.beginPath(); ectx.arc(lx, ly, cl.sz*2.5, 0, Math.PI*2); ectx.fill();
      ectx.beginPath(); ectx.arc(lx, ly, cl.sz*0.5, 0, Math.PI*2);
      ectx.fillStyle = col; ectx.fill();
    });
    ectx.restore();

    // Specular highlight
    const spec = ectx.createRadialGradient(ex-eR*0.28, ey-eR*0.28, 0, ex-eR*0.28, ey-eR*0.28, eR*0.42);
    spec.addColorStop(0, 'rgba(180,255,200,0.16)');
    spec.addColorStop(0.4,'rgba(100,220,140,0.05)');
    spec.addColorStop(1,  'transparent');
    ectx.beginPath(); ectx.arc(ex, ey, eR, 0, Math.PI*2);
    ectx.fillStyle = spec; ectx.fill();

    // Atmosphere rim — green
    const rimAtm = ectx.createRadialGradient(ex, ey, eR*0.88, ex, ey, eR*1.10);
    rimAtm.addColorStop(0, 'transparent');
    rimAtm.addColorStop(0.5, 'rgba(0,220,100,0.18)');
    rimAtm.addColorStop(1,   'rgba(0,160,60,0.06)');
    ectx.beginPath(); ectx.arc(ex, ey, eR*1.10, 0, Math.PI*2);
    ectx.fillStyle = rimAtm; ectx.fill();

    // Hard rim
    ectx.beginPath(); ectx.arc(ex, ey, eR, 0, Math.PI*2);
    ectx.strokeStyle = 'rgba(0,220,100,0.35)'; ectx.lineWidth = 1.5; ectx.stroke();

    // Central pulsing CO₂ label
    const pulse = 0.5 + 0.5 * Math.sin(et * 2.8);
    const num = (2.0 * (0.97 + 0.03 * Math.sin(et * 3.2))).toFixed(1);
    ectx.save();
    ectx.shadowColor = '#00E87A'; ectx.shadowBlur = 20 * pulse;
    ectx.font = `bold ${Math.round(eR * 0.30)}px Bebas Neue, sans-serif`;
    ectx.fillStyle = `rgba(0,232,122,${0.80 + 0.20 * pulse})`;
    ectx.textAlign = 'center';
    ectx.fillText(num, ex, ey);
    ectx.shadowBlur = 0;
    ectx.font = `bold ${Math.round(eR * 0.095)}px Bebas Neue, sans-serif`;
    ectx.fillStyle = `rgba(0,232,122,${0.55 + 0.15 * pulse})`;
    ectx.fillText('Gt CO₂/rok', ex, ey + eR * 0.14);
    ectx.font = `${Math.round(eR * 0.062)}px JetBrains Mono, monospace`;
    ectx.fillStyle = 'rgba(0,232,122,0.28)';
    ectx.fillText('potencjał redukcji', ex, ey + eR * 0.24);
    ectx.restore();

    requestAnimationFrame(animEarth);
  }
  animEarth();

  // ── CO2 bar animation on scroll ──
  const bar = document.getElementById('vcbBarRcpm');
  const numEl = document.getElementById('vcbNumber');
  let animated = false;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      // Animate bar fill to 25%
      setTimeout(() => { if (bar) bar.style.width = '25%'; }, 300);
      // Count up number
      let start = 0, end = 2.0, dur = 2000, startT = null;
      function countUp(ts) {
        if (!startT) startT = ts;
        const prog = Math.min((ts - startT) / dur, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        if (numEl) numEl.textContent = (start + (end - start) * ease).toFixed(1);
        if (prog < 1) requestAnimationFrame(countUp);
      }
      requestAnimationFrame(countUp);
    }
  }, { threshold: 0.3 });
  const wizja = document.getElementById('wizja');
  if (wizja) obs.observe(wizja);

})();

/* ══════════════════════════ */

(function() {

  // ── ANIMATION 1: Piston inertia ──
  const pc = document.getElementById('pistonCanvas');
  if (!pc) return;
  const px = pc.getContext('2d');

  function resizePC() {
    const rect = pc.getBoundingClientRect();
    pc.width  = rect.width  || 320;
    pc.height = rect.height || 260;
  }
  resizePC();
  new ResizeObserver(resizePC).observe(pc);

  let pt = 0;

  function drawPiston() {
    pt += 0.022;
    const W = pc.width, H = pc.height;
    px.clearRect(0, 0, W, H);

    // bg
    px.fillStyle = '#04040C'; px.fillRect(0, 0, W, H);

    const cx    = W * 0.38;
    const topY  = H * 0.10;
    const botY  = H * 0.82;
    const cylH  = botY - topY;
    const cylW  = W * 0.18;

    // RPM label — increases to show hard limit
    const rpm = 1000 + Math.floor(5500 * (0.5 + 0.5 * Math.sin(pt * 0.18)));
    const rpmFrac = (rpm - 1000) / 5500;
    const dangerColor = rpmFrac > 0.85 ? '#FF3030' : rpmFrac > 0.6 ? '#F5A623' : '#00E87A';

    px.font = `bold ${W*0.052}px Bebas Neue, sans-serif`;
    px.fillStyle = dangerColor; px.textAlign = 'left';
    px.fillText(`${rpm.toLocaleString()} RPM`, W * 0.62, H * 0.14);
    px.font = `${W*0.030}px JetBrains Mono, monospace`;
    px.fillStyle = 'rgba(255,255,255,0.25)';
    px.fillText('prędkość obrotowa', W * 0.62, H * 0.21);

    // Force magnitude — grows with v²
    const forceMag = Math.pow(rpmFrac, 2);
    const forceLabel = (forceMag * 48).toFixed(1) + ' kN';
    px.font = `bold ${W*0.042}px Bebas Neue, sans-serif`;
    px.fillStyle = forceMag > 0.7 ? '#FF3030' : '#F5A623'; px.textAlign = 'left';
    px.fillText('F = ' + forceLabel, W * 0.62, H * 0.35);
    px.font = `${W*0.026}px JetBrains Mono, monospace`;
    px.fillStyle = 'rgba(255,255,255,0.2)';
    px.fillText('siła bezwładności', W * 0.62, H * 0.41);

    // v² formula highlight
    px.font = `${W*0.034}px JetBrains Mono, monospace`;
    px.fillStyle = `rgba(245,166,35,${0.4 + 0.4 * rpmFrac})`;
    px.fillText('F ∝ v²', W * 0.62, H * 0.55);

    // Cylinder walls
    px.strokeStyle = 'rgba(100,120,160,0.5)'; px.lineWidth = 1.5;
    px.strokeRect(cx - cylW/2, topY, cylW, cylH);
    // Wall texture ticks
    for (let i = 0; i < 10; i++) {
      const ty = topY + (i / 9) * cylH;
      px.beginPath();
      px.moveTo(cx - cylW/2, ty); px.lineTo(cx - cylW/2 - 3, ty);
      px.moveTo(cx + cylW/2, ty); px.lineTo(cx + cylW/2 + 3, ty);
      px.strokeStyle = 'rgba(100,120,160,0.2)'; px.lineWidth = 1; px.stroke();
    }

    // Crankshaft circle
    const crankR  = cylH * 0.14;
    const crankCY = botY + crankR * 0.6;
    px.beginPath(); px.arc(cx, crankCY, crankR, 0, Math.PI*2);
    px.strokeStyle = 'rgba(245,166,35,0.4)'; px.lineWidth = 1; px.stroke();

    // Crank pin
    const crankAngle = pt * (2 + rpmFrac * 3);
    const pinX = cx + Math.cos(crankAngle) * crankR * 0.85;
    const pinY = crankCY + Math.sin(crankAngle) * crankR * 0.85;
    px.beginPath(); px.arc(pinX, pinY, 3, 0, Math.PI*2);
    px.fillStyle = '#F5A623'; px.fill();

    // Connecting rod
    // Piston position: sinusoidal from crank
    const pistonY = topY + cylH * 0.12 + (pinY - crankCY + crankR) / (crankR * 2) * cylH * 0.76;

    px.beginPath();
    px.moveTo(cx, pistonY + W * 0.06);
    px.lineTo(pinX, pinY);
    px.strokeStyle = 'rgba(180,190,210,0.5)'; px.lineWidth = 2; px.stroke();

    // Piston body
    const pH = cylH * 0.14, pW = cylW * 0.88;
    px.fillStyle = '#1A1E2E';
    px.strokeStyle = 'rgba(180,190,220,0.6)'; px.lineWidth = 1.5;
    px.beginPath();
    px.rect(cx - pW/2, pistonY, pW, pH);
    px.fill(); px.stroke();
    // Piston rings
    for (let r = 0; r < 3; r++) {
      const ry = pistonY + pH * (0.2 + r * 0.28);
      px.beginPath();
      px.moveTo(cx - pW/2 + 1, ry); px.lineTo(cx + pW/2 - 1, ry);
      px.strokeStyle = `rgba(100,120,160,0.5)`; px.lineWidth = 1; px.stroke();
    }

    // Force arrows — up and down alternating with piston direction
    const vel = Math.cos(crankAngle); // positive = moving down
    const arrowLen = forceMag * H * 0.22;
    const arrowColor = forceMag > 0.7 ? '#FF3030' : '#F5A623';

    if (Math.abs(vel) > 0.05) {
      const dir  = vel > 0 ? 1 : -1;
      const ay0  = pistonY + pH / 2;
      const ay1  = ay0 + dir * arrowLen;
      px.beginPath();
      px.moveTo(cx - cylW/2 - 18, ay0);
      px.lineTo(cx - cylW/2 - 18, ay1);
      px.strokeStyle = arrowColor; px.lineWidth = 2.5;
      px.setLineDash([]); px.stroke();
      // arrowhead
      px.beginPath();
      px.moveTo(cx - cylW/2 - 24, ay1 - dir * 8);
      px.lineTo(cx - cylW/2 - 18, ay1);
      px.lineTo(cx - cylW/2 - 12, ay1 - dir * 8);
      px.strokeStyle = arrowColor; px.lineWidth = 2; px.stroke();

      // Label force direction
      px.font = `${W*0.030}px JetBrains Mono, monospace`;
      px.fillStyle = arrowColor; px.textAlign = 'right';
      px.fillText(dir > 0 ? '↓ ruch' : '↑ ruch', cx - cylW/2 - 28, ay0 + dir * arrowLen * 0.5);
    }

    // Reversal flash at TDC/BDC
    if (Math.abs(Math.sin(crankAngle)) < 0.12 && forceMag > 0.4) {
      const flashY = Math.sin(crankAngle) < 0 ? topY : botY;
      const fg = px.createRadialGradient(cx, flashY, 0, cx, flashY, cylW * 1.2);
      fg.addColorStop(0, `rgba(255,80,30,${0.3 * forceMag})`);
      fg.addColorStop(1, 'transparent');
      px.fillStyle = fg;
      px.beginPath(); px.arc(cx, flashY, cylW * 1.2, 0, Math.PI*2); px.fill();
      px.font = `bold ${W*0.036}px JetBrains Mono, monospace`;
      px.fillStyle = `rgba(255,60,20,${0.8 * forceMag})`;
      px.textAlign = 'center';
      px.fillText('ZAWRÓT!', cx, flashY + (flashY < H/2 ? -8 : 20));
    }

    // Bottom label
    px.font = `${W*0.028}px JetBrains Mono, monospace`;
    px.fillStyle = 'rgba(255,48,48,0.45)'; px.textAlign = 'center';
    px.fillText('ruch posuwisto-zwrotny', cx, H * 0.97);

    requestAnimationFrame(drawPiston);
  }
  drawPiston();


  // ── ANIMATION 2: Thermal losses ──
  const tc = document.getElementById('thermalCanvas');
  if (!tc) return;
  const tx = tc.getContext('2d');

  function resizeTC() {
    const rect = tc.getBoundingClientRect();
    tc.width  = rect.width  || 320;
    tc.height = rect.height || 260;
  }
  resizeTC();
  new ResizeObserver(resizeTC).observe(tc);

  // Exhaust gas particles
  const exhaust = Array.from({length: 30}, () => ({
    x: 0.5, y: 0.55, vx: (Math.random()-0.3) * 0.006,
    vy: -(0.008 + Math.random() * 0.012),
    life: Math.random(), maxLife: 0.6 + Math.random() * 0.4,
    size: 3 + Math.random() * 5,
  }));
  const coolant = Array.from({length: 20}, () => ({
    x: Math.random(), y: 0.3 + Math.random() * 0.4,
    vx: (Math.random() - 0.5) * 0.004, vy: (Math.random() - 0.5) * 0.004,
    life: Math.random(), maxLife: 0.8 + Math.random() * 0.5,
  }));

  let tt = 0;
  function drawThermal() {
    tt += 0.018;
    const W = tc.width, H = tc.height;
    tx.clearRect(0, 0, W, H);
    tx.fillStyle = '#04040C'; tx.fillRect(0, 0, W, H);

    // Combustion cycle phase (0-1)
    const cycle = (tt * 0.3) % 1;
    const isCombustion = cycle > 0.45 && cycle < 0.65;
    const combustFrac  = isCombustion ? Math.sin((cycle - 0.45) / 0.20 * Math.PI) : 0;

    // Engine block (simplified rectangle)
    const bx = W * 0.22, by = H * 0.22;
    const bw = W * 0.36, bh = H * 0.50;

    // Block fill
    tx.fillStyle = '#10121E';
    tx.strokeStyle = 'rgba(100,110,140,0.4)'; tx.lineWidth = 1.5;
    tx.beginPath(); tx.rect(bx, by, bw, bh); tx.fill(); tx.stroke();

    // Combustion glow inside block
    if (combustFrac > 0.05) {
      const cg = tx.createRadialGradient(bx+bw/2, by+bh*0.38, 0, bx+bw/2, by+bh*0.38, bw*0.65);
      cg.addColorStop(0, `rgba(255,180,20,${combustFrac * 0.7})`);
      cg.addColorStop(0.4,`rgba(255,80,10,${combustFrac * 0.35})`);
      cg.addColorStop(1,  'transparent');
      tx.save(); tx.beginPath(); tx.rect(bx,by,bw,bh); tx.clip();
      tx.fillStyle = cg; tx.fillRect(bx,by,bw,bh);
      tx.restore();
    }

    // ── FLOW LABELS — three loss paths ──
    const now = tt;

    // 1. EXHAUST — top, red/orange particles rising
    exhaust.forEach(p => {
      p.life += 0.025;
      if (p.life > p.maxLife) {
        p.x = 0.42 + (Math.random()-0.5)*0.08;
        p.y = 0.28; p.life = 0;
        p.vx = (Math.random()-0.4)*0.006;
        p.vy = -(0.007 + Math.random()*0.010);
      }
      p.x += p.vx; p.y += p.vy;
      const alpha = Math.sin(p.life / p.maxLife * Math.PI) * 0.55;
      const heat  = 1 - p.life / p.maxLife;
      const col   = `rgba(${Math.floor(255)},${Math.floor(heat*100)},0,${alpha})`;
      const pg = tx.createRadialGradient(p.x*W, p.y*H, 0, p.x*W, p.y*H, p.size*1.5);
      pg.addColorStop(0, col); pg.addColorStop(1, 'transparent');
      tx.fillStyle = pg;
      tx.beginPath(); tx.arc(p.x*W, p.y*H, p.size*1.5, 0, Math.PI*2); tx.fill();
    });

    // Exhaust pipe
    tx.beginPath();
    tx.moveTo(bx + bw*0.5, by);
    tx.lineTo(bx + bw*0.5, by - H*0.12);
    tx.strokeStyle = 'rgba(255,80,20,0.4)'; tx.lineWidth = 4; tx.stroke();
    tx.font = `bold ${W*0.042}px Bebas Neue, sans-serif`;
    tx.fillStyle = 'rgba(255,80,20,0.7)'; tx.textAlign = 'center';
    tx.fillText('~30% → WYDECH', bx + bw*0.5, by - H*0.16);

    // 2. COOLANT — right side, blue dots
    coolant.forEach(p => {
      p.life += 0.018;
      if (p.life > p.maxLife) {
        p.x = 0.62 + Math.random()*0.08; p.y = 0.3 + Math.random()*0.35;
        p.life = 0; p.vx = 0.004 + Math.random()*0.003; p.vy = (Math.random()-0.5)*0.003;
      }
      p.x += p.vx; p.y += p.vy;
      if (p.x > 0.95) p.life = p.maxLife;
      const al = Math.sin(p.life / p.maxLife * Math.PI) * 0.5;
      tx.beginPath(); tx.arc(p.x*W, p.y*H, 2.5, 0, Math.PI*2);
      tx.fillStyle = `rgba(0,180,255,${al})`; tx.fill();
    });
    tx.font = `bold ${W*0.038}px Bebas Neue, sans-serif`;
    tx.fillStyle = 'rgba(0,180,255,0.6)'; tx.textAlign = 'left';
    tx.fillText('~32%', W*0.70, H*0.28);
    tx.font = `${W*0.028}px JetBrains Mono, monospace`;
    tx.fillStyle = 'rgba(0,180,255,0.35)'; tx.textAlign = 'left';
    tx.fillText('→ chłodzenie', W*0.70, H*0.35);

    // 3. FRICTION — bottom, yellow wavy
    tx.font = `bold ${W*0.038}px Bebas Neue, sans-serif`;
    tx.fillStyle = 'rgba(245,166,35,0.55)'; tx.textAlign = 'left';
    tx.fillText('~5% → tarcie', W*0.12, H*0.90);

    // USEFUL WORK — green, bottom right of engine
    const usefulPulse = 0.5 + 0.5 * Math.sin(now * 2);
    tx.font = `bold ${W*0.048}px Bebas Neue, sans-serif`;
    tx.fillStyle = `rgba(0,232,122,${0.7 + 0.3*usefulPulse})`; tx.textAlign = 'center';
    tx.shadowColor = '#00E87A'; tx.shadowBlur = 12 * usefulPulse;
    tx.fillText('33%', bx + bw*1.55, by + bh*0.55);
    tx.shadowBlur = 0;
    tx.font = `${W*0.026}px JetBrains Mono, monospace`;
    tx.fillStyle = 'rgba(0,232,122,0.45)'; tx.textAlign = 'center';
    tx.fillText('użyteczna', bx + bw*1.55, by + bh*0.65);
    tx.fillText('praca', bx + bw*1.55, by + bh*0.73);

    // Arrow: engine → wheel
    tx.beginPath();
    tx.moveTo(bx + bw, by + bh*0.5);
    tx.lineTo(bx + bw + W*0.08, by + bh*0.5);
    tx.strokeStyle = 'rgba(0,232,122,0.4)'; tx.lineWidth = 2;
    tx.setLineDash([4,4]); tx.stroke(); tx.setLineDash([]);

    // Bottom loss bar
    const barX = bx, barY = H*0.88, barW = bw, barH = 7;
    tx.fillStyle = 'rgba(255,255,255,0.05)';
    tx.beginPath(); tx.rect(barX, barY, barW, barH); tx.fill();
    // Losses: 30% exhaust, 32% coolant, 5% friction = 67% lost
    const segs = [
      { frac: 0.30, col: '#FF5014' },
      { frac: 0.32, col: '#0090C8' },
      { frac: 0.05, col: '#F5A623' },
      { frac: 0.33, col: '#00E87A' },
    ];
    let bOff = 0;
    segs.forEach(s => {
      tx.fillStyle = s.col;
      tx.beginPath(); tx.rect(barX + bOff*barW, barY, s.frac*barW, barH); tx.fill();
      bOff += s.frac;
    });

    requestAnimationFrame(drawThermal);
  }
  drawThermal();

})();

/* ══════════════════════════ */

(function() {

  // ── shared resize helper ──
  function autoResize(canvas) {
    function go() {
      const r = canvas.getBoundingClientRect();
      if (r.width > 0) { canvas.width = r.width; canvas.height = r.height || r.width * 0.82; }
    }
    go(); new ResizeObserver(go).observe(canvas);
  }

  // ════════════════════════════════
  // CANVAS A — classic piston (bad)
  // ════════════════════════════════
  const cpC = document.getElementById('compPistonCanvas');
  if (!cpC) return;
  const cpX = cpC.getContext('2d');
  autoResize(cpC);

  let cpt = 0;
  // Inertia force trace buffer
  const forceTrace = new Array(80).fill(0);

  function drawCompPiston() {
    cpt += 0.025;
    const W = cpC.width, H = cpC.height;
    cpX.clearRect(0,0,W,H);
    cpX.fillStyle = '#04040C'; cpX.fillRect(0,0,W,H);

    const cx = W * 0.40, topY = H * 0.08, botY = H * 0.72;
    const cylH = botY - topY, cylW = W * 0.20;

    // Crank
    const crankR = cylH * 0.15;
    const crankCY = botY + crankR * 0.7;
    const angle = cpt * 2.8;
    const pinX = cx + Math.cos(angle) * crankR * 0.9;
    const pinY = crankCY + Math.sin(angle) * crankR * 0.9;

    // Simplified piston pos (slider-crank approximation)
    const r = crankR, L = cylH * 0.55;
    const cosA = Math.cos(angle), sinA = Math.sin(angle);
    const pistonY = crankCY - r*cosA - Math.sqrt(L*L - r*r*sinA*sinA);
    const vel = Math.sin(angle); // proxy for velocity direction

    // Inertia force magnitude: F ∝ ω² · r · (cos θ + r/L · cos 2θ)
    const lambda = r / L;
    const inertia = Math.abs(Math.cos(angle) + lambda * Math.cos(2 * angle));
    forceTrace.shift(); forceTrace.push(inertia);

    // ── Cylinder ──
    cpX.strokeStyle = 'rgba(90,100,130,0.5)'; cpX.lineWidth = 1.5;
    cpX.strokeRect(cx - cylW/2, topY, cylW, cylH);
    // hatching walls
    for (let i=0; i<8; i++) {
      const ty = topY + (i/7)*cylH;
      cpX.beginPath();
      cpX.moveTo(cx-cylW/2-1,ty); cpX.lineTo(cx-cylW/2-5,ty);
      cpX.moveTo(cx+cylW/2+1,ty); cpX.lineTo(cx+cylW/2+5,ty);
      cpX.strokeStyle='rgba(90,100,130,0.2)'; cpX.lineWidth=1; cpX.stroke();
    }

    // ── Crankshaft ──
    cpX.beginPath(); cpX.arc(cx, crankCY, crankR, 0, Math.PI*2);
    cpX.strokeStyle='rgba(245,166,35,0.3)'; cpX.lineWidth=1; cpX.stroke();
    cpX.beginPath(); cpX.arc(pinX, pinY, 3.5, 0, Math.PI*2);
    cpX.fillStyle='#F5A623'; cpX.fill();

    // ── Connecting rod ──
    const pBotY = pistonY + H*0.065;
    cpX.beginPath(); cpX.moveTo(cx, pBotY); cpX.lineTo(pinX, pinY);
    cpX.strokeStyle='rgba(160,170,200,0.45)'; cpX.lineWidth=2; cpX.stroke();

    // ── Piston ──
    const pH = cylH*0.13, pW = cylW*0.90;
    cpX.fillStyle='#14182A'; cpX.strokeStyle='rgba(160,170,200,0.55)'; cpX.lineWidth=1.2;
    cpX.beginPath(); cpX.rect(cx-pW/2, pistonY, pW, pH); cpX.fill(); cpX.stroke();
    [0.25,0.55,0.80].forEach(f => {
      cpX.beginPath();
      cpX.moveTo(cx-pW/2+1, pistonY+pH*f); cpX.lineTo(cx+pW/2-1, pistonY+pH*f);
      cpX.strokeStyle='rgba(100,110,150,0.4)'; cpX.lineWidth=1; cpX.stroke();
    });

    // ── Inertia force arrow ──
    const fMag = inertia * H * 0.18;
    const dir = Math.sin(angle) > 0 ? 1 : -1;
    const ax = cx - cylW/2 - 22;
    const ay0 = pistonY + pH/2;
    const ay1 = ay0 + dir * fMag;
    const red = Math.min(1, inertia * 0.9);
    const arrowCol = `rgba(${Math.floor(80 + 175*red)},${Math.floor(80*(1-red))},${Math.floor(50*(1-red))},0.85)`;

    cpX.beginPath(); cpX.moveTo(ax, ay0); cpX.lineTo(ax, ay1);
    cpX.strokeStyle=arrowCol; cpX.lineWidth=2.5; cpX.stroke();
    cpX.beginPath();
    cpX.moveTo(ax-5, ay1 - dir*8); cpX.lineTo(ax, ay1); cpX.lineTo(ax+5, ay1 - dir*8);
    cpX.strokeStyle=arrowCol; cpX.lineWidth=2; cpX.stroke();

    // Force label
    cpX.font = `${W*0.030}px JetBrains Mono, monospace`;
    cpX.fillStyle = arrowCol; cpX.textAlign='right';
    cpX.fillText('F∝v²', ax-8, ay0 + dir*fMag*0.45);

    // Reversal flash
    if (inertia > 1.3) {
      const fy = Math.cos(angle) > 0 ? topY : botY;
      const fg = cpX.createRadialGradient(cx, fy, 0, cx, fy, cylW);
      fg.addColorStop(0,`rgba(255,50,20,${(inertia-1.3)*0.5})`);
      fg.addColorStop(1,'transparent');
      cpX.fillStyle=fg;
      cpX.beginPath(); cpX.arc(cx, fy, cylW, 0, Math.PI*2); cpX.fill();
      cpX.font=`bold ${W*0.030}px JetBrains Mono, monospace`;
      cpX.fillStyle=`rgba(255,50,20,0.8)`; cpX.textAlign='center';
      cpX.fillText('ZAWRÓT!', cx, fy + (fy < H/2 ? -6 : 16));
    }

    // ── Force trace graph (right side) ──
    const gx = W*0.67, gy = H*0.12, gw = W*0.28, gh = H*0.55;
    cpX.strokeStyle='rgba(255,255,255,0.05)'; cpX.lineWidth=1;
    cpX.strokeRect(gx, gy, gw, gh);
    cpX.font=`${W*0.022}px JetBrains Mono, monospace`;
    cpX.fillStyle='rgba(255,255,255,0.2)'; cpX.textAlign='center';
    cpX.fillText('SIŁA BEZWŁADNOŚCI', gx+gw/2, gy-5);

    cpX.beginPath();
    forceTrace.forEach((v, i) => {
      const fx2 = gx + (i/79)*gw;
      const fy2 = gy + gh - (v/2.2)*gh;
      i===0 ? cpX.moveTo(fx2,fy2) : cpX.lineTo(fx2,fy2);
    });
    cpX.strokeStyle='rgba(255,80,30,0.7)'; cpX.lineWidth=1.5; cpX.stroke();

    // Current force dot
    const lastV = forceTrace[79];
    cpX.beginPath(); cpX.arc(gx+gw, gy+gh-(lastV/2.2)*gh, 3, 0, Math.PI*2);
    cpX.fillStyle='#FF5020'; cpX.fill();

    cpX.font=`${W*0.024}px JetBrains Mono, monospace`;
    cpX.fillStyle='rgba(255,80,30,0.6)'; cpX.textAlign='center';
    cpX.fillText(`F = ${(lastV*48).toFixed(1)} kN`, gx+gw/2, gy+gh+14);

    requestAnimationFrame(drawCompPiston);
  }
  drawCompPiston();


  // ════════════════════════════════
  // CANVAS B — RCPM (good)
  // ════════════════════════════════
  const rcC = document.getElementById('compRcpmCanvas');
  if (!rcC) return;
  const rcX = rcC.getContext('2d');
  autoResize(rcC);

  let rct = 0;
  const rcpmTrace = new Array(80).fill(0);

  function drawCompRcpm() {
    rct += 0.025;
    const W = rcC.width, H = rcC.height;
    rcX.clearRect(0,0,W,H);
    rcX.fillStyle = '#020A04'; rcX.fillRect(0,0,W,H);

    const cx = W*0.40, cy = H*0.44;
    const hubR = W*0.055;
    const nCyl = 3;
    const cylOrb = W*0.255;  // orbit radius of cylinder centres
    const cylL = W*0.20;
    const cylW2 = W*0.062;

    const rot = rct * 1.1;  // rotation speed

    // ── Background orbit ring ──
    rcX.beginPath(); rcX.arc(cx, cy, cylOrb, 0, Math.PI*2);
    rcX.strokeStyle='rgba(0,212,255,0.10)'; rcX.lineWidth=1;
    rcX.setLineDash([3,10]); rcX.stroke(); rcX.setLineDash([]);

    // ── Radial spokes ──
    for (let i=0; i<nCyl; i++) {
      const a = (i/nCyl)*Math.PI*2 + rot;
      rcX.beginPath();
      rcX.moveTo(cx, cy);
      rcX.lineTo(cx + Math.cos(a)*(cylOrb + cylL*0.55), cy + Math.sin(a)*(cylOrb + cylL*0.55));
      rcX.strokeStyle='rgba(0,212,255,0.12)'; rcX.lineWidth=1.5; rcX.stroke();
    }

    // ── Draw each cylinder ──
    for (let i=0; i<nCyl; i++) {
      const a = (i/nCyl)*Math.PI*2 + rot;
      const phase = ((rct*0.9 + i/nCyl) % 1 + 1) % 1;
      const pistonFrac = 0.15 + 0.70 * (0.5 + 0.5*Math.sin(phase*Math.PI*2));
      const firing = phase > 0.45 && phase < 0.68;
      const fi = firing ? Math.sin((phase-0.45)/0.23*Math.PI) : 0;

      // Cylinder centre (orbiting)
      const ocx = cx + Math.cos(a)*cylOrb;
      const ocy = cy + Math.sin(a)*cylOrb;

      rcX.save();
      rcX.translate(ocx, ocy);
      rcX.rotate(a + Math.PI/2);  // radial orientation

      // Cylinder body
      rcX.beginPath(); rcX.rect(-cylW2/2, -cylL/2, cylW2, cylL);
      rcX.fillStyle='#08101A';
      rcX.strokeStyle = firing ? `rgba(0,232,122,${0.4+fi*0.4})` : 'rgba(0,180,255,0.25)';
      rcX.lineWidth=1.2; rcX.fill(); rcX.stroke();

      // Piston position (radial — moves outward on power stroke)
      const pPos = -cylL/2 + pistonFrac*cylL;
      rcX.beginPath();
      rcX.moveTo(-cylW2/2+2, pPos); rcX.lineTo(cylW2/2-2, pPos);
      rcX.strokeStyle = firing ? `rgba(0,232,122,${0.7+fi*0.3})` : 'rgba(0,200,255,0.45)';
      rcX.lineWidth=1.5; rcX.stroke();

      // Combustion glow
      if (fi > 0.1) {
        const cg2 = rcX.createRadialGradient(0, -cylL/2 + pistonFrac*cylL*0.6, 0, 0, 0, cylW2);
        cg2.addColorStop(0, `rgba(0,255,120,${fi*0.35})`);
        cg2.addColorStop(1, 'transparent');
        rcX.fillStyle=cg2; rcX.fillRect(-cylW2/2,-cylL/2,cylW2,cylL);
      }

      // No reversal stress — show "smooth" indicator
      if (!firing) {
        rcX.font=`${W*0.022}px JetBrains Mono, monospace`;
        rcX.fillStyle='rgba(0,212,255,0.25)'; rcX.textAlign='center';
        rcX.fillText('~', 0, pPos-8);
      }

      rcX.restore();
    }

    // Hub / bearing ring
    rcX.beginPath(); rcX.arc(cx, cy, hubR*1.2, 0, Math.PI*2);
    rcX.strokeStyle='rgba(0,212,255,0.35)'; rcX.lineWidth=1.5; rcX.stroke();
    const hg = rcX.createRadialGradient(cx,cy,0,cx,cy,hubR*1.2);
    hg.addColorStop(0,'rgba(0,180,255,0.15)');
    hg.addColorStop(1,'transparent');
    rcX.fillStyle=hg; rcX.fill();
    rcX.beginPath(); rcX.arc(cx,cy,hubR*0.4,0,Math.PI*2);
    rcX.fillStyle='rgba(0,212,255,0.5)'; rcX.fill();

    // ── Force trace — nearly flat (no inertia reversal) ──
    // Coriolis contribution is small and smooth
    const coriolisF = 0.08 + 0.05*Math.sin(rct*2.8 + 0.5);
    rcpmTrace.shift(); rcpmTrace.push(coriolisF);

    const gx = W*0.67, gy = H*0.12, gw = W*0.28, gh = H*0.55;
    rcX.strokeStyle='rgba(255,255,255,0.05)'; rcX.lineWidth=1;
    rcX.strokeRect(gx, gy, gw, gh);
    rcX.font=`${W*0.022}px JetBrains Mono, monospace`;
    rcX.fillStyle='rgba(0,212,255,0.25)'; rcX.textAlign='center';
    rcX.fillText('SIŁA BEZWŁADNOŚCI', gx+gw/2, gy-5);

    rcX.beginPath();
    rcpmTrace.forEach((v,i) => {
      const fx2 = gx+(i/79)*gw;
      const fy2 = gy+gh-(v/2.2)*gh;
      i===0 ? rcX.moveTo(fx2,fy2) : rcX.lineTo(fx2,fy2);
    });
    rcX.strokeStyle='rgba(0,232,122,0.7)'; rcX.lineWidth=1.5; rcX.stroke();

    rcX.beginPath(); rcX.arc(gx+gw, gy+gh-(coriolisF/2.2)*gh, 3, 0, Math.PI*2);
    rcX.fillStyle='#00E87A'; rcX.fill();

    // Scale ref line — piston max
    const refY = gy+gh-(2.2/2.2)*gh;
    rcX.beginPath(); rcX.moveTo(gx, refY); rcX.lineTo(gx+gw, refY);
    rcX.strokeStyle='rgba(255,80,30,0.2)'; rcX.lineWidth=1;
    rcX.setLineDash([3,6]); rcX.stroke(); rcX.setLineDash([]);
    rcX.font=`${W*0.020}px JetBrains Mono, monospace`;
    rcX.fillStyle='rgba(255,80,30,0.35)'; rcX.textAlign='right';
    rcX.fillText('max tłok', gx+gw-2, refY-3);

    rcX.font=`${W*0.024}px JetBrains Mono, monospace`;
    rcX.fillStyle='rgba(0,232,122,0.6)'; rcX.textAlign='center';
    rcX.fillText(`F ≈ ${(coriolisF*48).toFixed(1)} kN`, gx+gw/2, gy+gh+14);

    // RPM annotation
    const dispRpm = Math.floor(11500 + 2000*Math.sin(rct*0.12));
    rcX.font=`bold ${W*0.038}px Bebas Neue, sans-serif`;
    rcX.fillStyle='rgba(0,232,122,0.7)'; rcX.textAlign='left';
    rcX.fillText(`${dispRpm.toLocaleString()} RPM`, W*0.02, H*0.94);
    rcX.font=`${W*0.022}px JetBrains Mono, monospace`;
    rcX.fillStyle='rgba(0,232,122,0.3)'; rcX.fillText('bez hard limitu', W*0.02, H*0.99);

    // Coriolis annotation
    rcX.save();
    rcX.font=`${W*0.024}px JetBrains Mono, monospace`;
    rcX.fillStyle='rgba(0,212,255,0.4)'; rcX.textAlign='center';
    rcX.fillText('Coriolis → pomaga sprężać', cx, H*0.89);
    rcX.restore();

    requestAnimationFrame(drawCompRcpm);
  }
  drawCompRcpm();

})();