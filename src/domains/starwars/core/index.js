// DTO endpoints
import { getAPI } from '../infrastructure/repositories/actuaciones.repository';

// services
import storeServices from '@/app/services/store.services';
import notificationServices from '@/app/services/notification.services';

// models interfaces
import { ITableMainColumns, ITableLinks } from './model/ITableList.model';
import { IEmbeddTarget, IDataTarget } from './model/IEmbeddTarget.model';

// use cases
import { getTableListContent } from './usecase/getTableListContent.usecase';
import { setUserNotification } from './usecase/setUserNotification.usecase';

// destructuring services
const { hasError, hasInfo, hasLoader } = notificationServices;
const { handleStoreAction } = storeServices;

export const UseNotifications = setUserNotification({
  onError: hasError,
  onInfo: hasInfo,
  onLoader: hasLoader,
});

const { onErrorMessage, onInfoMessage, onLoaderState } = UseNotifications();

const commonServices = {
  callback: handleStoreAction,
  onError: onErrorMessage,
  onInfo: onInfoMessage,
  onLoader: onLoaderState,
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
    ILinkTargetModel: IDataTarget,
    IEditNewFormModel: ITableLinks,
  },
});
