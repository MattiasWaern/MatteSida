const GeometryRender = ({ geometry }) => {
    if (!geometry) return null;

    // TRIANGEL
    const drawTriangle = (base, height) => {
        const scale = Math.min(220 / base, 160 / height);

        const basePx = base * scale;
        const heightPx = height * scale;

        const baseY = 190;
        const leftX = (300 - basePx) / 2;
        const rightX = leftX + basePx;
        const topX = 150;
        const topY = baseY - heightPx;

        return (
            <svg viewBox="0 0 300 240" className="geometry-svg">

                <defs>
                    <marker
                        id="triangle-arrow"
                        markerWidth="8"
                        markerHeight="8"
                        refX="4"
                        refY="4"
                        orient="auto-start-reverse"
                    >
                        <path
                            d="M 0 0 L 8 4 L 0 8 Z"
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

                {/* Höjd */}
                <line
                    x1={topX}
                    y1={baseY}
                    x2={topX}
                    y2={topY}
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    strokeDasharray="6,4"
                />

                {/* Bas-mått */}
                <line
                    x1={leftX}
                    y1={baseY + 15}
                    x2={rightX}
                    y2={baseY + 15}
                    stroke="#dc2626"
                    strokeWidth="2"
                    markerStart="url(#triangle-arrow)"
                    markerEnd="url(#triangle-arrow)"
                />

                <text
                    x="150"
                    y={baseY + 35}
                    textAnchor="middle"
                    fill="#dc2626"
                    fontSize="16"
                    fontWeight="600"
                >
                    bas = {base} cm
                </text>

                {/* Höjd-mått */}
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
                <polyline
                    points={`
                        ${topX},${baseY - 12}
                        ${topX + 12},${baseY - 12}
                        ${topX + 12},${baseY}
                    `}
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2"
                />

            </svg>
        );
    };


    // CIRKEL
    const drawCircle = (radius) => {
        const maxRadius = 80;

        const r = Math.min(radius * 10, maxRadius);

        const centerX = 150;
        const centerY = 115;

        return (
            <svg viewBox="0 0 300 240" className="geometry-svg">

                <defs>
                    <marker
                        id="circle-arrow"
                        markerWidth="8"
                        markerHeight="8"
                        refX="4"
                        refY="4"
                        orient="auto-start-reverse"
                    >
                        <path
                            d="M 0 0 L 8 4 L 0 8 Z"
                            fill="#64748b"
                        />
                    </marker>
                </defs>

                {/* Cirkel */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={r}
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="3"
                />

                {/* Centrum */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r="5"
                    fill="#dc2626"
                />

                {/* Radie */}
                <line
                    x1={centerX}
                    y1={centerY}
                    x2={centerX + r}
                    y2={centerY}
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    markerEnd="url(#circle-arrow)"
                />

                <text
                    x={centerX + r / 2}
                    y={centerY - 10}
                    textAnchor="middle"
                    fill="#dc2626"
                    fontSize="16"
                    fontWeight="600"
                >
                    r = {radius} cm
                </text>

                {/* Diameter */}
                <line
                    x1={centerX - r}
                    y1={centerY + r + 20}
                    x2={centerX + r}
                    y2={centerY + r + 20}
                    stroke="#64748b"
                    strokeWidth="2"
                    markerStart="url(#circle-arrow)"
                    markerEnd="url(#circle-arrow)"
                />

                <text
                    x={centerX}
                    y={centerY + r + 42}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="14"
                    fontWeight="600"
                >
                    d = {radius * 2} cm
                </text>

            </svg>
        );
    };


    // REKTANGEL
    const drawRectangle = (width, height) => {
        const maxWidth = 200;
        const maxHeight = 130;

        const scale = Math.min(
            maxWidth / width,
            maxHeight / height
        );

        const rectangleWidth = width * scale;
        const rectangleHeight = height * scale;

        const x = (300 - rectangleWidth) / 2;
        const y = 100 - rectangleHeight / 2;

        return (
            <svg viewBox="0 0 300 240" className="geometry-svg">

                <defs>
                    <marker
                        id="rectangle-arrow"
                        markerWidth="8"
                        markerHeight="8"
                        refX="4"
                        refY="4"
                        orient="auto-start-reverse"
                    >
                        <path
                            d="M 0 0 L 8 4 L 0 8 Z"
                            fill="#64748b"
                        />
                    </marker>
                </defs>

                {/* Rektangel */}
                <rect
                    x={x}
                    y={y}
                    width={rectangleWidth}
                    height={rectangleHeight}
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="3"
                />

                {/* Bredd */}
                <line
                    x1={x}
                    y1={y + rectangleHeight + 20}
                    x2={x + rectangleWidth}
                    y2={y + rectangleHeight + 20}
                    stroke="#dc2626"
                    strokeWidth="2"
                    markerStart="url(#rectangle-arrow)"
                    markerEnd="url(#rectangle-arrow)"
                />

                <text
                    x={x + rectangleWidth / 2}
                    y={y + rectangleHeight + 42}
                    textAnchor="middle"
                    fill="#dc2626"
                    fontSize="16"
                    fontWeight="600"
                >
                    bredd = {width} cm
                </text>

                {/* Höjd */}
                <line
                    x1={x + rectangleWidth + 20}
                    y1={y}
                    x2={x + rectangleWidth + 20}
                    y2={y + rectangleHeight}
                    stroke="#16a34a"
                    strokeWidth="2"
                    markerStart="url(#rectangle-arrow)"
                    markerEnd="url(#rectangle-arrow)"
                />

                <text
                    x={x + rectangleWidth + 30}
                    y={y + rectangleHeight / 2 + 5}
                    fill="#16a34a"
                    fontSize="16"
                    fontWeight="600"
                >
                    h = {height} cm
                </text>

            </svg>
        );
    };


    // CYLINDER
    const drawCylinder = (radius, height) => {
        const maxWidth = 130;
        const maxHeight = 130;

        const scale = Math.min(
            maxWidth / (radius * 2),
            maxHeight / height
        );

        const r = radius * scale;
        const h = height * scale;

        const centerX = 150;
        const topY = 55;
        const bottomY = topY + h;

        return (
            <svg viewBox="0 0 300 240" className="geometry-svg">

                <defs>
                    <marker
                        id="cylinder-arrow"
                        markerWidth="8"
                        markerHeight="8"
                        refX="4"
                        refY="4"
                        orient="auto-start-reverse"
                    >
                        <path
                            d="M 0 0 L 8 4 L 0 8 Z"
                            fill="#64748b"
                        />
                    </marker>
                </defs>

                {/* Cylinder kropp */}
                <rect
                    x={centerX - r}
                    y={topY}
                    width={r * 2}
                    height={h}
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                />

                {/* Övre ellipse */}
                <ellipse
                    cx={centerX}
                    cy={topY}
                    rx={r}
                    ry={r * 0.3}
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                />

                {/* Nedre ellipse */}
                <ellipse
                    cx={centerX}
                    cy={bottomY}
                    rx={r}
                    ry={r * 0.3}
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                />

                {/* Radie */}
                <line
                    x1={centerX}
                    y1={topY}
                    x2={centerX + r}
                    y2={topY}
                    stroke="#dc2626"
                    strokeWidth="2"
                    markerEnd="url(#cylinder-arrow)"
                />

                <text
                    x={centerX + r / 2}
                    y={topY - 10}
                    textAnchor="middle"
                    fill="#dc2626"
                    fontSize="14"
                    fontWeight="600"
                >
                    r = {radius} cm
                </text>

                {/* Höjd */}
                <line
                    x1={centerX + r + 25}
                    y1={topY}
                    x2={centerX + r + 25}
                    y2={bottomY}
                    stroke="#16a34a"
                    strokeWidth="2"
                    markerStart="url(#cylinder-arrow)"
                    markerEnd="url(#cylinder-arrow)"
                />

                <text
                    x={centerX + r + 35}
                    y={(topY + bottomY) / 2 + 5}
                    fill="#16a34a"
                    fontSize="14"
                    fontWeight="600"
                >
                    h = {height} cm
                </text>

            </svg>
        );
    };


    // PYTAGORAS
    const drawPythagoras = (a, b) => {
        const scale = Math.min(
            180 / a,
            150 / b
        );

        const aPx = a * scale;
        const bPx = b * scale;

        const c = Math.sqrt(a * a + b * b);

        const startX = 110;
        const startY = 190;

        return (
            <svg viewBox="0 0 300 240" className="geometry-svg">

                <defs>
                    <marker
                        id="pythagoras-arrow"
                        markerWidth="8"
                        markerHeight="8"
                        refX="4"
                        refY="4"
                        orient="auto-start-reverse"
                    >
                        <path
                            d="M 0 0 L 8 4 L 0 8 Z"
                            fill="#64748b"
                        />
                    </marker>
                </defs>

                {/* Triangel */}
                <polygon
                    points={`
                        ${startX},${startY}
                        ${startX + aPx},${startY}
                        ${startX},${startY - bPx}
                    `}
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="3"
                />

                {/* Rät vinkel */}
                <polyline
                    points={`
                        ${startX},${startY - 15}
                        ${startX + 15},${startY - 15}
                        ${startX + 15},${startY}
                    `}
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2"
                />

                {/* a */}
                <line
                    x1={startX}
                    y1={startY + 18}
                    x2={startX + aPx}
                    y2={startY + 18}
                    stroke="#dc2626"
                    strokeWidth="2"
                    markerStart="url(#pythagoras-arrow)"
                    markerEnd="url(#pythagoras-arrow)"
                />

                <text
                    x={startX + aPx / 2}
                    y={startY + 40}
                    textAnchor="middle"
                    fill="#dc2626"
                    fontSize="16"
                    fontWeight="600"
                >
                    a = {a} cm
                </text>

                {/* b */}
                <line
                    x1={startX - 18}
                    y1={startY}
                    x2={startX - 18}
                    y2={startY - bPx}
                    stroke="#16a34a"
                    strokeWidth="2"
                    markerStart="url(#pythagoras-arrow)"
                    markerEnd="url(#pythagoras-arrow)"
                />

                <text
                    x={startX - 28}
                    y={startY - bPx / 2}
                    textAnchor="end"
                    fill="#16a34a"
                    fontSize="16"
                    fontWeight="600"
                >
                    b = {b} cm
                </text>

                {/* c */}
                <text
                    x={startX + aPx / 2 + 15}
                    y={startY - bPx / 2}
                    textAnchor="middle"
                    fill="#8b5cf6"
                    fontSize="16"
                    fontWeight="600"
                >
                    c = {c.toFixed(1)} cm
                </text>

            </svg>
        );
    };


    switch (geometry.type) {

        case "triangle":
            return drawTriangle(
                geometry.base || 8,
                geometry.height || 6
            );

        case "circle":
            return drawCircle(
                geometry.radius || 5
            );

        case "rectangle":
            return drawRectangle(
                geometry.width || 10,
                geometry.height || 5
            );

        case "cylinder":
            return drawCylinder(
                geometry.radius || 3,
                geometry.height || 10
            );

        case "pythagoras":
            return drawPythagoras(
                geometry.a || 3,
                geometry.b || 4
            );

        default:
            return null;
    }
};

export default GeometryRender;