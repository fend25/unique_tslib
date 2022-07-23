import {UniqueUtils} from "../../../utils";
import {AnyInputAddress, PropertiesArray} from "../../../types";

export type TokenToMint = {
  owner: AnyInputAddress
  properties: PropertiesArray
}

export const validateAndFixTokenOwner = (token: TokenToMint): TokenToMint => {
  let owner = UniqueUtils.Address.is.substrateOrEthereumAddressObj(token.owner) ? token.owner : null

  if (owner === null) {
    if (typeof token.owner !== 'string') {
      throw new Error(`create token: owner should be valid object or string, got ${typeof token.owner}: ${token.owner}`)
    }
    if (UniqueUtils.Address.is.ethereumAddress(token.owner)) {
      owner = {Ethereum: token.owner}
    } else if (UniqueUtils.Address.is.substrateAddress(token.owner)) {
      owner = {Substrate: token.owner}
    } else {
      throw new Error(`create token: owner should be valid ethereum or substrate address, got "${token.owner}"`)
    }
  }

  return {
    ...token,
    owner
  }
}
