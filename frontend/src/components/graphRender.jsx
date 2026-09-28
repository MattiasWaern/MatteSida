import { useId } from "react";

const COLORS = ["#2563eb", "#f97316", "#16a34a"];

// Ritar ett koordinatsystem med rutnät, linjer (y = kx + m) och punkter.
// graph = { xMin, xMax, yMin, yMax, lines: [{k, m, label?}], points: [{x, y, label?}] }
const GraphRender = ({ graph }) => {
    const clipId = "graph-clip-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");

    if (!graph) return null;

    const {
        xMin = -6,
        xMax = 6,
        yMin = -6,
        yMax = 6,
        lines = [],
        points = [],
    } = graph;

    const W = 340;
    const H = 340;
    const pad = 30;

    const sx = (W - 2 * pad) / (xMax - xMin);
    const sy = (H - 2 * pad) / (yMax - yMin);

    const px = (x) => pad + (x - xMin) * sx;
    const py = (y) => H - pad - (y - yMin) * sy;

    const range = (min, max) =>
        Array.from({ length: max - min + 1 }, (_, i) => min + i);

    const xs = range(Math.ceil(xMin), Math.floor(xMax));
    const ys = range(Math.ceil(yMin), Math.floor(yMax));

    const stepX = xMax - xMin > 14 ? 2 : 1;
    const stepY = yMax - yMin > 14 ? 2 : 1;

    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    // Var ska linjens etikett sitta? Nära dess högra/övre kant.
    function labelPosition({ k, m }) {
        let x = xMax;
        let y = k * x + m;

        if (y > yMax - 0.6 || y < yMin + 0.6) {
            y = k > 0 ? yMax - 0.6 : yMin + 0.6;
            x = k !== 0 ? (y - m) / k : xMax;
        }

        return {
            x: clamp(px(x) - 12, pad + 10, W - pad - 10),
            y: clamp(py(y) - 10, pad + 10, H - pad - 6),
        };
    }

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            className="geometry-svg"
            role="img"
            aria-label="Koordinatsystem"
        >
            <defs>
                <clipPath id={clipId}>
                    <rect x={pad} y={pad} width={W - 2 * pad} height={H - 2 * pad} />
                </clipPath>
            </defs>

            <rect x={pad} y={pad} width={W - 2 * pad} height={H - 2 * pad} fill="#ffffff" />

            {/* Rutnät */}
            {xs.map((x) => (
                <line key={`gx${x}`} x1={px(x)} y1={pad} x2={px(x)} y2={H - pad} stroke="#e5e7eb" strokeWidth="1" />
            ))}
            {ys.map((y) => (
                <line key={`gy${y}`} x1={pad} y1={py(y)} x2={W - pad} y2={py(y)} stroke="#e5e7eb" strokeWidth="1" />
            ))}

            {/* Axlar */}
            {yMin <= 0 && yMax >= 0 && (
                <line x1={pad} y1={py(0)} x2={W - pad + 8} y2={py(0)} stroke="#1e2a44" strokeWidth="2" />
            )}
            {xMin <= 0 && xMax >= 0 && (
                <line x1={px(0)} y1={H - pad} x2={px(0)} y2={pad - 8} stroke="#1e2a44" strokeWidth="2" />
            )}

            <text x={W - pad + 12} y={py(0) + 4} fontSize="13" fontWeight="700" fill="#1e2a44">x</text>
            <text x={px(0) + 8} y={pad - 10} fontSize="13" fontWeight="700" fill="#1e2a44">y</text>

            {/* Siffror på axlarna */}
            {xs.filter((x) => x !== 0 && x % stepX === 0).map((x) => (
                <text key={`tx${x}`} x={px(x)} y={py(0) + 15} fontSize="10" textAnchor="middle" fill="#64748b">{x}</text>
            ))}
            {ys.filter((y) => y !== 0 && y % stepY === 0).map((y) => (
                <text key={`ty${y}`} x={px(0) - 6} y={py(y) + 3.5} fontSize="10" textAnchor="end" fill="#64748b">{y}</text>
            ))}
            <text x={px(0) - 6} y={py(0) + 13} fontSize="10" textAnchor="end" fill="#64748b">0</text>

            {/* Linjer */}
            <g clipPath={`url(#${clipId})`}>
                {lines.map((line, i) => (
                    <line
                        key={`l${i}`}
                        x1={px(xMin)}
                        y1={py(line.k * xMin + line.m)}
                        x2={px(xMax)}
                        y2={py(line.k * xMax + line.m)}
                        stroke={COLORS[i % COLORS.length]}
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                ))}
            </g>

            {/* Linjeetiketter */}
            {lines.map((line, i) => {
                if (!line.label) return null;
                const pos = labelPosition(line);
                return (
                    <g key={`ll${i}`}>
                        <rect x={pos.x - 9} y={pos.y - 12} width="18" height="18" rx="4" fill="#ffffff" stroke={COLORS[i % COLORS.length]} strokeWidth="1.5" />
                        <text x={pos.x} y={pos.y + 2} fontSize="13" fontWeight="700" textAnchor="middle" fill={COLORS[i % COLORS.length]}>{line.label}</text>
                    </g>
                );
            })}

            {/* Punkter */}
            {points.map((p, i) => (
                <g key={`p${i}`}>
                    <circle cx={px(p.x)} cy={py(p.y)} r="5" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
                    {p.label && (
                        <text x={px(p.x) + 8} y={py(p.y) - 8} fontSize="14" fontWeight="700" fill="#dc2626">{p.label}</text>
                    )}
                </g>
            ))}

            <rect x={pad} y={pad} width={W - 2 * pad} height={H - 2 * pad} fill="none" stroke="#cbd5e1" strokeWidth="1" />
        </svg>
    );
};

export default GraphRender;
