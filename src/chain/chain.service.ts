import { Injectable } from '@nestjs/common';
import { createPublicClient, http, PublicClient } from 'viem';
import { filecoin, filecoinCalibration } from 'viem/chains';
import { FILECOIN_NETWORK, FILECOIN_RPC_URL } from '../config';

/**
 * Read-only connection to the Filecoin network (FEVM JSON-RPC).
 * Sign-in does not use it (signatures are checked locally); billing will use it
 * to read users' Filecoin Pay balances and payment streams.
 */
@Injectable()
export class ChainService {
  readonly network = FILECOIN_NETWORK;
  readonly chain = FILECOIN_NETWORK === 'mainnet' ? filecoin : filecoinCalibration;
  readonly chainId = this.chain.id;
  readonly rpcUrl = FILECOIN_RPC_URL;
  readonly client: PublicClient;

  constructor() {
    if (FILECOIN_NETWORK !== 'calibration' && FILECOIN_NETWORK !== 'mainnet') {
      throw new Error(`FILECOIN_NETWORK must be "calibration" or "mainnet", got "${FILECOIN_NETWORK}"`);
    }
    this.client = createPublicClient({
      chain: this.chain,
      transport: http(FILECOIN_RPC_URL, { timeout: 10_000, retryCount: 1 }),
    }) as PublicClient;
  }

  /** Checks that the endpoint answers and is on the expected network. */
  async status(): Promise<{ ok: boolean; network: string; chainId: number; blockNumber?: string; error?: string }> {
    const base = { network: this.network, chainId: this.chainId };
    try {
      const [remoteChainId, blockNumber] = await Promise.all([this.client.getChainId(), this.client.getBlockNumber()]);
      if (remoteChainId !== this.chainId) {
        return { ...base, ok: false, error: `RPC endpoint is on chain ${remoteChainId}, expected ${this.chainId}` };
      }
      return { ...base, ok: true, blockNumber: blockNumber.toString() };
    } catch (err: any) {
      return { ...base, ok: false, error: String(err?.shortMessage ?? err?.message ?? err).slice(0, 200) };
    }
  }
}
