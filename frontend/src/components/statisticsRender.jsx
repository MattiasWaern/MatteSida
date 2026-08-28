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
}