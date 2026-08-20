// src/features/coin-detail/CoinDetail.tsx
import { useParams } from '@tanstack/react-router'
import { useCoinDetail } from './queries'
import { PriceHeader } from './components/PriceHeader'
import { MetricsGrid } from './components/MetricsGrid'
import { Spinner } from '../../components/Spinner'
import { ErrorBoundary } from '../../components/ErrorBoundary'

export function CoinDetail() {
  const { coinId } = useParams({ from: '/coin/$coinId' })
  const { data: coin, isLoading, error, refetch } = useCoinDetail(coinId)

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading coin details: {error.message}</p>
        <button 
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!coin) {
    return <div>Coin not found</div>
  }

  return (
    <div>
      <button 
        onClick={() => window.history.back()}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to Dashboard
      </button>

      <ErrorBoundary>
        <PriceHeader
          name={coin.name}
          symbol={coin.symbol}
          currentPrice={coin.market_data.current_price.usd}
          priceChange24h={coin.market_data.price_change_percentage_24h}
          image={coin.image.large}
        />

        <MetricsGrid
          marketCap={coin.market_data.market_cap.usd}
          volume={coin.market_data.total_volume.usd}
          priceChange7d={coin.market_data.price_change_percentage_7d}
          priceChange30d={coin.market_data.price_change_percentage_30d}
        />

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About {coin.name}</h2>
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: coin.description.en }}
          />
          
          {coin.links.homepage[0] && (
            <div className="mt-4">
              <a 
                href={coin.links.homepage[0]} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Official Website →
              </a>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </div>
  )
}