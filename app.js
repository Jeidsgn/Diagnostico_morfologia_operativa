console.log("BrandOS: Script Start @ " + new Date().toLocaleTimeString());

async function boot() {
    console.log("BrandOS: Boot sequence started");

    // If critical JS files failed
    if (typeof questionsData === 'undefined' || typeof quadrantsData === 'undefined' || typeof axesData === 'undefined') {
        document.getElementById('st').innerText = "ERROR: ARCHIVOS JS MISSING";
        document.getElementById('qt').innerText = "Carga bloqueada. Asegúrate de que Questions.js y quadrants.js estén en la misma carpeta.";
        document.getElementById('qt').style.color = "#ff4444";
        document.getElementById('qt').style.fontSize = "1.2rem";
        document.getElementById('card').style.display = 'block';
        return;
    }

    if (typeof descriptionsData === 'undefined') {
        console.warn("descriptions.js load failed, using fallback");
        window.descriptionsData = { x: {}, y: {} };
        for (let i = 3; i <= 12; i++) {
            window.descriptionsData.x[i] = `Párrafo descriptivo X para puntuación ${i} (Fallback)`;
            window.descriptionsData.y[i] = `Párrafo descriptivo Y para puntuación ${i} (Fallback)`;
        }
    }

    const config = {
        type: Phaser.AUTO,
        parent: 'game-container',
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true,
        scene: AuditScene,
        scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH }
    };
    new Phaser.Game(config);
}

const COLORS = { purple: 0x8217ce, blue: 0x2b1ae5, teal: 0x15808b, bg: 0x05050a };
const GRID = 160;

class AuditScene extends Phaser.Scene {
    constructor() { super('AuditScene'); this.nodes = [{ x: 0, y: 0 }]; this.idx = 0; this.scoreX = 0; this.scoreY = 0; this.ghosts = []; this.lock = false; }

    create() {
        console.log("BrandOS: Phaser Create");
        this.quadBg = this.add.graphics({ x: 0, y: 0 }).setDepth(-5).setAlpha(0);
        this.drawQuadrants();

        this.gfx = this.add.graphics();
        this.gridGfx = this.add.graphics();
        this.cameras.main.setBackgroundColor(COLORS.bg);
        this.cameras.main.centerOn(0, 0);
        this.drawGrid();
        this.drawNode(0, 0, true);
        this.time.delayedCall(800, () => this.next());
    }

    drawQuadrants() {
        this.quadBg.fillGradientStyle(0x15808b, 0x2b1ae5, 0x8217ce, 0x0f51b0, 0.5, 0.5, 0.5, 0.5);
        this.quadBg.fillRect(3 * GRID, -12 * GRID, 9 * GRID, 9 * GRID);

        this.quadBg.lineStyle(6, 0xffffff, 0.3);
        this.quadBg.strokeRect(3 * GRID, -12 * GRID, 9 * GRID, 9 * GRID);

        this.quadBg.lineStyle(4, 0xffffff, 0.2);
        this.quadBg.lineBetween(7.5 * GRID, -3 * GRID, 7.5 * GRID, -12 * GRID);
        this.quadBg.lineBetween(3 * GRID, -7.5 * GRID, 12 * GRID, -7.5 * GRID);

        const txtConf = { font: "bold 40px 'Segoe UI', sans-serif", fill: "#ffffff", align: 'center', wordWrap: { width: 3.5 * GRID } };

        const fName = (name) => {
            const parts = name.split(' ');
            return parts.length > 1 ? parts[0] + '\n' + parts.slice(1).join(' ') : name;
        };

        this.add.text(5.25 * GRID, -9.75 * GRID, fName(quadrantsData.low_high.name), txtConf).setOrigin(0.5).setDepth(-4).setAlpha(0).setName('qt1');
        this.add.text(9.75 * GRID, -9.75 * GRID, fName(quadrantsData.high_high.name), txtConf).setOrigin(0.5).setDepth(-4).setAlpha(0).setName('qt2');
        this.add.text(5.25 * GRID, -5.25 * GRID, fName(quadrantsData.low_low.name), txtConf).setOrigin(0.5).setDepth(-4).setAlpha(0).setName('qt3');
        this.add.text(9.75 * GRID, -5.25 * GRID, fName(quadrantsData.high_low.name), txtConf).setOrigin(0.5).setDepth(-4).setAlpha(0).setName('qt4');
    }

