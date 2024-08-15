type Wallet = {
    id: number
    type: WalletType
    publicKey: string,
    privateKey: string,
    mnemonic: string
}

type WalletType = "SOL" | 'ETH'
