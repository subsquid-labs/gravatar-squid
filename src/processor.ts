import { assertNotNull } from '@subsquid/util-internal'
import { EvmBatchProcessor} from '@subsquid/evm-processor'
import { events } from './abi/Gravity'
import { lookupArchive } from '@subsquid/archive-registry'

export const GRAVATAR_CONTRACT = '0x2E645469f354BB4F5c8a05B3b30A929361cf77eC'.toLowerCase()

export const processor = new EvmBatchProcessor()
  // Lookup archive by the network name in Subsquid registry
  // See https://docs.subsquid.io/evm-indexing/supported-networks/
  .setGateway(lookupArchive('eth-mainnet'))
  // Chain RPC endpoint is required for
  //  - indexing unfinalized blocks https://docs.subsquid.io/basics/unfinalized-blocks/
  //  - querying the contract state https://docs.subsquid.io/evm-indexing/query-state/
  .setRpcEndpoint({
    // Set the URL via .env for local runs or via secrets when deploying to Subsquid Cloud
    // https://docs.subsquid.io/deploy-squid/env-variables
    url: assertNotNull(process.env.RPC_ENDPOINT),
    // More RPC connection options at https://docs.subsquid.io/evm-indexing/configuration/initialization/#set-data-source
    rateLimit: 10
  })
  .setBlockRange({ from: 6175243 })
  .setFinalityConfirmation(75)
  .addLog({
    address: [ GRAVATAR_CONTRACT ],
    topic0: [
      events.NewGravatar.topic,
      events.UpdatedGravatar.topic,
    ],
  })

