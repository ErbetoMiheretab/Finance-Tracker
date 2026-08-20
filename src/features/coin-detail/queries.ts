import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client";

interface CoinDetailData {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  image: {
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    telegram_channel_identifier: string;
  };
}

const fetchCoinDetail = async (coinId: string): Promise<CoinDetailData> => {
  const response = await apiClient.get(`/coins/${coinId}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  });

  return response.data;
};

export function useCoinDetail(coinId: string) {
  return useQuery({
    queryKey: ["coins", "detail", coinId],
    queryFn: () => fetchCoinDetail(coinId),
    staleTime: 60000, // 1 minute
    refetchInterval: 60000, // Poll every minute
    enabled: !!coinId,
  });
}
