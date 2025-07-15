// This is a mock API service for demonstration purposes
// In a real application, this would connect to your backend API

export interface MarketStatsData {
  tvl: number
  totalBorrowed: number
  totalSupplied: number
  activeUsers: number
  tvlTrend: number
}

export interface Asset {
  id: string
  name: string
  symbol: string
  price: number
  apy: number
  totalSupplied: number
  totalBorrowed: number
  utilizationRate: number
  available: number
}

export interface Position {
  id: string
  address: string
  collateral: {
    asset: string
    symbol: string
    amount: number
    value: number
  }
  debt: {
    asset: string
    symbol: string
    amount: number
    value: number
  }
  healthFactor: number
  liquidationThreshold: number
}

export interface UserPosition {
  collateral: {
    totalValue: number
    assets: Array<{
      id: string
      name: string
      symbol: string
      amount: number
      value: number
      apy: number
    }>
  }
  borrowed: {
    totalValue: number
    assets: Array<{
      id: string
      name: string
      symbol: string
      amount: number
      value: number
      apy: number
    }>
  }
  healthFactor: number
}

// Mock data
const mockAssets: Asset[] = [
  {
    id: "0x123",
    name: "Ethereum",
    symbol: "ETH",
    price: 3500,
    apy: 3.2,
    totalSupplied: 15000000,
    totalBorrowed: 9000000,
    utilizationRate: 60,
    available: 10,
  },
  {
    id: "0x456",
    name: "USD Coin",
    symbol: "USDC",
    price: 1,
    apy: 5.1,
    totalSupplied: 25000000,
    totalBorrowed: 20000000,
    utilizationRate: 80,
    available: 5000,
  },
  {
    id: "0x789",
    name: "Dai",
    symbol: "DAI",
    price: 1,
    apy: 4.8,
    totalSupplied: 18000000,
    totalBorrowed: 12000000,
    utilizationRate: 66.7,
    available: 3000,
  },
  {
    id: "0xabc",
    name: "Bitcoin",
    symbol: "BTC",
    price: 65000,
    apy: 2.5,
    totalSupplied: 30000000,
    totalBorrowed: 15000000,
    utilizationRate: 50,
    available: 0.5,
  },
]

const mockPositions: Position[] = [
  {
    id: "0xpos1",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    collateral: {
      asset: "Ethereum",
      symbol: "ETH",
      amount: 5,
      value: 17500,
    },
    debt: {
      asset: "USD Coin",
      symbol: "USDC",
      amount: 15000,
      value: 15000,
    },
    healthFactor: 1.05,
    liquidationThreshold: 1.0,
  },
  {
    id: "0xpos2",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    collateral: {
      asset: "Bitcoin",
      symbol: "BTC",
      amount: 0.5,
      value: 32500,
    },
    debt: {
      asset: "USD Coin",
      symbol: "USDC",
      amount: 25000,
      value: 25000,
    },
    healthFactor: 1.2,
    liquidationThreshold: 1.0,
  },
  {
    id: "0xpos3",
    address: "0x7890abcdef1234567890abcdef1234567890abcd",
    collateral: {
      asset: "Ethereum",
      symbol: "ETH",
      amount: 2,
      value: 7000,
    },
    debt: {
      asset: "Dai",
      symbol: "DAI",
      amount: 6500,
      value: 6500,
    },
    healthFactor: 0.98,
    liquidationThreshold: 1.0,
  },
]

// Mock API functions
export async function fetchMarketStats(): Promise<MarketStatsData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    tvl: 88000000,
    totalBorrowed: 56000000,
    totalSupplied: 88000000,
    activeUsers: 12500,
    tvlTrend: 5.2,
  }
}

export async function fetchAssets(): Promise<Asset[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return mockAssets
}

export async function fetchLiquidationPositions(): Promise<Position[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  return mockPositions
}

export async function fetchUserPosition(address: string): Promise<UserPosition | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!address) return null

  return {
    collateral: {
      totalValue: 25000,
      assets: [
        {
          id: "0x123",
          name: "Ethereum",
          symbol: "ETH",
          amount: 5,
          value: 17500,
          apy: 3.2,
        },
        {
          id: "0xabc",
          name: "Bitcoin",
          symbol: "BTC",
          amount: 0.1,
          value: 6500,
          apy: 2.5,
        },
      ],
    },
    borrowed: {
      totalValue: 15000,
      assets: [
        {
          id: "0x456",
          name: "USD Coin",
          symbol: "USDC",
          amount: 15000,
          value: 15000,
          apy: 5.1,
        },
      ],
    },
    healthFactor: 1.5,
  }
}
