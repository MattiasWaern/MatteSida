import React from "react";


const geometryRender = ({ geometry}) => {
    if(!geometry) return null;

    const drawTriangle = (base, height) => {
        const scale = Math.min(150 / Math.max(base, height), 1);
        const width = base * scale * 8;
        const heightPx = height * scale * 8;

        return (
            <svg viewBox="0 0 300 250" className="geometry-svg">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                </defs>
                
                {/* Triangel */}
                <polygon 
                    points={`20,220 ${280,220} ${150,${220 - heightPx}}`}
                    fill="#e0e7ff"
                    stroke="#2563eb"
                    strokeWidth="3"
                    className="geometry-shape"
                />
                
                {/* Bas-linje med mått */}
                <line 
                    x1="20" y1="235" 
                    x2="280" y2="235" 
                    stroke="#dc2626" 
                    strokeWidth="2"
                    marker-end="url(#arrowhead)"
                    marker-start="url(#arrowhead)"
                />
                <text x="130" y="255" fill="#dc2626" fontSize="16" fontWeight="600">
                    bas = {base} cm
                </text>
                
                {/* Höjd-linje med mått */}
                <line 
                    x1="150" y1="220" 
                    x2="150" y2={220 - heightPx} 
                    stroke="#16a34a" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    marker-end="url(#arrowhead)"
                    marker-start="url(#arrowhead)"
                />
                <text x="160" y={220 - heightPx/2 + 5} fill="#16a34a" fontSize="16" fontWeight="600">
                    h = {height} cm
                </text>
                
                {/* Rätvinklig symbol */}
                <rect x="140" y="210" width="10" height="10" fill="none" stroke="#16a34a" strokeWidth="2"/>
                
                {/* Hörn-markeringar */}
                <circle cx="20" cy="220" r="4" fill="#2563eb" />
                <circle cx="280" cy="220" r="4" fill="#2563eb" />
                <circle cx="150" cy={220 - heightPx} r="4" fill="#2563eb" />
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
                
                {/* Cirkel */}
                <circle 
                    cx={center} 
                    cy={130} 
                    r={r} 
                    fill="#e0e7ff"
                    stroke="#2563eb"
                    strokeWidth="3"
                    className="geometry-shape"
                />
                
                {/* Radie */}
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
                
                {/* Centrum-punkt */}
                <circle cx={center} cy={130} r="5" fill="#dc2626" />
                
                {/* Diameter markering (halvt genomskinlig) */}
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
                
                {/* Cylinder kropp */}
                <rect 
                    x={centerX - r} 
                    y={centerY} 
                    width={r * 2} 
                    height={h} 
                    fill="#e0e7ff"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                />
                
                {/* Topp oval */}
                <ellipse 
                    cx={centerX} 
                    cy={centerY} 
                    rx={r} 
                    ry={r * 0.35} 
                    fill="#e0e7ff"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                />
                
                {/* Botten oval (halv) */}
                <ellipse 
                    cx={centerX} 
                    cy={centerY + h} 
                    rx={r} 
                    ry={r * 0.35} 
                    fill="#e0e7ff"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                />
                
                {/* Radie */}
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
                
                {/* Höjd */}
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
      }
    }
}