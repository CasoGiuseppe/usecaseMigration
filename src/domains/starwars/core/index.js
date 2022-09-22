// DTO endpoints
import { getAPI } from '../infrastructure/repositories/actuaciones.repository';

// services
import storeServices from '@/app/services/store.services';
import notificationServices from '@/app/services/notification.services';

// models interfaces
import { ITableMainColumns } from './model/ITableList.model';
import { IEmbeddTarget } from './model/IEmbeddTarget.model';

// use cases
import { getTableListContent } from './usecase/getTableListContent.usecase';

// destructuring services
const { hasError, hasInfo } = notificationServices;
const { handleStoreAction } = storeServices;

const commonServices = {
  callback: handleStoreAction,
  onError: hasError,
  onInfo: hasInfo,
};

const commonApi = {
  get: getAPI,
};

export const UseGetTableContent = getTableListContent({
  repositoryServices: commonApi,
  thirdPartServices: commonServices,
  modelCollection: {
    IEmbeddTargetModel: IEmbeddTarget,
    ITableColumns: ITableMainColumns,
    ILinkTargetModel: IEmbeddTarget,
    IEditNewFormModel: ITableMainColumns,
  },
});
