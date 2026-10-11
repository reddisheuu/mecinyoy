const canvas = document.getElementById('bouquetCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Partikel Love di Background (gerakan lebih pelan)
const hearts = [];
for (let i = 0; i < 25; i++) {
    hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 12 + 8,
        speedY: Math.random() * 0.4 + 0.15, // Dibuat lebih pelan
        opacity: Math.random() * 0.4 + 0.1,
        swing: Math.random() * 2 - 1
    });
}

// Konfigurasi 14 Tangkai Bunga dengan jeda waktu (delay) yang lebih santai
const flowers = [
    { type: 'whiteCluster', offsetX: -120, offsetY: -200, delay: 0.3, leafY1: 0.3, leafY2: 0.7, leafAngle1: -0.5, leafAngle2: 0.6 },
    { type: 'purpleAster',  offsetX: -130, offsetY: -120, delay: 0.6, leafY1: 0.4, leafY2: 0.8, leafAngle1: 0.4, leafAngle2: -0.7 },
    { type: 'purpleAster',  offsetX: -60,  offsetY: -220, delay: 0.9, leafY1: 0.25, leafY2: 0.65, leafAngle1: -0.6, leafAngle2: 0.5 },
    { type: 'narcissus',    offsetX: 60,   offsetY: -210, delay: 1.2, leafY1: 0.35, leafY2: 0.75, leafAngle1: 0.5, leafAngle2: -0.4 },
    { type: 'pinkHibiscus', offsetX: 130,  offsetY: -120, delay: 1.5, leafY1: 0.45, leafY2: 0.85, leafAngle1: -0.3, leafAngle2: 0.7 },
    { type: 'sunflower',    offsetX: -10,  offsetY: -140, delay: 1.8, leafY1: 0.3, leafY2: 0.6, leafAngle1: 0.6, leafAngle2: -0.5 },
    { type: 'purpleAster',  offsetX: 10,   offsetY: -180, delay: 2.1, leafY1: 0.2, leafY2: 0.7, leafAngle1: -0.4, leafAngle2: 0.4 },
    { type: 'whiteCluster', offsetX: 120,  offsetY: -190, delay: 2.4, leafY1: 0.5, leafY2: 0.8, leafAngle1: 0.5, leafAngle2: -0.6 },
    { type: 'sunflower',    offsetX: -80,  offsetY: -160, delay: 2.7, leafY1: 0.3, leafY2: 0.75, leafAngle1: -0.7, leafAngle2: 0.3 },
    { type: 'narcissus',    offsetX: 90,   offsetY: -150, delay: 3.0, leafY1: 0.4, leafY2: 0.65, leafAngle1: 0.4, leafAngle2: -0.5 },
    { type: 'pinkHibiscus', offsetX: -40,  offsetY: -190, delay: 3.3, leafY1: 0.25, leafY2: 0.8, leafAngle1: -0.5, leafAngle2: 0.6 },
    { type: 'purpleAster',  offsetX: 50,   offsetY: -130, delay: 3.6, leafY1: 0.35, leafY2: 0.7, leafAngle1: 0.6, leafAngle2: -0.4 },
    { type: 'sunflower',    offsetX: -100, offsetY: -180, delay: 3.9, leafY1: 0.2, leafY2: 0.6, leafAngle1: -0.3, leafAngle2: 0.5 },
    { type: 'narcissus',    offsetX: 100,  offsetY: -180, delay: 4.2, leafY1: 0.45, leafY2: 0.75, leafAngle1: 0.5, leafAngle2: -0.7 }
];

