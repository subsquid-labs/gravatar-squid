import {run} from '@subsquid/batch-processor'
import {augmentBlock} from '@subsquid/evm-objects'
import {DataSourceBuilder} from '@subsquid/evm-stream'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import {decodeHex} from '@subsquid/util-internal-hex'
import {events} from './abi/Gravity'
import {Gravatar} from './model'

export const GRAVATAR_CONTRACT = '0x2E645469f354BB4F5c8a05B3b30A929361cf77eC'.toLowerCase()

// A DataSourceBuilder defines where to get the data and what data to fetch.
const dataSource = new DataSourceBuilder()
  // The SQD Network Portal is the primary source of blockchain data: it is public,
  // needs no API key, and streams pre-filtered data — including real-time unfinalized
  // blocks — far faster than a plain RPC endpoint.
  // Browse the available datasets at https://docs.sqd.ai/subsquid-network/reference/networks/
  .setPortal('https://portal.sqd.dev/datasets/ethereum-mainnet')
  // To use a private or rate-limit-lifted Portal, supply an API key
  // through the HTTP client headers (create a key at https://portal.sqd.dev/app):
  // .setPortal({
  //     url: 'https://portal.sqd.dev/datasets/ethereum-mainnet',
  //     http: {
  //         headers: {'x-api-key': process.env.SQD_API_KEY},
  //     },
  // })
  .setBlockRange({from: 6175243})
  // Field selection is explicit: there are no default optional fields, so list every
  // field the handler reads. See
  // https://docs.sqd.dev/en/sdk/squid-sdk/evm/reference/evm-stream/field-selection
  .setFields({
    log: {
      address: true,
      topics: true,
      data: true,
    },
  })
  // Request the Gravatar contract logs carrying a NewGravatar or UpdatedGravatar topic.
  .addLog({
    where: {
      address: [GRAVATAR_CONTRACT],
      topic0: [
        events.NewGravatar.topic,
        events.UpdatedGravatar.topic,
      ],
    },
  })
  .build()

// TypeormDatabase stores the data to Postgres and handles hot-block rollbacks on forks.
// run() drives the processing loop, passing each batch of data to the handler.
run(dataSource, new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
  // augmentBlock() enriches raw block items with ids and navigation helpers.
  const blocks = ctx.blocks.map(augmentBlock)
  const gravatars: Map<string, Gravatar> = new Map()
  for (const block of blocks) {
    for (const log of block.logs) {
      if (!(log.address === GRAVATAR_CONTRACT &&
            (log.topics[0] === events.NewGravatar.topic ||
             log.topics[0] === events.UpdatedGravatar.topic))) continue
      const { id, owner, displayName, imageUrl } = extractData(log)
      let idString = '0x' + id.toString(16)
      gravatars.set(idString, new Gravatar({
        id: idString,
        owner: decodeHex(owner),
        displayName,
        imageUrl
      }))
    }
  }
  await ctx.store.upsert([...gravatars.values()])
})


function extractData(evmLog: any): { id: bigint, owner: string, displayName: string, imageUrl: string} {
  if (evmLog.topics[0] === events.NewGravatar.topic) {
    return events.NewGravatar.decode(evmLog)
  }
  if (evmLog.topics[0] === events.UpdatedGravatar.topic) {
    return events.UpdatedGravatar.decode(evmLog)
  }
  throw new Error('Unsupported topic')
}