    drawGrid() {
        this.gridGfx.clear().lineStyle(2, 0x0f51b0, 0.15);
        for (let i = -50; i <= 50; i++) {
            this.gridGfx.lineBetween(i * GRID, -50 * GRID, i * GRID, 50 * GRID);
            this.gridGfx.lineBetween(-50 * GRID, i * GRID, 50 * GRID, i * GRID);
        }
    }

    drawNode(x, y, active = false) {
        const px = x * GRID, py = -y * GRID;
        this.gfx.lineStyle(4, active ? COLORS.purple : COLORS.blue, 1).fillStyle(COLORS.bg, 1);
        this.gfx.strokeCircle(px, py, 16).fillCircle(px, py, 16);
        if (active) this.gfx.fillStyle(COLORS.purple, 1).fillCircle(px, py, 8);
    }

    next() {
        if (this.idx >= questionsData.length) { this.finish(); return; }
        const q = questionsData[this.idx];
        const last = this.nodes[this.nodes.length - 1];

        const isM = window.innerWidth < 768;
        const targetX = (q.axis === 'x') ? (last.x + (isM ? 1.5 : 2.5)) * GRID : last.x * GRID;
        const targetY = (q.axis === 'y') ? -(last.y + (isM ? 2.5 : 3.8)) * GRID : -(last.y + 0.5) * GRID;

        this.cameras.main.pan(targetX, targetY, 1200, 'Cubic.easeInOut');
        this.cameras.main.zoomTo(isM ? Math.max(0.45, window.innerWidth / 900) : 0.75, 1200, 'Cubic.easeInOut');

        this.time.delayedCall(500, () => {
            document.getElementById('ql').innerText = `STEP ${this.idx + 1} / ${questionsData.length} - ${q.label}`;
            document.getElementById('qt').innerText = q.text;
            document.getElementById('card').style.display = 'block';
            document.getElementById('st').innerText = `COORDS: [${last.x}, ${last.y}] | AXIS: ${q.axis.toUpperCase()}`;
            this.spawnGhosts(last, q);
        });
    }

    spawnGhosts(origin, q) {
        const host = document.getElementById('options');
        host.innerHTML = '';
        this.ghosts = [];
        q.options.forEach((opt, idx) => {
            let nx = origin.x, ny = origin.y;
            if (q.axis === 'x') nx += opt.value; else ny += opt.value;
            const wpx = nx * GRID, wpy = -ny * GRID;
            const circle = this.add.circle(wpx, wpy, 13, COLORS.teal, 0.45).setStrokeStyle(3, 0xffffff, 0.8).setDepth(10);
            const line = this.add.line(0, 0, origin.x * GRID, -origin.y * GRID, wpx, wpy, COLORS.teal, 0.35).setOrigin(0).setDepth(5);

            const el = document.createElement('div');
            el.className = 'opt'; el.innerText = opt.text;

            const isM = window.innerWidth < 768;
            const ox = (q.axis === 'x') ? 0 : (isM ? 130 : 200);
            const oy = (q.axis === 'x') ? (idx % 2 === 0 ? (isM ? 80 : 110) : (isM ? 150 : 240)) : 0;

            this.posEl(el, wpx + ox, wpy + oy);
            el.onmouseenter = () => { circle.setAlpha(1).setScale(1.4).setFillStyle(COLORS.purple); };
            el.onmouseleave = () => { circle.setAlpha(0.45).setScale(1).setFillStyle(COLORS.teal); };
            el.onclick = () => this.select(opt.value, { x: nx, y: ny });
            host.appendChild(el);
            setTimeout(() => el.style.opacity = '1', 80 * idx);
            this.ghosts.push({ gfx: [circle, line], el: el, wpos: { x: wpx + ox, y: wpy + oy } });
        });
    }

    posEl(el, wx, wy) {
        const cam = this.cameras.main;
        if (!cam.worldView) return;
        el.style.left = `${(wx - cam.worldView.x) * cam.zoom}px`;
        el.style.top = `${(wy - cam.worldView.y) * cam.zoom}px`;
    }

