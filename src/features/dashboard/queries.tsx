import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../api/client'



interface CoinMarketData{
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    total_volume: number
    price_change_percentage_24h: number
    sparkline_in_7d?:{
        price: number[]
    }
}

const fetchCoinsList = async (): Promise<CoinMarketData[]> =>{
    const response = await apiClient.get('/coins/markets', {
        params:{
            vs_currency: 'usd',
            order: 'market_cap_desc', 
            page: 1,
            sparkline: true,
            price_change_percentage: '24h',
        }
    })
    return response.data
}


export function useCoinsList(){
    return useQuery({
        queryKey:['coins', 'list'],
        queryFn: fetchCoinsList,
        staleTime:6000,
        refetchInterval: 60000,
        refetchIntervalInBackground: true,
    })
}