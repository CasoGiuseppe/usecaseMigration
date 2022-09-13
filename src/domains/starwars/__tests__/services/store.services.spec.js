import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { actuacionesStoreConfig } from '../../partials/store';
import { storeServices } from '../../infrastructure/services/store.services';
import { ACTUACIONES_DECANATO } from '../../partials/constants';
const localVue = createLocalVue();
localVue.use(Vuex);
describe('Services: store modules', () => {
  let $store;
  beforeEach(() => {
    $store = new Vuex.Store({
      modules: {},
    });
  });
  test('getStoreModuleExist: should throw new Error with message: "Store is required" when $store param not exist', async () => {
    expect.assertions(1);
    try {
      await storeServices.getStoreModuleExist({});
    } catch (e) {
      expect(e.message).toBe('Store is required');
    }
  });
  test('getStoreModuleExist: should return false when store module no exist', async () => {
    const response = storeServices.getStoreModuleExist({ $store, moduleName: 'moduleTest' });
    expect(response).toBe(false);
  });
  test('getStoreModuleExist: should return true when store module exist', async () => {
    await $store.registerModule(ACTUACIONES_DECANATO, actuacionesStoreConfig);

    const response = storeServices.getStoreModuleExist({
      $store,
      $moduleName: ACTUACIONES_DECANATO,
    });
    expect(response).toBe(true);
  });
  test('setNewStoreModule: should throw new Error with message: "Store is required" when $store param not exist', async () => {
    expect.assertions(1);
    try {
      await storeServices.setNewStoreModule({});
    } catch (e) {
      expect(e.message).toBe('Store is required');
    }
  });
  test('setNewStoreModule: should store state module has a object match', async () => {
    const response = await storeServices.setNewStoreModule({
      $store,
      $moduleName: ACTUACIONES_DECANATO,
      config: actuacionesStoreConfig,
    });
    expect(response.state[ACTUACIONES_DECANATO]).toMatchObject(actuacionesStoreConfig.state);
  });
  test('unregisterStoreModule: should throw new Error with message: "Store is required" when $store param not exist', async () => {
    expect.assertions(1);
    try {
      await storeServices.unregisterStoreModule({});
    } catch (e) {
      expect(e.message).toBe('Store is required');
    }
  });
  test('unregisterStoreModule: should module removed from store', async () => {
    $store.registerModule(ACTUACIONES_DECANATO, actuacionesStoreConfig);
    await storeServices.unregisterStoreModule({
      $store,
      $moduleName: ACTUACIONES_DECANATO,
    });
    expect($store.state[ACTUACIONES_DECANATO]).toBeUndefined();
  });
  test('handleStoreAction: should set a correct action', async () => {
    $store.registerModule(ACTUACIONES_DECANATO, actuacionesStoreConfig);
    const params = {
      queryByValue: 'mockQueryValue',
      helper: 'mockHelper',
      formNewItem: 'mockFormItem',
    };
    await storeServices.handleStoreAction({
      $store,
      $moduleName: ACTUACIONES_DECANATO,
      $actionName: `changeRootLink`,
      params,
    });
    expect($store.state[ACTUACIONES_DECANATO].root.links).toMatchObject(params);
  });
});
