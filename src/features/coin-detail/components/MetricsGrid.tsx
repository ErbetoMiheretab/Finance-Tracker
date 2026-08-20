import { formatCurrency } from "../../../utils/currency";

interface MetricsGridProps {
  marketCap: number;
  volume: number;
  priceChange7d: number;
  priceChange30d: number;
}

export function MetricsGrid({
  marketCap,
  volume,
  priceChange7d,
  priceChange30d,
}: MetricsGridProps) {
  const metrics = [
    { label: "Market Cap", value: formatCurrency(marketCap) },
    { label: "24h Volume", value: formatCurrency(volume) },
    {
      label: "7d Change",
      value: `${priceChange7d.toFixed(2)}%`,
      className: priceChange7d >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      label: "30d Change",
      value: `${priceChange30d.toFixed(2)}%`,
      className: priceChange30d >= 0 ? "text-green-600" : "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md: grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">{metric.label}</div>
          <div
            className={`text-lg font-semibold ${metric.className || "text-gray-900"}`}
          >
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  );
}
