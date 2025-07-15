// Smart contract interaction utilities

import { Contract, type Provider, type Account } from "starknet"

// Contract addresses (these would be deployed contract addresses)
export const CONTRACTS = {
  LENDING_POOL: "0x1234567890abcdef1234567890abcdef12345678",
  FLASH_LOAN: "0xabcdef1234567890abcdef1234567890abcdef12",
  PRICE_ORACLE: "0x567890abcdef1234567890abcdef1234567890ab",
  INTEREST_RATE_MODEL: "0xcdef1234567890abcdef1234567890abcdef1234",
}

// Contract ABIs (simplified)
export const LENDING_POOL_ABI = [
  {
    name: "supply",
    type: "function",
    inputs: [
      { name: "asset", type: "felt" },
      { name: "amount", type: "Uint256" },
    ],
    outputs: [],
  },
  {
    name: "withdraw",
    type: "function",
    inputs: [
      { name: "asset", type: "felt" },
      { name: "amount", type: "Uint256" },
    ],
    outputs: [],
  },
  {
    name: "borrow",
    type: "function",
    inputs: [
      { name: "asset", type: "felt" },
      { name: "amount", type: "Uint256" },
    ],
    outputs: [],
  },
  {
    name: "repay",
    type: "function",
    inputs: [
      { name: "asset", type: "felt" },
      { name: "amount", type: "Uint256" },
    ],
    outputs: [],
  },
  {
    name: "liquidate",
    type: "function",
    inputs: [
      { name: "user", type: "felt" },
      { name: "collateral_asset", type: "felt" },
      { name: "debt_asset", type: "felt" },
      { name: "amount", type: "Uint256" },
    ],
    outputs: [],
  },
  {
    name: "calculate_health_factor",
    type: "function",
    inputs: [{ name: "user", type: "felt" }],
    outputs: [{ name: "health_factor", type: "Uint256" }],
  },
]

export const FLASH_LOAN_ABI = [
  {
    name: "flash_loan",
    type: "function",
    inputs: [
      { name: "receiver_address", type: "felt" },
      { name: "asset", type: "felt" },
      { name: "amount", type: "Uint256" },
      { name: "params", type: "felt*" },
      { name: "params_len", type: "felt" },
    ],
    outputs: [],
  },
  {
    name: "calculate_fee",
    type: "function",
    inputs: [{ name: "amount", type: "Uint256" }],
    outputs: [{ name: "fee", type: "Uint256" }],
  },
]

// Contract interaction class
export class LendstellContracts {
  private provider: Provider
  private account?: Account
  private lendingPool: Contract
  private flashLoan: Contract

  constructor(provider: Provider, account?: Account) {
    this.provider = provider
    this.account = account

    this.lendingPool = new Contract(LENDING_POOL_ABI, CONTRACTS.LENDING_POOL, this.provider)

    this.flashLoan = new Contract(FLASH_LOAN_ABI, CONTRACTS.FLASH_LOAN, this.provider)

    if (account) {
      this.lendingPool.connect(account)
      this.flashLoan.connect(account)
    }
  }

  // Lending Pool functions
  async supply(asset: string, amount: string) {
    if (!this.account) throw new Error("Account not connected")

    return await this.lendingPool.supply(asset, { low: amount, high: "0" })
  }

  async withdraw(asset: string, amount: string) {
    if (!this.account) throw new Error("Account not connected")

    return await this.lendingPool.withdraw(asset, { low: amount, high: "0" })
  }

  async borrow(asset: string, amount: string) {
    if (!this.account) throw new Error("Account not connected")

    return await this.lendingPool.borrow(asset, { low: amount, high: "0" })
  }

  async repay(asset: string, amount: string) {
    if (!this.account) throw new Error("Account not connected")

    return await this.lendingPool.repay(asset, { low: amount, high: "0" })
  }

  async liquidate(user: string, collateralAsset: string, debtAsset: string, amount: string) {
    if (!this.account) throw new Error("Account not connected")

    return await this.lendingPool.liquidate(user, collateralAsset, debtAsset, { low: amount, high: "0" })
  }

  async getHealthFactor(user: string) {
    return await this.lendingPool.calculate_health_factor(user)
  }

  // Flash Loan functions
  async executeFlashLoan(receiverAddress: string, asset: string, amount: string, params: string[] = []) {
    if (!this.account) throw new Error("Account not connected")

    return await this.flashLoan.flash_loan(receiverAddress, asset, { low: amount, high: "0" }, params, params.length)
  }

  async calculateFlashLoanFee(amount: string) {
    return await this.flashLoan.calculate_fee({ low: amount, high: "0" })
  }

  // Utility functions
  connectAccount(account: Account) {
    this.account = account
    this.lendingPool.connect(account)
    this.flashLoan.connect(account)
  }

  disconnectAccount() {
    this.account = undefined
  }
}

// Asset addresses mapping
export const ASSET_ADDRESSES = {
  ETH: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",\
