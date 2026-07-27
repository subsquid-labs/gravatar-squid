import { address, string, struct, uint256 } from '@subsquid/evm-codec'
import { func } from '../abi.support.js'
import type { FunctionArguments, FunctionReturn } from '../abi.support.js'

/** updateGravatarImage(string) */
export const updateGravatarImage = func('0x0081d6e5', {
    _imageUrl: string,
})
export type UpdateGravatarImageParams = FunctionArguments<typeof updateGravatarImage>
export type UpdateGravatarImageReturn = FunctionReturn<typeof updateGravatarImage>

/** setMythicalGravatar() */
export const setMythicalGravatar = func('0x1d4f2c6d', {})
export type SetMythicalGravatarParams = FunctionArguments<typeof setMythicalGravatar>
export type SetMythicalGravatarReturn = FunctionReturn<typeof setMythicalGravatar>

/** getGravatar(address) */
export const getGravatar = func('0x359c1f72', {
    owner: address,
}, struct({
    _0: string,
    _1: string,
}))
export type GetGravatarParams = FunctionArguments<typeof getGravatar>
export type GetGravatarReturn = FunctionReturn<typeof getGravatar>

/** gravatarToOwner(uint256) */
export const gravatarToOwner = func('0x88d0d391', {
    _0: uint256,
}, address)
export type GravatarToOwnerParams = FunctionArguments<typeof gravatarToOwner>
export type GravatarToOwnerReturn = FunctionReturn<typeof gravatarToOwner>

/** ownerToGravatar(address) */
export const ownerToGravatar = func('0xa5ac3634', {
    _0: address,
}, uint256)
export type OwnerToGravatarParams = FunctionArguments<typeof ownerToGravatar>
export type OwnerToGravatarReturn = FunctionReturn<typeof ownerToGravatar>

/** updateGravatarName(string) */
export const updateGravatarName = func('0xb18588fb', {
    _displayName: string,
})
export type UpdateGravatarNameParams = FunctionArguments<typeof updateGravatarName>
export type UpdateGravatarNameReturn = FunctionReturn<typeof updateGravatarName>

/** createGravatar(string,string) */
export const createGravatar = func('0xcdb3344a', {
    _displayName: string,
    _imageUrl: string,
})
export type CreateGravatarParams = FunctionArguments<typeof createGravatar>
export type CreateGravatarReturn = FunctionReturn<typeof createGravatar>

/** gravatars(uint256) */
export const gravatars = func('0xd5ce24ed', {
    _0: uint256,
}, struct({
    owner: address,
    displayName: string,
    imageUrl: string,
}))
export type GravatarsParams = FunctionArguments<typeof gravatars>
export type GravatarsReturn = FunctionReturn<typeof gravatars>
