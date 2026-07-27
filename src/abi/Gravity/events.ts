import { address, string, uint256 } from '@subsquid/evm-codec'
import { event } from '../abi.support.js'
import type { EventParams as EParams } from '../abi.support.js'

/** NewGravatar(uint256,address,string,string) */
export const NewGravatar = event('0x9ab3aefb2ba6dc12910ac1bce4692cf5c3c0d06cff16327c64a3ef78228b130b', {
    id: uint256,
    owner: address,
    displayName: string,
    imageUrl: string,
})
export type NewGravatarEventArgs = EParams<typeof NewGravatar>

/** UpdatedGravatar(uint256,address,string,string) */
export const UpdatedGravatar = event('0x76571b7a897a1509c641587568218a290018fbdc8b9a724f17b77ff0eec22c0c', {
    id: uint256,
    owner: address,
    displayName: string,
    imageUrl: string,
})
export type UpdatedGravatarEventArgs = EParams<typeof UpdatedGravatar>
