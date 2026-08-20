import { createFileRoute } from '@tanstack/react-router'
import { CoinDetail } from '../features/coin-detail/CoinDetail'

export const Route = createFileRoute('/coin/$coinId')({
  component: CoinDetail,
})