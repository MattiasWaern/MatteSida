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
}