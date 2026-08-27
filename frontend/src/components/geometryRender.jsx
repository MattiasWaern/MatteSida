import React from "react";

const GeometryRender = ({ geometry }) => {
    if (!geometry) return null;

const drawTriangle = (base, height) => {
    const scale = Math.min(220 / base, 170 / height);

    const basePx = base * scale;
    const heightPx = height * scale;

    const baseY = 200;
    const leftX = (300 - basePx) / 2;
    const rightX = leftX + basePx;
    const topX = 150;
    const topY = baseY - heightPx;

    return (
        <svg viewBox="0 0 300 250" className="geometry-svg">

            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="8"
                    markerHeight="6"
                    refX="7"
                    refY="3"
                    orient="auto"
                >
                    <polygon
                        points="0 0, 8 3, 0 6"
                        fill="#64748b"
                    />
                </marker>
            </defs>

            {/* Triangel */}
            <polygon
                points={`${leftX},${baseY} ${rightX},${baseY} ${topX},${topY}`}
                fill="#dbeafe"
                stroke="#2563eb"
                strokeWidth="3"
            />

            {/* Bas */}
            <line
                x1={leftX}
                y1={baseY + 15}
                x2={rightX}
                y2={baseY + 15}
                stroke="#dc2626"
                strokeWidth="2"
                markerStart="url(#arrowhead)"
                markerEnd="url(#arrowhead)"
            />

            <text
                x="150"
                y={baseY + 38}
                textAnchor="middle"
                fill="#dc2626"
                fontSize="16"
                fontWeight="600"
            >
                bas = {base} cm
            </text>

            {/* Höjd */}
            <line
                x1={topX}
                y1={baseY}
                x2={topX}
                y2={topY}
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeDasharray="6,4"
                markerStart="url(#arrowhead)"
                markerEnd="url(#arrowhead)"
            />

            <text
                x={topX + 10}
                y={(baseY + topY) / 2 + 5}
                fill="#16a34a"
                fontSize="16"
                fontWeight="600"
            >
                h = {height} cm
            </text>

            {/* Rät vinkel */}
            <rect
                x={topX - 12}
                y={baseY - 12}
                width="12"
                height="12"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
            />

        </svg>
    );
};

    const drawCircle = (radius) => {
        const scale = 150 / (radius * 2);
        const r = radius * scale * 4;
        const center = 150;

        return (
            <svg viewBox="0 0 300 250" className="geometry-svg">
                <defs>
                    <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                </defs>
                
                <circle 
                    cx={center} 
                    cy={130} 
                    r={r} 
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="3"
                    className="geometry-shape"
                />
                
                <line 
                    x1={center} 
                    y1={130} 
                    x2={center + r} 
                    y2={130} 
                    stroke="#dc2626" 
                    strokeWidth="2.5"
                    marker-end="url(#arrowhead2)"
                />
                <text x={center + r/2 - 30} y={120} fill="#dc2626" fontSize="16" fontWeight="600">
                    r = {radius} cm
                </text>
                
                <circle cx={center} cy={130} r="5" fill="#dc2626" />
                
                <line 
                    x1={center - r} 
                    y1={130} 
                    x2={center + r} 
                    y2={130} 
                    stroke="#64748b" 
                    strokeWidth="1" 
                    strokeDasharray="4,4"
                    opacity="0.5"
                />
                <text x={center - r + 10} y={160} fill="#64748b" fontSize="14">
                    d = {radius * 2} cm
                </text>
            </svg>
        );
    };

    const drawRectangle = (width, height) => {
        const maxWidth = 240;
        const maxHeight = 160;
        const scaleX = maxWidth / width;
        const scaleY = maxHeight / height;
        const scale = Math.min(scaleX, scaleY, 1);
        
        const rectangleWidth = width * scale;
        const rectangleHeight = height * scale;
        const x = (300 - rectangleWidth) / 2;
        const y = (220 - rectangleHeight) / 2;

        return (
            <svg viewBox="0 0 300 250" className="geometry-svg">
                <defs>
                    <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                </defs>
                
                <rect
                    x={x}
                    y={y}
                    width={rectangleWidth}
                    height={rectangleHeight}
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="3"
                    className="geometry-shape"
                />
                
                <line 
                    x1={x} 
                    y1={y + rectangleHeight + 20} 
                    x2={x + rectangleWidth} 
                    y2={y + rectangleHeight + 20} 
                    stroke="#dc2626" 
                    strokeWidth="2"
                    marker-end="url(#arrowhead3)"
                    marker-start="url(#arrowhead3)"
                />
                <text x={x + rectangleWidth/2} y={y + rectangleHeight + 40} textAnchor="middle" fill="#dc2626" fontSize="16" fontWeight="600">
                    bredd = {width} cm
                </text>
                
                <line 
                    x1={x + rectangleWidth + 20} 
                    y1={y} 
                    x2={x + rectangleWidth + 20} 
                    y2={y + rectangleHeight} 
                    stroke="#16a34a" 
                    strokeWidth="2"
                    marker-end="url(#arrowhead3)"
                    marker-start="url(#arrowhead3)"
                />
                <text x={x + rectangleWidth + 35} y={y + rectangleHeight/2 + 6} fill="#16a34a" fontSize="16" fontWeight="600">
                    h = {height} cm
                </text>
            </svg>
        );
    };

    const drawCylinder = (radius, height) => {
        const scale = Math.min(60 / Math.max(radius * 2, height), 1);
        const r = radius * scale * 10;
        const h = height * scale * 6;
        const centerX = 150;
        const centerY = 80;

        return (
            <svg viewBox="0 0 300 250" className="geometry-svg">
                <defs>
                    <marker id="arrowhead4" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                </defs>
                
                <rect 
                    x={centerX - r} 
                    y={centerY} 
                    width={r * 2} 
                    height={h} 
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                />
                
                <ellipse 
                    cx={centerX} 
                    cy={centerY} 
                    rx={r} 
                    ry={r * 0.35} 
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                />
                
                <ellipse 
                    cx={centerX} 
                    cy={centerY + h} 
                    rx={r} 
                    ry={r * 0.35} 
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                />
                
                <line 
                    x1={centerX} 
                    y1={centerY + h/2} 
                    x2={centerX + r} 
                    y2={centerY + h/2} 
                    stroke="#dc2626" 
                    strokeWidth="2"
                    marker-end="url(#arrowhead4)"
                />
                <text x={centerX + r/2 - 20} y={centerY + h/2 - 10} fill="#dc2626" fontSize="14" fontWeight="600">
                    r = {radius} cm
                </text>
                
                <line 
                    x1={centerX + r + 25} 
                    y1={centerY} 
                    x2={centerX + r + 25} 
                    y2={centerY + h} 
                    stroke="#16a34a" 
                    strokeWidth="2"
                    marker-end="url(#arrowhead4)"
                    marker-start="url(#arrowhead4)"
                />
                <text x={centerX + r + 35} y={centerY + h/2 + 6} fill="#16a34a" fontSize="14" fontWeight="600">
                    h = {height} cm
                </text>
            </svg>
        );
    };

    const drawPythagoras = (a, b) => {
        const scale = 120 / Math.max(a, b);
        const aPx = a * scale * 2;
        const bPx = b * scale * 2;
        const c = Math.sqrt(a * a + b * b);

        const startX = 30;
        const startY = 200;

        return (
            <svg viewBox="0 0 300 250" className="geometry-svg">
                <polygon 
                    points={`${startX},${startY} ${startX + aPx},${startY} ${startX},${startY - bPx}`}
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="3"
                    className="geometry-shape"
                />
                
                <rect x={startX} y={startY - 15} width="15" height="15" fill="none" stroke="#16a34a" strokeWidth="2"/>
                
                <line 
                    x1={startX} 
                    y1={startY + 15} 
                    x2={startX + aPx} 
                    y2={startY + 15} 
                    stroke="#dc2626" 
                    strokeWidth="2"
                />
                <text x={startX + aPx/2 - 10} y={startY + 35} fill="#dc2626" fontSize="16" fontWeight="600">
                    a = {a} cm
                </text>
                
                <line 
                    x1={startX - 15} 
                    y1={startY} 
                    x2={startX - 15} 
                    y2={startY - bPx} 
                    stroke="#16a34a" 
                    strokeWidth="2"
                />
                <text x={startX - 40} y={startY - bPx/2 + 6} fill="#16a34a" fontSize="16" fontWeight="600">
                    b = {b} cm
                </text>
                
                <line 
                    x1={startX + aPx} 
                    y1={startY} 
                    x2={startX} 
                    y2={startY - bPx} 
                    stroke="#8b5cf6" 
                    strokeWidth="2.5"
                    strokeDasharray="6,4"
                />
                <text x={startX + aPx/2 - 20} y={startY - bPx/2 - 10} fill="#8b5cf6" fontSize="16" fontWeight="600">
                    c = {c.toFixed(1)} cm
                </text>
            </svg>      
        );
    };

    switch (geometry.type) {
        case 'triangle':
            return drawTriangle(geometry.base || 8, geometry.height || 6);
        case 'circle':
            return drawCircle(geometry.radius || 5);
        case 'rectangle':
            return drawRectangle(geometry.width || 10, geometry.height || 5);
        case 'cylinder':
            return drawCylinder(geometry.radius || 3, geometry.height || 10);
        case 'pythagoras':
            return drawPythagoras(geometry.a || 3, geometry.b || 4);
        default:
            return null;
    }
};

export default GeometryRender;