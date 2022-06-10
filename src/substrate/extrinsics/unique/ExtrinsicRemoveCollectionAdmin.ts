import '@unique-nft/types/augment-api'
import { addressToObject } from '../../../utils/addressUtils'

import {ISubmittableResult, ApiPromise, CollectionId} from '../../../types'
import {findEventDataBySectionAndMethod} from '../../extrinsicTools'
import {AbstractExtrinsic, ExtrinsicOptions, ExtrinsicResult, ExtrinsicSendOptions} from '../AbstractExtrinsic'

export interface ExtrinsicRemoveCollectionAdminParams {
  collectionId: CollectionId
  adminAddress: string
}

export interface ExtrinsicRemoveCollectionAdminResult extends ExtrinsicResult {
  isSuccess: boolean
}

export class ExtrinsicRemoveCollectionAdmin extends AbstractExtrinsic<ExtrinsicRemoveCollectionAdminParams, ExtrinsicRemoveCollectionAdminResult> {
  constructor(api: ApiPromise, params: ExtrinsicRemoveCollectionAdminParams, options?: ExtrinsicOptions) {

    const tx = api.tx.unique.removeCollectionAdmin(params.collectionId, addressToObject(params.adminAddress))

    super(api, tx, params)
  }

  protected async processResult(txResult: ISubmittableResult, options: ExtrinsicSendOptions) {
    const result = await this.getBaseResult(txResult, options)

    const data = findEventDataBySectionAndMethod(txResult, 'unique', 'CollectionAdminRemoved')

    const isSuccess = !!data && !isNaN((parseInt(data[0].toString(), 10)))

    return {
      ...result,
      isSuccess,
    }
  }
}
