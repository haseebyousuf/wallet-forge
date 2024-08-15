import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { HDNode } from '@ethersproject/hdnode';
import bs58 from 'bs58';


export function generateSolWallet(): Wallet {
       const mnemonic = generateMnemonic();
        const seed = mnemonicToSeedSync(mnemonic)
        const path = `m/44'/501'/0'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
        const keyPair = Keypair.fromSecretKey(secretKey);
        const privateKey = bs58.encode(keyPair.secretKey)
        const publicKey = keyPair.publicKey.toBase58();
        return {
            mnemonic,
            publicKey,
            privateKey,
            type:"SOL",
            id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        }
}

  export function generateEthereumWallet(): Wallet {
        const mnemonic = generateMnemonic();
        const hdNode = HDNode.fromMnemonic(mnemonic);
        const derivationPath = `m/44'/60'/0'/0'`;
        const wallet = hdNode.derivePath(derivationPath);
        const publicKey = wallet.address;
        const privateKey = wallet.privateKey

        return {
            mnemonic,
            publicKey,
            privateKey,
            type:"ETH",
            id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        }
}