// --- FUNGSI MENGGAMBAR BUNGA REALISTIS ---
function drawPurpleAster(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    for (let i = 0; i < 14; i++) {
        ctx.rotate((Math.PI * 2) / 14);
        let grad = ctx.createLinearGradient(0, 0, 0, -38);
        grad.addColorStop(0, '#7b2cbf');
        grad.addColorStop(0.5, '#9d4edd');
        grad.addColorStop(1, '#e0aaff');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, -19, 7, 24, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#5a189a';
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
    ctx.fillStyle = '#ffb703';
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawSunflower(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    for (let i = 0; i < 14; i++) {
        ctx.rotate((Math.PI * 2) / 14);
        let grad = ctx.createLinearGradient(0, 0, 0, -35);
        grad.addColorStop(0, '#faa307');
        grad.addColorStop(1, '#ffea00');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, -18, 7, 22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#d48c00';
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
    let centerGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 13);
    centerGrad.addColorStop(0, '#432818');
    centerGrad.addColorStop(1, '#6f4e37');
    ctx.fillStyle = centerGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawPinkHibiscus(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        let grad = ctx.createRadialGradient(0, 0, 5, 0, 0, 38);
        grad.addColorStop(0, '#ff4d6d');
        grad.addColorStop(0.6, '#ff758f');
        grad.addColorStop(1, '#ffb3c6');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-22, -22, -28, -48, 0, -53);
        ctx.bezierCurveTo(28, -48, 22, -22, 0, 0);
        ctx.fill();
        ctx.strokeStyle = '#c9184a';
        ctx.lineWidth = 0.8;
        ctx.stroke();
    }
    ctx.strokeStyle = '#ffccd5';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -38);
    ctx.stroke();
    ctx.fillStyle = '#ffb703';
    ctx.beginPath();
    ctx.arc(0, -38, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawNarcissus(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    for (let i = 0; i < 6; i++) {
        ctx.rotate((Math.PI * 2) / 6);
        let grad = ctx.createLinearGradient(0, 0, 0, -32);
        grad.addColorStop(0, '#fff3b0');
        grad.addColorStop(1, '#ffea79');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, -19, 9, 24, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#e9c46a';
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
    ctx.fillStyle = '#f77f00';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawWhiteCluster(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = '#ffffff';
    const dots = [
        {dx: 0, dy: 0}, {dx: -14, dy: -12}, {dx: 14, dy: -12},
        {dx: -22, dy: 6}, {dx: 22, dy: 6}, {dx: -9, dy: -24}, {dx: 9, dy: -24}
    ];
    dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.dx, d.dy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 0.5;
        ctx.stroke();
    });
    ctx.restore();
}

// --- FUNGSI MENGGAMBAR DAUN DENGAN SCALE-UP HALUS ---
function drawLeaf(x, y, angle, leafProgress) {
    if (leafProgress <= 0) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(leafProgress, leafProgress);

    let leafGrad = ctx.createLinearGradient(0, 0, 0, -35);
    leafGrad.addColorStop(0, '#2d6a4f');
    leafGrad.addColorStop(1, '#52b788');
    ctx.fillStyle = leafGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-15, -20, 0, -40);
    ctx.quadraticCurveTo(15, -20, 0, 0);
    ctx.fill();
    ctx.strokeStyle = '#1b4332';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -35);
    ctx.stroke();
    ctx.restore();
}

// --- ANIMASI IKAT TALI PITA COKELAT LEBIH HALUS ---
function drawBindingRibbon(bx, by, bindProgress) {
    if (bindProgress <= 0) return;

    ctx.save();
    const currentScale = Math.min(1, bindProgress);
    ctx.translate(bx, by + 40);
    ctx.scale(currentScale, currentScale);

    ctx.strokeStyle = '#6f4e37';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 8, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#8c5830';
    ctx.beginPath();
    ctx.moveTo(-8, -3);
    ctx.bezierCurveTo(-70, -25, -80, 25, -10, 12);
    ctx.moveTo(8, -3);
    ctx.bezierCurveTo(70, -25, 80, 25, 10, 12);
    ctx.fill();
    ctx.strokeStyle = '#5c3818';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#6f4e37';
    ctx.fillRect(-8, -2, 16, 14);
    ctx.strokeRect(-8, -2, 16, 14);

    const tailLen = 65 * Math.min(1, bindProgress * 1.2);
    ctx.fillStyle = '#8c5830';
    ctx.beginPath();
    ctx.moveTo(-5, 12);
    ctx.quadraticCurveTo(-25, 30 + tailLen * 0.5, -15, tailLen);
    ctx.lineTo(-5, tailLen - 5);
    ctx.quadraticCurveTo(-15, 30 + tailLen * 0.5, -2, 12);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(5, 12);
    ctx.quadraticCurveTo(25, 30 + tailLen * 0.5, 15, tailLen);
    ctx.lineTo(5, tailLen - 5);
    ctx.quadraticCurveTo(15, 30 + tailLen * 0.5, 2, 12);
    ctx.fill();

    ctx.restore();
}

// --- FUNGSI MENGGAMBAR BENTUK LOVE DI BACKGROUND ---
function drawHeart(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 20, size / 20);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#ff758f';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -10, -20, 5, 0, 20);
    ctx.bezierCurveTo(20, 5, 10, -10, 0, 0);
    ctx.fill();
    ctx.restore();
}

