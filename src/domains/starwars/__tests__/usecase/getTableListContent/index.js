/* eslint-disable no-param-reassign */
import { getTableListContent } from '../../../core/usecase/getTableListContent.usecase';
// interface mock
class MockTarget {
  constructor(params) {
    return params.data;
  }
}
export class MockModel {
  constructor(params) {
    return params.param ? (this.param = { param: params.param }) : [];
  }
}

export class MockLink {
  constructor(params) {
    return new MockTarget(params)?.links;
  }
}

// endpoint response mock
const mockPageResource = url => {
  const responseCases = {
    'http://mock_url': { data: [{ param: 'value' }] },
    'http://noData.response': { data: [] },
    'http://mock_throw_error': () => {
      throw new Error();
    },
  };
  return responseCases[url];
};

// services mock
const mockSetAction = ({ $store, $moduleName, params }) => {
  // console.log($store, $moduleName, params);
  $store.module[$moduleName].state = params;
};

const mockHasNotification = ({ $notify, message }) => {
  $notify.message = message;
};

const mockeServices = {
  callback: mockSetAction,
  onError: mockHasNotification,
  onInfo: mockHasNotification,
};

export const mockBaseFn = getTableListContent({
  repositoryServices: {
    get: mockPageResource,
  },
  thirdPartServices: mockeServices,
  modelCollection: {
    IEmbeddTargetModel: MockTarget,
    ITableColumns: MockModel,
    ILinkTargetModel: MockLink,
    IEditNewFormModel: MockModel,
  },
});

export const mockThrwoErrorNoFn = getTableListContent({
  repositoryServices: { get: null },
  modelCollection: {},
});