    select(val, target) {
        if (this.lock) return; this.lock = true;
        const q = questionsData[this.idx];
        const last = this.nodes[this.nodes.length - 1];
        if (q.axis === 'x') this.scoreX += val; else this.scoreY += val;
        this.nodes.push(target);
        this.gfx.lineStyle(6, COLORS.purple, 0.9);
        const curve = new Phaser.Curves.CubicBezier(
            new Phaser.Math.Vector2(last.x * GRID, -last.y * GRID),
            new Phaser.Math.Vector2(last.x * GRID, -target.y * GRID),
            new Phaser.Math.Vector2(last.x * GRID, -target.y * GRID),
            new Phaser.Math.Vector2(target.x * GRID, -target.y * GRID)
        );
        curve.draw(this.gfx, 64);
        this.drawNode(target.x, target.y);
        document.getElementById('card').style.display = 'none';
        this.ghosts.forEach(g => { g.gfx.forEach(v => v.destroy()); g.el.remove(); });
        this.ghosts = [];
        this.cameras.main.pan(target.x * GRID, -target.y * GRID, 800, 'Power2.easeOut');
        this.idx++;
        this.time.delayedCall(1200, () => { this.lock = false; this.next(); });
        document.getElementById('flash').classList.add('flash-anim');
        setTimeout(() => document.getElementById('flash').classList.remove('flash-anim'), 300);
    }

    finish() {
        const x = this.scoreX, y = this.scoreY;
        const k = (x >= 7.5 ? "high" : "low") + "_" + (y >= 7.5 ? "high" : "low");
        const res = quadrantsData[k] || quadrantsData["low_low"];

        const pX = ((x / 12) * 100).toFixed(1);
        const pY = ((y / 12) * 100).toFixed(1);

        document.getElementById('st').innerText = "DIAGNÓSTICO COMPLETADO";

        const btnReveal = document.getElementById('btn-reveal');
        btnReveal.style.display = 'block';

        btnReveal.onclick = () => {
            btnReveal.style.display = 'none';
            const c = document.getElementById('card');
            c.innerHTML = `
                <div class="q-label">CUADRANTE REVELADO</div>
                <div class="q-text">${res.name}</div>
                <div style="margin-top:10px;color:#bbb; white-space: pre-wrap;">${res.desc}</div>
                <hr style="border: 1px solid rgba(130, 23, 206, 0.4); margin: 20px 0;">
                <div style="text-align: left; font-size: 0.95rem;">
                    <div style="margin-bottom: 12px;">
                        <span style="color: var(--teal); font-weight: bold; font-size: 1.2rem;">${axesData.x.name}:</span><br>
                        <span style="color: #fff; font-size: 1.1rem; display:block; margin-top:4px;">${axesData.x.measure} ${pX}%</span>
                    </div>
                    <div>
                        <span style="color: var(--teal); font-weight: bold; font-size: 1.2rem;">${axesData.y.name}:</span><br>
                        <span style="color: #fff; font-size: 1.1rem; display:block; margin-top:4px;">${axesData.y.measure} ${pY}%</span>
                    </div>
                </div>
            `;
            c.style.display = 'block';
            document.getElementById('btn-dl').style.display = 'block';
        };

        this.tweens.add({
            targets: [this.quadBg, this.children.getByName('qt1'), this.children.getByName('qt2'), this.children.getByName('qt3'), this.children.getByName('qt4')],
            alpha: 1,
            duration: 2500,
            ease: 'Power2'
        });

        const targetZoom = Math.min(window.innerWidth / 1700, window.innerHeight / 1700);
        this.cameras.main.pan(7.5 * GRID, -7.5 * GRID, 3000, 'Expo.easeInOut');
        this.cameras.main.zoomTo(targetZoom, 3000, 'Expo.easeInOut');
        window.result = { x, y, name: res.name, desc: res.desc, pX, pY, descX: descriptionsData.x[x], descY: descriptionsData.y[y] };
    }

