/**
 * SimpleChart Component
 * 
 * A CSS-only bar chart for displaying data trends.
 * No external charting libraries required.
 * 
 * @component
 */
"use client";

interface ChartData {
    label: string;
    value: number;
}

interface SimpleChartProps {
    data: ChartData[];
    title?: string;
    height?: number;
    color?: string;
}

export default function SimpleChart({
    data,
    title,
    height = 200,
    color = "bg-white",
}: SimpleChartProps) {
    const maxValue = Math.max(...data.map((d) => d.value), 1);

    return (
        <div className="bg-neutral-900/30 rounded-lg border border-white/5 p-6">
            {title && (
                <h3 className="text-sm font-medium text-white uppercase tracking-widest mb-6">
                    {title}
                </h3>
            )}
            <div className="flex items-end justify-between gap-2" style={{ height }}>
                {data.map((item, index) => {
                    const barHeight = (item.value / maxValue) * 100;
                    return (
                        <div
                            key={index}
                            className="flex-1 flex flex-col items-center gap-2"
                        >
                            <div
                                className="w-full relative group"
                                style={{ height: `${height - 30}px` }}
                            >
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-white text-black text-xs font-medium px-2 py-1 rounded whitespace-nowrap">
                                        {item.value}
                                    </div>
                                </div>
                                {/* Bar */}
                                <div
                                    className={`absolute bottom-0 left-0 right-0 ${color} rounded-t transition-all duration-500 hover:opacity-80`}
                                    style={{
                                        height: `${barHeight}%`,
                                        minHeight: item.value > 0 ? "4px" : "0",
                                    }}
                                />
                            </div>
                            <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
