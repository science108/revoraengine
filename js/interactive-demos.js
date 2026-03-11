/* ══════════════════════════════════════════════════════════════
   INTERACTIVE DEMOS — Phase 4
   1. 12-Stroke Cycle Visualizer
   2. Fuel Comparison Calculator
   3. Weight/Power Density Comparison
   4. Enhanced AKS Heat Buffering Animation
══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ────────────────────────────────────────────────
     1. 12-STROKE CYCLE VISUALIZER
  ──────────────────────────────────────────────── */
  const cycleCanvas = document.getElementById('cycleCanvas');
  if (cycleCanvas) {
    const ctx = cycleCanvas.getContext('2d');
    let W, H;
    let currentStroke = 0;
    let animPhase = 0;
    let isPlaying = true;
    let playSpeed = 1;

    const strokes = [
      { name: 'INTAKE 1',      phase: 'intake',      color: '#4488FF', desc: 'Fresh charge enters cylinder' },
      { name: 'COMPRESSION 1', phase: 'compression',  color: '#00AAFF', desc: 'First compression stage' },
      { name: 'INJECTION',     phase: 'injection',    color: '#F5A623', desc: 'Fuel micro-injection at optimal phase' },
      { name: 'COMBUSTION 1',  phase: 'combustion',   color: '#FF6030', desc: 'Primary combustion event' },
      { name: 'EXPANSION 1',   phase: 'expansion',    color: '#FF3030', desc: 'Power extraction — first expansion' },
      { name: 'RECOMPRESSION', phase: 'compression',  color: '#00AAFF', desc: 'Residual gas recompression' },
      { name: 'COMBUSTION 2',  phase: 'combustion',   color: '#FF6030', desc: 'Secondary combustion — AKS heat reuse' },
      { name: 'EXPANSION 2',   phase: 'expansion',    color: '#FF3030', desc: 'Second power extraction' },
      { name: 'SCAVENGING 1',  phase: 'exhaust',      color: '#8C95AA', desc: 'Partial exhaust gas expulsion' },
      { name: 'COMBUSTION 3',  phase: 'combustion',   color: '#FF6030', desc: 'Tertiary combustion from residual heat' },
      { name: 'EXPANSION 3',   phase: 'expansion',    color: '#00E87A', desc: 'Final expansion — maximum extraction' },
      { name: 'EXHAUST',       phase: 'exhaust',      color: '#5A6278', desc: 'Complete exhaust evacuation' },
    ];

    function resizeCycle() {
      const rect = cycleCanvas.getBoundingClientRect();
      W = cycleCanvas.width = rect.width || 600;
      H = cycleCanvas.height = rect.height || 360;
    }
    resizeCycle();
    window.addEventListener('resize', resizeCycle);

    function drawCycleViz() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#04040C';
      ctx.fillRect(0, 0, W, H);

      const s = strokes[currentStroke];
      const cx = W * 0.32, cy = H * 0.5;
      const cylR = Math.min(W, H) * 0.22;

      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      ctx.beginPath();
      ctx.arc(cx, cy, cylR + 20, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,212,255,0.12)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      const rot = animPhase * 0.3;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      ctx.beginPath();
      ctx.arc(0, 0, cylR, 0, Math.PI * 2);
      ctx.strokeStyle = s.color + '88';
      ctx.lineWidth = 2;
      ctx.stroke();

      const pistonPos = Math.sin(animPhase * 2) * cylR * 0.35;
      const pistonH = cylR * 0.25;
      const pistonW = cylR * 0.5;

      ctx.fillStyle = '#0A0E1C';
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-pistonW / 2, pistonPos - pistonH / 2, pistonW, pistonH);
      ctx.fill();
      ctx.stroke();

      if (s.phase === 'combustion') {
        const fi = Math.sin(animPhase * 4) * 0.5 + 0.5;
        const cg = ctx.createRadialGradient(0, -cylR * 0.3, 0, 0, -cylR * 0.3, cylR * 0.5);
        cg.addColorStop(0, `rgba(255,120,20,${fi * 0.5})`);
        cg.addColorStop(1, 'transparent');
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(0, -cylR * 0.3, cylR * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (s.phase === 'intake') {
        for (let i = 0; i < 5; i++) {
          const py = -cylR + i * 12 + (animPhase * 30) % 60;
          ctx.beginPath();
          ctx.arc(-pistonW * 0.15 + i * 8, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(68,136,255,${0.5 - i * 0.08})`;
          ctx.fill();
        }
      }

      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.fill();

      ctx.restore();

      const infoX = W * 0.62, infoY = H * 0.1;
      ctx.font = `bold ${Math.max(14, W * 0.032)}px 'Bebas Neue', sans-serif`;
      ctx.fillStyle = s.color;
      ctx.textAlign = 'left';
      ctx.fillText(`STROKE ${currentStroke + 1}/12`, infoX, infoY);

      ctx.font = `bold ${Math.max(18, W * 0.04)}px 'Bebas Neue', sans-serif`;
      ctx.fillStyle = '#fff';
      ctx.fillText(s.name, infoX, infoY + 32);

      ctx.font = `${Math.max(11, W * 0.022)}px 'Rajdhani', sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.fillText(s.desc, infoX, infoY + 54);

      const barW = W * 0.34, barH = 6, barX = infoX, barY = infoY + 74;
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(barX, barY, barW, barH);
      const progress = (currentStroke + animPhase % 1) / 12;
      ctx.fillStyle = s.color;
      ctx.fillRect(barX, barY, barW * progress, barH);

      const dotR = 6, dotGap = barW / 12;
      for (let i = 0; i < 12; i++) {
        const dx = barX + dotGap * i + dotGap / 2;
        const dy = barY + 24;
        ctx.beginPath();
        ctx.arc(dx, dy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = i <= currentStroke ? strokes[i].color : 'rgba(255,255,255,0.08)';
        ctx.fill();
        if (i === currentStroke) {
          ctx.beginPath();
          ctx.arc(dx, dy, dotR + 3, 0, Math.PI * 2);
          ctx.strokeStyle = strokes[i].color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      const phaseLabel = s.phase.toUpperCase();
      ctx.font = `${Math.max(9, W * 0.018)}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = s.color + '88';
      ctx.fillText(`// ${phaseLabel}`, infoX, barY + 54);

      if (isPlaying) {
        animPhase += 0.015 * playSpeed;
        if (animPhase >= Math.PI) {
          animPhase = 0;
          currentStroke = (currentStroke + 1) % 12;
        }
      }

      requestAnimationFrame(drawCycleViz);
    }

    drawCycleViz();

    const prevBtn = document.getElementById('cycleStepPrev');
    const nextBtn = document.getElementById('cycleStepNext');
    const playBtn = document.getElementById('cyclePlayPause');

    if (prevBtn) prevBtn.addEventListener('click', function () {
      currentStroke = (currentStroke - 1 + 12) % 12;
      animPhase = 0;
    });
    if (nextBtn) nextBtn.addEventListener('click', function () {
      currentStroke = (currentStroke + 1) % 12;
      animPhase = 0;
    });
    if (playBtn) playBtn.addEventListener('click', function () {
      isPlaying = !isPlaying;
      playBtn.textContent = isPlaying ? '⏸ Pause' : '▶ Play';
    });
  }


  /* ────────────────────────────────────────────────
     2. FUEL COMPARISON CALCULATOR
  ──────────────────────────────────────────────── */
  const fuelCalc = document.getElementById('fuelCalcWidget');
  if (fuelCalc) {
    const fuels = [
      { id: 'hydrogen', name: '💧 Hydrogen',    density: 33000, co2: 0,   effRCPM: 0.62, effConv: 0.35, color: '#00D4FF' },
      { id: 'efuel',    name: '🌿 e-Fuel',      density: 8500,  co2: 28,  effRCPM: 0.60, effConv: 0.38, color: '#00E87A' },
      { id: 'biofuel',  name: '🌱 Biofuel',     density: 8000,  co2: 35,  effRCPM: 0.58, effConv: 0.36, color: '#64CC64' },
      { id: 'petrol',   name: '⛽ Petrol',      density: 12000, co2: 164, effRCPM: 0.60, effConv: 0.38, color: '#8C95AA' },
      { id: 'diesel',   name: '⛽ Diesel',      density: 12600, co2: 156, effRCPM: 0.61, effConv: 0.42, color: '#6B7280' },
      { id: 'lpg',      name: '⚗️ LPG/CNG',     density: 6500,  co2: 120, effRCPM: 0.58, effConv: 0.34, color: '#F5A623' },
    ];

    let selectedFuel = 0;
    const btns = fuelCalc.querySelectorAll('.fuel-btn');
    const rangeConv = document.getElementById('fcRangeConv');
    const rangeRcpm = document.getElementById('fcRangeRcpm');
    const co2Conv = document.getElementById('fcCo2Conv');
    const co2Rcpm = document.getElementById('fcCo2Rcpm');
    const effConv = document.getElementById('fcEffConv');
    const effRcpm = document.getElementById('fcEffRcpm');
    const barConv = document.getElementById('fcBarConv');
    const barRcpm = document.getElementById('fcBarRcpm');

    function updateFuelCalc() {
      const f = fuels[selectedFuel];
      const tankKg = 40;
      const consumption = 8;
      const rConv = Math.round(tankKg * f.density * f.effConv / (consumption * 1000));
      const rRcpm = Math.round(tankKg * f.density * f.effRCPM / (consumption * 1000));
      const co2c = f.co2;
      const co2r = Math.round(f.co2 * f.effConv / f.effRCPM * 0.85);
      const maxRange = Math.max(rConv, rRcpm, 1);

      if (rangeConv) rangeConv.textContent = rConv + ' km';
      if (rangeRcpm) rangeRcpm.textContent = rRcpm + ' km';
      if (co2Conv) co2Conv.textContent = co2c + ' g/km';
      if (co2Rcpm) co2Rcpm.textContent = co2r + ' g/km';
      if (effConv) effConv.textContent = Math.round(f.effConv * 100) + '%';
      if (effRcpm) effRcpm.textContent = Math.round(f.effRCPM * 100) + '%';
      if (barConv) barConv.style.width = (rConv / maxRange * 100) + '%';
      if (barRcpm) barRcpm.style.width = (rRcpm / maxRange * 100) + '%';

      btns.forEach(function (b, i) {
        b.classList.toggle('fuel-btn-active', i === selectedFuel);
        b.style.borderColor = i === selectedFuel ? fuels[i].color : 'rgba(255,255,255,0.08)';
      });
    }

    btns.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        selectedFuel = i;
        updateFuelCalc();
      });
    });

    updateFuelCalc();
  }


  /* ────────────────────────────────────────────────
     3. WEIGHT / POWER DENSITY COMPARISON
  ──────────────────────────────────────────────── */
  const wpCanvas = document.getElementById('wpCompCanvas');
  if (wpCanvas) {
    const wpCtx = wpCanvas.getContext('2d');
    let wpW, wpH;

    const engines = [
      { name: 'Conv. 4-cyl',  mass: 130, rpm: 6500,  eff: 38, color: '#5A6278' },
      { name: 'Turbo 4-cyl',  mass: 115, rpm: 7000,  eff: 42, color: '#4488FF' },
      { name: 'Wankel RE',    mass: 80,  rpm: 9000,  eff: 25, color: '#FF6622' },
      { name: 'F1 V6 Hybrid', mass: 150, rpm: 15000, eff: 50, color: '#FF3030' },
      { name: 'RCPM PSG100',  mass: 8,   rpm: 19100, eff: 62, color: '#F5A623', highlight: true },
    ];

    function resizeWP() {
      const r = wpCanvas.getBoundingClientRect();
      wpW = wpCanvas.width = r.width || 600;
      wpH = wpCanvas.height = r.height || 340;
    }
    resizeWP();
    window.addEventListener('resize', resizeWP);

    let wpT = 0;
    function drawWPComp() {
      wpT += 0.012;
      wpCtx.clearRect(0, 0, wpW, wpH);
      wpCtx.fillStyle = '#04040C';
      wpCtx.fillRect(0, 0, wpW, wpH);

      wpCtx.strokeStyle = 'rgba(255,255,255,0.03)';
      wpCtx.lineWidth = 1;
      for (let x = 0; x < wpW; x += 30) { wpCtx.beginPath(); wpCtx.moveTo(x, 0); wpCtx.lineTo(x, wpH); wpCtx.stroke(); }

      const padL = 60, padR = 30, padT = 50, padB = 60;
      const chartW = wpW - padL - padR;
      const chartH = wpH - padT - padB;
      const barH = chartH / engines.length - 8;
      const maxMass = 160;
      const maxRPM = 20000;

      wpCtx.font = `${Math.max(9, wpW * 0.016)}px 'JetBrains Mono', monospace`;
      wpCtx.fillStyle = 'rgba(255,255,255,0.2)';
      wpCtx.textAlign = 'center';
      wpCtx.fillText('MASS (kg) — lower is better', padL + chartW * 0.25, padT - 12);
      wpCtx.fillText('MAX RPM — higher is better', padL + chartW * 0.75, padT - 12);

      engines.forEach(function (eng, i) {
        const y = padT + i * (barH + 8);
        const massW = (eng.mass / maxMass) * chartW * 0.48;
        const rpmW = (eng.rpm / maxRPM) * chartW * 0.48;
        const midX = padL + chartW * 0.5;
        const pulse = eng.highlight ? 0.7 + 0.3 * Math.sin(wpT * 3 + i) : 1;

        wpCtx.fillStyle = eng.color + (eng.highlight ? 'DD' : '88');
        wpCtx.fillRect(midX - massW, y, massW, barH * 0.7);

        wpCtx.fillStyle = eng.color + (eng.highlight ? 'DD' : '66');
        wpCtx.fillRect(midX + 2, y, rpmW * pulse, barH * 0.7);

        wpCtx.font = `${Math.max(10, wpW * 0.020)}px 'JetBrains Mono', monospace`;
        wpCtx.fillStyle = eng.highlight ? eng.color : 'rgba(255,255,255,0.45)';
        wpCtx.textAlign = 'right';
        wpCtx.fillText(eng.name, padL - 4, y + barH * 0.45);

        wpCtx.font = `bold ${Math.max(9, wpW * 0.016)}px 'JetBrains Mono', monospace`;
        wpCtx.textAlign = 'left';
        wpCtx.fillStyle = eng.color;
        wpCtx.fillText(eng.mass + ' kg', midX - massW - 4 < padL ? midX - massW + 4 : midX - massW - 40, y + barH * 0.45);
        wpCtx.fillText(eng.rpm.toLocaleString() + ' rpm', midX + rpmW * pulse + 6, y + barH * 0.45);

        if (eng.highlight) {
          wpCtx.strokeStyle = eng.color + '44';
          wpCtx.lineWidth = 1;
          wpCtx.setLineDash([3, 5]);
          wpCtx.strokeRect(midX - massW - 2, y - 2, massW + rpmW * pulse + 6, barH * 0.7 + 4);
          wpCtx.setLineDash([]);
        }
      });

      wpCtx.beginPath();
      wpCtx.moveTo(padL + chartW * 0.5, padT - 6);
      wpCtx.lineTo(padL + chartW * 0.5, padT + chartH);
      wpCtx.strokeStyle = 'rgba(255,255,255,0.08)';
      wpCtx.lineWidth = 1;
      wpCtx.stroke();

      wpCtx.font = `bold ${Math.max(10, wpW * 0.020)}px 'JetBrains Mono', monospace`;
      wpCtx.fillStyle = '#F5A623';
      wpCtx.textAlign = 'center';
      wpCtx.fillText('RCPM: 16× lighter than conv. · 3× faster than F1', wpW / 2, wpH - 14);

      requestAnimationFrame(drawWPComp);
    }
    drawWPComp();
  }


  /* ────────────────────────────────────────────────
     4. ENHANCED AKS HEAT BUFFERING ANIMATION
  ──────────────────────────────────────────────── */
  const aksCanvas = document.getElementById('aksCanvas');
  if (aksCanvas) {
    const actx = aksCanvas.getContext('2d');
    let aW, aH;
    let aksSpeed = 1;

    function resizeAKS() {
      const r = aksCanvas.getBoundingClientRect();
      aW = aksCanvas.width = r.width || 600;
      aH = aksCanvas.height = r.height || 340;
    }
    resizeAKS();
    window.addEventListener('resize', resizeAKS);

    const heatParticles = [];
    for (let i = 0; i < 40; i++) {
      heatParticles.push({
        x: 0.3 + Math.random() * 0.4,
        y: 0.3 + Math.random() * 0.4,
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        life: Math.random(),
        phase: Math.random() * Math.PI * 2,
        size: 2 + Math.random() * 3,
        stored: false,
      });
    }

    let at = 0;
    function drawAKS() {
      at += 0.018 * aksSpeed;
      actx.clearRect(0, 0, aW, aH);
      actx.fillStyle = '#04040C';
      actx.fillRect(0, 0, aW, aH);

      actx.strokeStyle = 'rgba(255,255,255,0.03)';
      actx.lineWidth = 1;
      for (let x = 0; x < aW; x += 30) { actx.beginPath(); actx.moveTo(x, 0); actx.lineTo(x, aH); actx.stroke(); }
      for (let y = 0; y < aH; y += 30) { actx.beginPath(); actx.moveTo(0, y); actx.lineTo(aW, y); actx.stroke(); }

      const cx = aW * 0.5, cy = aH * 0.48;
      const chamberW = aW * 0.4, chamberH = aH * 0.5;
      const cycle = (at * 0.3) % 1;
      const isCombust = cycle > 0.1 && cycle < 0.35;
      const isBuffer = cycle > 0.35 && cycle < 0.65;
      const isRelease = cycle > 0.65 && cycle < 0.9;

      actx.strokeStyle = 'rgba(0,212,255,0.2)';
      actx.lineWidth = 2;
      actx.strokeRect(cx - chamberW / 2, cy - chamberH / 2, chamberW, chamberH);

      const layerH = chamberH * 0.08;
      const topLayerY = cy - chamberH / 2;
      const botLayerY = cy + chamberH / 2 - layerH;

      const bufferGlow = isBuffer ? 0.5 + 0.5 * Math.sin(at * 6) : isRelease ? 0.8 : 0.2;

      actx.fillStyle = `rgba(245,166,35,${bufferGlow * 0.6})`;
      actx.fillRect(cx - chamberW / 2, topLayerY, chamberW, layerH);
      actx.fillRect(cx - chamberW / 2, botLayerY, chamberW, layerH);

      actx.font = `${Math.max(8, aW * 0.014)}px 'JetBrains Mono', monospace`;
      actx.fillStyle = 'rgba(245,166,35,0.5)';
      actx.textAlign = 'right';
      actx.fillText('W · 0.1mm', cx - chamberW / 2 - 6, topLayerY + layerH / 2 + 3);
      actx.fillText('Al · 0.1mm', cx - chamberW / 2 - 6, botLayerY + layerH / 2 + 3);

      if (isCombust) {
        const fi = Math.sin((cycle - 0.1) / 0.25 * Math.PI);
        const cg = actx.createRadialGradient(cx, cy, 0, cx, cy, chamberW * 0.4);
        cg.addColorStop(0, `rgba(255,160,20,${fi * 0.6})`);
        cg.addColorStop(0.5, `rgba(255,80,10,${fi * 0.3})`);
        cg.addColorStop(1, 'transparent');
        actx.fillStyle = cg;
        actx.beginPath();
        actx.arc(cx, cy, chamberW * 0.4, 0, Math.PI * 2);
        actx.fill();
      }

      heatParticles.forEach(function (p) {
        p.life += 0.01 * aksSpeed;
        p.phase += 0.05;

        if (isBuffer) {
          const tgtY = (p.y < 0.5) ? (topLayerY + layerH / 2) / aH : (botLayerY + layerH / 2) / aH;
          p.vy += (tgtY - p.y) * 0.001;
          p.stored = true;
        } else if (isRelease && p.stored) {
          p.vy += (0.5 - p.y) * 0.002;
          if (Math.abs(p.y - 0.5) < 0.08) p.stored = false;
        } else {
          p.vy += (Math.random() - 0.5) * 0.0005;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < 0.2) p.x = 0.2;
        if (p.x > 0.8) p.x = 0.8;
        if (p.y < 0.15) p.y = 0.15;
        if (p.y > 0.85) p.y = 0.85;

        const px = p.x * aW, py = p.y * aH;
        const alpha = 0.4 + 0.3 * Math.sin(p.phase);
        const col = p.stored ? `rgba(245,166,35,${alpha})` : `rgba(255,120,20,${alpha * 0.6})`;
        const pg = actx.createRadialGradient(px, py, 0, px, py, p.size * 2);
        pg.addColorStop(0, col);
        pg.addColorStop(1, 'transparent');
        actx.fillStyle = pg;
        actx.beginPath();
        actx.arc(px, py, p.size * 2, 0, Math.PI * 2);
        actx.fill();
      });

      const phaseLabels = [
        { range: [0, 0.1], text: 'INTAKE', col: '#4488FF' },
        { range: [0.1, 0.35], text: 'COMBUSTION', col: '#FF6030' },
        { range: [0.35, 0.65], text: 'AKS BUFFERING', col: '#F5A623' },
        { range: [0.65, 0.9], text: 'HEAT RELEASE', col: '#00E87A' },
        { range: [0.9, 1.0], text: 'EXHAUST', col: '#5A6278' },
      ];

      let currentPhaseLabel = phaseLabels[0];
      for (let i = 0; i < phaseLabels.length; i++) {
        if (cycle >= phaseLabels[i].range[0] && cycle < phaseLabels[i].range[1]) {
          currentPhaseLabel = phaseLabels[i];
          break;
        }
      }

      actx.font = `bold ${Math.max(12, aW * 0.026)}px 'Bebas Neue', sans-serif`;
      actx.fillStyle = currentPhaseLabel.col;
      actx.textAlign = 'center';
      actx.fillText(currentPhaseLabel.text, cx, aH - 30);

      const timeBarW = aW * 0.6, timeBarH = 4;
      const timeBarX = (aW - timeBarW) / 2, timeBarY = aH - 18;
      actx.fillStyle = 'rgba(255,255,255,0.06)';
      actx.fillRect(timeBarX, timeBarY, timeBarW, timeBarH);
      phaseLabels.forEach(function (pl) {
        actx.fillStyle = pl.col + '44';
        actx.fillRect(timeBarX + pl.range[0] * timeBarW, timeBarY, (pl.range[1] - pl.range[0]) * timeBarW, timeBarH);
      });
      actx.fillStyle = '#fff';
      actx.fillRect(timeBarX + cycle * timeBarW - 1, timeBarY - 2, 3, timeBarH + 4);

      actx.font = `${Math.max(9, aW * 0.016)}px 'JetBrains Mono', monospace`;
      actx.fillStyle = 'rgba(245,166,35,0.5)';
      actx.textAlign = 'left';
      actx.fillText('// AKS — Active Combustion System', 12, 20);
      actx.fillStyle = 'rgba(255,255,255,0.2)';
      actx.fillText('Heat buffered between cycles by tungsten + aluminium layers', 12, 36);

      requestAnimationFrame(drawAKS);
    }
    drawAKS();

    const aksSlider = document.getElementById('aksSpeedSlider');
    if (aksSlider) {
      aksSlider.addEventListener('input', function () {
        aksSpeed = parseFloat(this.value);
      });
    }
  }

})();