    update() {
        if (this.ghosts.length > 0) this.ghosts.forEach(g => this.posEl(g.el, g.wpos.x, g.wpos.y));
        // Mover el patrón de fondo siguiendo la cámara
        const cam = this.cameras.main;
        const el = document.getElementById('pattern-bg');
        if (el) {
            const sx = (-cam.scrollX * cam.zoom * 0.08).toFixed(1);
            const sy = (-cam.scrollY * cam.zoom * 0.08).toFixed(1);
            el.style.backgroundPosition = `${sx}px ${sy}px`;
        }
    }
}

if (document.readyState === 'complete') boot(); else window.addEventListener('load', boot);

document.getElementById('btn-dl').onclick = () => {
    const r = window.result;
    const doc = new window.jspdf.jsPDF();
    const stripHTML = (str) => str.replace(/<[^>]*>?/gm, '');

    // --- Fondo sólido ---
    doc.setFillColor(5, 5, 10);
    doc.rect(0, 0, 210, 297, 'F');

    // --- Cuadrícula 12x12 programática ---
    // Usamos un color RGB oscuro calculado para verse exactamente igual
    // a líneas blancas con opacidad bajísima sobre el fondo oscuro, 
    // evadiendo por completo problemas de soporte de GState en jsPDF.
    doc.setDrawColor(12, 12, 18);
    doc.setLineWidth(0.35); // ~1px en unidades PDF (1px ≈ 0.353mm)
    const colW = 210 / 12;
    const rowH = 297 / 12;
    for (let i = 0; i <= 12; i++) {
        doc.line(i * colW, 0, i * colW, 297); // verticales
        doc.line(0, i * rowH, 210, i * rowH); // horizontales
    }
    // Diagonales (Esquina a esquina)
    doc.line(0, 0, 210, 297); // Arriba Izquierda a Abajo Derecha
    doc.line(210, 0, 0, 297); // Arriba Derecha a Abajo Izquierda

    // --- Textos ---
    doc.setTextColor(130, 23, 206); doc.setFontSize(26); doc.text("PERFIL OPERATIVO", 20, 30);
    doc.setTextColor(21, 128, 139); doc.setFontSize(18); doc.text(`Cuadrante: ${r.name}`, 20, 45);

    let currentY = 55;

    doc.setTextColor(200, 200, 200); doc.setFontSize(11);
    let descLines = doc.splitTextToSize(stripHTML(r.desc || ''), 170);
    doc.text(descLines, 20, currentY);
    currentY += (descLines.length * 6) + 10;

    doc.setTextColor(255, 255, 255); doc.setFontSize(14);
    doc.text(`${axesData.x.name}`, 22, currentY);
    doc.text(` ${axesData.x.measure} - ${r.pX}%`, 20, currentY + 8);
    currentY += 20;

    doc.setTextColor(180, 180, 180); doc.setFontSize(11);
    let descXLines = doc.splitTextToSize(stripHTML(r.descX), 170);
    doc.text(descXLines, 20, currentY);
    currentY += (descXLines.length * 6) + 10;

    doc.setTextColor(255, 255, 255); doc.setFontSize(14);
    doc.text(`${axesData.y.name}`, 22, currentY);
    doc.text(` ${axesData.y.measure} - ${r.pY}%`, 20, currentY + 8);
    currentY += 20;

    doc.setTextColor(180, 180, 180); doc.setFontSize(11);
    let descYLines = doc.splitTextToSize(stripHTML(r.descY), 170);
    doc.text(descYLines, 20, currentY);

    // --- Pie de página ---
    const footerY = 282;
    doc.setDrawColor(130, 23, 206);
    doc.setLineWidth(0.5);
    doc.line(20, footerY - 6, 190, footerY - 6);

    try {
        const logoImg = document.getElementById('pdf-logo');
        const c = document.createElement('canvas');
        c.width = logoImg.width || 140; c.height = logoImg.height || 50;
        c.getContext('2d').drawImage(logoImg, 0, 0, c.width, c.height);
        doc.addImage(c.toDataURL('image/png'), 'PNG', 20, footerY - 2, 28, 10);
    } catch (e) {
        // Ignorar si hay restricción de file://
    }

    doc.setTextColor(130, 23, 206); doc.setFontSize(9);
    doc.text('linktr.ee/jeidsgn', 140, footerY + 5);

    doc.save("Perfil_Operativo_Jei.pdf");
};

