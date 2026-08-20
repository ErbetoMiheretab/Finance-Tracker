// src/features/dashboard/Dashboard.tsx
import { useCoinsList } from './queries'
import { CoinTable } from './components/CoinTable'
import { Spinner } from '../../components/Spinner'
import { ErrorBoundary } from '../../components/ErrorBoundary'

export function Dashboard() {
  const { data: coins, isLoading, error, refetch } = useCoinsList()

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading coins: {error.message}</p>
        <button 
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Cryptocurrency Dashboard
        </h1>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Refresh Data
        </button>
      </div>
      
      <ErrorBoundary>
        <CoinTable coins={coins || []} isLoading={isLoading} />
      </ErrorBoundary>
      
      {isLoading && <Spinner />}
    </div>
  )
}