const statisticsRender = ({ statistics }) => {
    if (!statistics) return null;

    const drawBarChart = (data) => {
        const maxValue = Math.max(...data.map(item => item.value));

        const chartHeight = 150;
        const chartWidth = 240;
        const barWidth = chartWidth / data.length - 15;

        return (
            <svg
                viewBox="0 0 300 230"
                className="statistics-svg"
            >
                {/* Y-axel */}
                <line
                    x1="40"
                    y1="20"
                    x2="40"
                    y2="180"
                    stroke="#334155"
                    strokeWidth="2"
                />

                {/* X-axel */}
                <line
                    x1="40"
                    y1="180"
                    x2="280"
                    y2="180"
                    stroke="#334155"
                    strokeWidth="2"
                />

                {data.map((item, index) => {
                    const barHeight =
                        (item.value / maxValue) * chartHeight;

                    const x =
                        50 + index * (chartWidth / data.length);

                    const y =
                        180 - barHeight;

                    return (
                        <g key={item.label}>

                            {/* Stapel */}
                            <rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={barHeight}
                                fill="#93c5fd"
                                stroke="#2563eb"
                                strokeWidth="2"
                            />

                            {/* Värde */}
                            <text
                                x={x + barWidth / 2}
                                y={y - 7}
                                textAnchor="middle"
                                fontSize="13"
                                fontWeight="600"
                                fill="#334155"
                            >
                                {item.value}
                            </text>

                            {/* Namn */}
                            <text
                                x={x + barWidth / 2}
                                y="200"
                                textAnchor="middle"
                                fontSize="14"
                                fill="#334155"
                            >
                                {item.label}
                            </text>

                        </g>
                    );
                })}
            </svg>
        );
    };

    const drawLineChart = (data) => {
        const maxValue = Math.max(...data.map(item => item.value));

        const chartHeight = 140;
        const chartWidth = 220;

        const points = data.map((item, index) => {

            const x =
                50 + index * (chartWidth / (data.length - 1 || 1));

            const y =
                170 - (item.value / maxValue) * chartHeight;

            return {
                x,
                y,
                value: item.value,
                label: item.label
            };
        });

        const linePoints = points
            .map(point => `${point.x},${point.y}`)
            .join(" ");

        return (
            <svg
                viewBox="0 0 300 230"
                className="statistics-svg"
            >

                {/* Y-axel */}
                <line
                    x1="40"
                    y1="20"
                    x2="40"
                    y2="170"
                    stroke="#334155"
                    strokeWidth="2"
                />

                {/* X-axel */}
                <line
                    x1="40"
                    y1="170"
                    x2="280"
                    y2="170"
                    stroke="#334155"
                    strokeWidth="2"
                />

                {/* Linje */}
                <polyline
                    points={linePoints}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                />

                {points.map(point => (
                    <g key={point.label}>

                        {/* Punkt */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r="5"
                            fill="#2563eb"
                        />

                        {/* Värde */}
                        <text
                            x={point.x}
                            y={point.y - 10}
                            textAnchor="middle"
                            fontSize="13"
                            fontWeight="600"
                            fill="#334155"
                        >
                            {point.value}
                        </text>

                        {/* Label */}
                        <text
                            x={point.x}
                            y="195"
                            textAnchor="middle"
                            fontSize="13"
                            fill="#334155"
                        >
                            {point.label}
                        </text>

                    </g>
                ))}

            </svg>
        );
    };

    const drawTable = (data) => {
        return (
            <table className="statistics-table">

                <thead>
                    <tr>
                        <th>Kategori</th>
                        <th>Antal</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(item => (
                        <tr key={item.label}>
                            <td>{item.label}</td>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        );
    };

    const drawPieChart = (data) => {
        const total = data.reduce(
            (sum, item) => sum + item.value,
            0
        );

        let currentAngle = 0;

        const radius = 75;
        const center = 100;

        const colors = [
            "#93c5fd",
            "#86efac",
            "#fde68a",
            "#fca5a5",
            "#c4b5fd",
            "#fdba74"
        ];

        const slices = data.map((item, index) => {

            const percentage = item.value / total;

            const angle = percentage * Math.PI * 2;

            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;

            currentAngle = endAngle;

            const x1 =
                center + radius * Math.cos(startAngle);

            const y1 =
                center + radius * Math.sin(startAngle);

            const x2 =
                center + radius * Math.cos(endAngle);

            const y2 =
                center + radius * Math.sin(endAngle);

            const largeArcFlag =
                angle > Math.PI ? 1 : 0;

            const path = `
                M ${center} ${center}
                L ${x1} ${y1}
                A ${radius} ${radius}
                0 ${largeArcFlag} 1
                ${x2} ${y2}
                Z
            `;

            return {
                path,
                label: item.label,
                percentage,
                color: colors[index % colors.length]
            };
        });

        return (
            <svg
                viewBox="0 0 300 230"
                className="statistics-svg"
            >

                <g transform="translate(0,10)">
                    {slices.map(slice => (
                        <path
                            key={slice.label}
                            d={slice.path}
                            fill={slice.color}
                            stroke="white"
                            strokeWidth="2"
                        />
                    ))}
                </g>

                {/* Förklaring */}
                {slices.map((slice, index) => (
                    <g
                        key={slice.label}
                        transform={`translate(200, ${30 + index * 25})`}
                    >

                        <rect
                            width="12"
                            height="12"
                            fill={slice.color}
                        />

                        <text
                            x="18"
                            y="11"
                            fontSize="12"
                            fill="#334155"
                        >
                            {slice.label}{" "}
                            {Math.round(slice.percentage * 100)}%
                        </text>

                    </g>
                ))}

            </svg>
        );
    };

    const drawNumberList = (data) => {
        return (
            <div className="statistics-calculation">
                <div className="statistics-numbers">
                    {data.map((number, index) => (
                        <span key={index}>
                            {number}
                            {index < data.length - 1 && ", "}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    const drawPercentage = (data) => {
        // data: [värde, total]
        const value = data[0];
        const total = data[1];

        return (
            <div className="statistics-calculation">
                <div className="percentage-values">
                    <strong>{value}</strong>
                    <span> av </span>
                    <strong>{total}</strong>
                </div>
            </div>
        );
    };

    const drawWeightedAverage = (data) => {
        // data: [värde1, värde2, vikt1, vikt2]
        const [v1, v2, w1, w2] = data;

        return (
            <div className="statistics-calculation">
                <div className="weighted-calculation">
                    <p>
                        <strong>{v1}</strong> · <strong>{w1}%</strong>
                    </p>
                    <p>
                        <strong>{v2}</strong> · <strong>{w2}%</strong>
                    </p>
                </div>
            </div>
        );
    };

    switch (statistics.type) {

        case "barChart":
            return drawBarChart(statistics.data);

        case "lineChart":
            return drawLineChart(statistics.data);

        case "pieChart":
            return drawPieChart(statistics.data);

        case "table":
            return drawTable(statistics.data);

        case "average":
        case "median":
        case "range":
        case "mode":
            return drawNumberList(statistics.data);

        default:
            return null;
    }
}

export default statisticsRender;