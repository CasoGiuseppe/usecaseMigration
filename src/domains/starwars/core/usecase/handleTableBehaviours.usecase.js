/**
 * set table dropdown behaviours
 * @param {function} get - repository method to get enbdpoint
 * @param {function} callback - method to launch on get endpont response
 * @param {function} onError - error notification
 * @param {class} model - data model
 * @param {string} url - endpoint url
 * @param {string} code - code model selected
 * @param {object} attach - dropdown content object structure
 * @param {object} onErrorState - params to pass to error notification
 * @param {array} args - all params that usecase use to work well
 * @returns {void}
 */
export const handleTableBehaviours =
  ({
    repositoryServices: { get },
    thirdPartServices: { callback, onError },
    model = {},
  }) =>
  () => {
    // 0. handle errors
    // 0.1 check if repositoryServices get is a funcion
    if (typeof get !== 'function')
      throw new Error(
        'UseCase > handleTableBehaviours > repositoryServices get is not a function'
      );

    // 0.2 check if model is a class
    if (!model.prototype)
      throw new Error(
        'UseCase > handleTableBehaviours > model should be a class'
      );

    // USECASE: handle table dropdown open/close
    const handleDropDownBehaviour = async ({ code, ...args }) => {
      // 0. handle errors
      // 0.1 check if all reuired params exist
      const requiredFail = [code !== undefined].some((key) => key === false);
      if (requiredFail)
        throw new Error(
          'UseCase > handleTableBehaviours > check that all required params exist'
        );

      callback({
        ...args,
        params: { code },
      });
    };

    // USECASE: handle table dropdown load content
    const handleLoadContent = async ({ url, onErrorState }) => {
      // 0. handle errors
      // 0.1 check if all required params exist
      const requiredFail = [url !== undefined].some((key) => key === false);
      if (requiredFail)
        throw new Error(
          'UseCase > handleTableBehaviours > check that all required params exist'
        );

      try {
        // 1. launch query to get document content structure
        const document = await get(url);
        return new model(document);
      } catch ({ message }) {
        // 2. notify error to user
        onError ? onError(onErrorState || { message }) : null;
        throw new Error(message);
      }
    };

    // USECASE: attach table dropdown content
    const handleAttachContent = async ({ code, attach, ...args }) => {
      // 0. handle errors
      // 0.1 check if all reuired params exist
      const requiredFail = [code !== undefined, attach !== undefined].some(
        (key) => key === false
      );
      if (requiredFail)
        throw new Error(
          'UseCase > handleTableBehaviours > check that all required params exist'
        );

      callback({
        ...args,
        params: { code, attach },
      });
    };

    return {
      handleDropDownBehaviour,
      handleLoadContent,
      handleAttachContent,
    };
  };
