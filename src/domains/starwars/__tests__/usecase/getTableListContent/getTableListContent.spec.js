import { describe, beforeEach, test, expect } from 'vitest';
import { mockBaseFn, mockThrwoErrorNoFn, MockModel } from './index';

import { ACTUACIONES_DECANATO } from '../../../partials/constants';
describe('Usecase: getTableListContent', () => {
  let $store;
  let $notify;
  let errorMessage = 'this is an error';
  const handler = {
    set: function (target, prop, value) {
      // eslint-disable-next-line no-param-reassign
      return Reflect.set(target, prop, value);
    },
  };
  beforeEach(() => {
    $store = new Proxy({ module: { actuaciones: { state: {} } } }, handler);
    $notify = new Proxy({ message: null }, handler);
  });

  test('should throw new Error with message: "UseCase > getTableListContent > check that all required params exist" when are missing required params', async () => {
    expect.assertions(2);
    try {
      await mockBaseFn({});
    } catch (e) {
      expect(typeof e).toBe('object');
      expect(e.message).toBe(
        'UseCase > getTableListContent > check that all required params exist'
      );
    }
  });

  test('should throw new Error with message: "UseCase > getTableListContent > repositoryServices get is not a function" when repositoryServices is not a function', async () => {
    expect.assertions(2);
    try {
      await mockThrwoErrorNoFn({
        url: 'http://mock_url',
        params: {
          value: 'param',
        },
      });
    } catch (e) {
      expect(typeof e).toBe('object');
      expect(e.message).toBe(
        'UseCase > getTableListContent > repositoryServices get is not a function'
      );
    }
  });

  test('should store correct endpoint values that have length > 0', async () => {
    const model = new MockModel({ param: 'value' });
    await mockBaseFn({
      url: 'http://mock_url',
      $store,
      $moduleName: ACTUACIONES_DECANATO,
      $actionName: { tableContent: 'null' },
    });

    expect(Object.keys($store.module[ACTUACIONES_DECANATO].state)).toHaveLength(
      Object.keys(model).length
    );
    expect($store.module[ACTUACIONES_DECANATO].state).toMatchObject([model]);
    expect(
      $store.module[ACTUACIONES_DECANATO].state.length
    ).toBeGreaterThanOrEqual(1);
  });

  test('should notify error on endpoit fail', async () => {
    expect.assertions(1);
    try {
      await mockBaseFn({
        url: 'http://mock_throw_error',
        params: {
          param: 'value',
        },
        onErrorState: {
          $notify,
          message: errorMessage,
        },
        $store,
      });
    } catch (e) {
      expect($notify.message).toBe(errorMessage);
    }
  });

  test('should notify info on endpoint no data response and save a void array in store', async () => {
    await mockBaseFn({
      url: 'http://noData.response',
      params: {
        param: '',
      },
      onInfoState: {
        $notify,
        message: errorMessage,
      },
      $store,
      $moduleName: ACTUACIONES_DECANATO,
      $actionName: { tableContent: 'null' },
    });

    expect($notify.message).toBe(errorMessage);
    expect(Object.keys($store.module[ACTUACIONES_DECANATO].state)).toHaveLength(
      0
    );
    expect($store.module[ACTUACIONES_DECANATO].state).toMatchObject([]);
  });
});
