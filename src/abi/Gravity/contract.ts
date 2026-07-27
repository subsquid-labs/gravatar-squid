import { ContractBase } from '../abi.support.js'
import { getGravatar, gravatarToOwner, gravatars, ownerToGravatar } from './functions.js'
import type { GetGravatarParams, GravatarToOwnerParams, GravatarsParams, OwnerToGravatarParams } from './functions.js'

export class Contract extends ContractBase {
    getGravatar(owner: GetGravatarParams["owner"]) {
        return this.eth_call(getGravatar, {owner})
    }

    gravatarToOwner(_0: GravatarToOwnerParams["_0"]) {
        return this.eth_call(gravatarToOwner, {_0})
    }

    ownerToGravatar(_0: OwnerToGravatarParams["_0"]) {
        return this.eth_call(ownerToGravatar, {_0})
    }

    gravatars(_0: GravatarsParams["_0"]) {
        return this.eth_call(gravatars, {_0})
    }
}