let time = 0;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.010; // Kecepatan frame diperlambat agar animasi jauh lebih halus & anggun

    const currentBaseX = canvas.width / 2;
    const currentBaseY = canvas.height * 0.70;

    // 1. Gambar Background Love Melayang
    hearts.forEach(h => {
        h.y -= h.speedY;
        h.x += Math.sin(time * 0.8 + h.swing) * 0.4;
        if (h.y < -20) {
            h.y = canvas.height + 20;
            h.x = Math.random() * canvas.width;
        }
        drawHeart(h.x, h.y, h.size, h.opacity);
    });

    // 2. Gambar Tangkai Tumbuh Pelan & Lembut dari Bawah ke Atas
    flowers.forEach((flower, index) => {
        const localTime = time - flower.delay;
        const progress = Math.min(1, Math.max(0, localTime * 0.9)); // Pertumbuhan lebih lambat

        if (progress > 0) {
            // Efek easing halus (cubic smoothstep)
            const smoothProgress = progress * progress * (3 - 2 * progress);
            
            const sway = Math.sin(time * 1.5 + index) * 2 * smoothProgress;
            const targetX = currentBaseX + flower.offsetX + sway;
            const targetY = currentBaseY + flower.offsetY;

            const currentX = currentBaseX + (targetX - currentBaseX) * smoothProgress;
            const currentY = (currentBaseY + 50) + (targetY - (currentBaseY + 50)) * smoothProgress;

            ctx.strokeStyle = '#2d6a4f';
            ctx.lineWidth = 4.5;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(currentBaseX, currentBaseY + 50);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();

            // Daun muncul perlahan dari dalam keluar dengan skala halus
            if (smoothProgress > 0.4) {
                let leafProgress1 = Math.min(1, (smoothProgress - 0.4) * 2.5);
                let leafX1 = currentBaseX + (flower.offsetX * flower.leafY1);
                let leafY1 = (currentBaseY + 50) + ((targetY - (currentBaseY + 50)) * flower.leafY1);
                drawLeaf(leafX1, leafY1, flower.leafAngle1, leafProgress1 * 0.85);

                let leafProgress2 = Math.min(1, (smoothProgress - 0.5) * 2.5);
                let leafX2 = currentBaseX + (flower.offsetX * flower.leafY2);
                let leafY2 = (currentBaseY + 50) + ((targetY - (currentBaseY + 50)) * flower.leafY2);
                drawLeaf(leafX2, leafY2, flower.leafAngle2, leafProgress2 * 0.75);
            }
        }
    });

    // 3. Animasi Ikatan Tali Cokelat Mengikat Tangkai (Disesuaikan waktunya)
    let bindProgress = 0;
    if (time > 4.5) {
        bindProgress = Math.min(1, (time - 4.5) * 0.8);
    }
    drawBindingRibbon(currentBaseX, currentBaseY, bindProgress);

    // 4. Gambar Kepala Bunga Mekar Lembut Satu Per Satu
    flowers.forEach((flower, index) => {
        const localTime = time - flower.delay;
        const progress = Math.min(1, Math.max(0, localTime * 0.8));

        if (progress > 0) {
            const smoothBloom = progress * progress * (3 - 2 * progress);
            const popScale = smoothBloom * 1.05;

            const sway = Math.sin(time * 1.5 + index) * 2 * Math.min(1, progress);
            const currentX = currentBaseX + flower.offsetX + sway;
            const currentY = currentBaseY + flower.offsetY;

            if (flower.type === 'purpleAster') {
                drawPurpleAster(currentX, currentY, popScale);
            } else if (flower.type === 'sunflower') {
                drawSunflower(currentX, currentY, popScale);
            } else if (flower.type === 'pinkHibiscus') {
                drawPinkHibiscus(currentX, currentY, popScale);
            } else if (flower.type === 'narcissus') {
                drawNarcissus(currentX, currentY, popScale);
            } else if (flower.type === 'whiteCluster') {
                drawWhiteCluster(currentX, currentY, popScale);
            }
        }
    });

    requestAnimationFrame(animate);
}

animate();

// --- SCRIPT MODAL POPUP SURAT ---
const openBtn = document.getElementById('openNoteBtn');
const closeBtn = document.getElementById('closeNoteBtn');
const modal = document.getElementById('noteModal');

openBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});