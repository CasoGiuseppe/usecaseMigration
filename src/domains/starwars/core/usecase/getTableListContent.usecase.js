/**
 * launch endoint to get actiaciones info
 * @param {function} get - repository method to get endpoint
 * @param {function} callback - method to launch on get endpont response
 * @param {function} onError - error notification
 * @param {function} onInfo - info notification
 * @param {object} modelCollection - collection of class models
 * @param {string} url - endpoint url
 * @param {object} onErrorState - params to pass to error notification
 * @param {object} onInfoState - params to pass to info notification
 * @param {array} args - all params that usecase use to work well
 * @returns {void}
 */
export const getTableListContent =
  ({
    repositoryServices: { get },
    thirdPartServices: { callback, onError, onInfo } = {},
    modelCollection: { IEmbeddTargetModel, ITableColumns },
  }) =>
  async ({ url, onErrorState, onInfoState, ...args }) => {
    // 0. handle errors
    // 0.1 check if all reuired params exist
    const requiredFail = [url !== undefined].some((key) => key === false);
    if (requiredFail)
      throw new Error(
        'UseCase > getTableListContent > check that all required params exist'
      );

    // 0.2 check if repositoryServices get is a funcion
    if (typeof get !== 'function')
      throw new Error(
        'UseCase > getTableListContent > repositoryServices get is not a function'
      );

    // 0.3 check if IEmbeddTargetModel and ITableColumns models are a class
    const requiredClass = [
      IEmbeddTargetModel.prototype,
      ITableColumns.prototype,
    ];
    if (requiredClass.some((node) => node === undefined))
      throw new Error(
        'UseCase > getTableListContent > All models should be a class'
      );

    try {
      // 1. launch table endpoint
      const targetObjectResponse = await new IEmbeddTargetModel(await get(url));

      // 1.1 parse response and return table model
      const parsedTableColumns = targetObjectResponse.map((node) => {
        return new ITableColumns(node);
      });

      // 1.2 check if array is empty to send info notificatio
      if (parsedTableColumns.length === 0) onInfo ? onInfo(onInfoState) : null;

      // 2 write data in store
      callback({
        ...args,
        params: parsedTableColumns,
      });
    } catch ({ message }) {
      // 2. notify error to user
      onError ? onError(onErrorState || { message }) : null;
      throw new Error(message);
    }
  };