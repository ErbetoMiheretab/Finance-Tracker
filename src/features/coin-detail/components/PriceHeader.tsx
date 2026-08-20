// src/features/coin-detail/components/PriceHeader.tsx
import { formatCurrency, formatPercentage } from "../../../utils/currency";

interface PriceHeaderProps {
  name: string;
  symbol: string;
  currentPrice: number;
  priceChange24h: number;
  image: string;
}

export function PriceHeader({
  name,
  symbol,
  currentPrice,
  priceChange24h,
  image,
}: PriceHeaderProps) {
  const isPositive = priceChange24h >= 0;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center space-x-4">
        <img src={image} alt={name} className="w-16 h-16" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {name} <span className="text-gray-500 uppercase">({symbol})</span>
          </h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-3xl font-bold">
              {formatCurrency(currentPrice)}
            </span>
            <span
              className={`text-lg font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}
            >
              {formatPercentage(priceChange24h)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
