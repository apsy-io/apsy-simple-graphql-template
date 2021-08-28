import { mutate } from "swr";
import produce from "immer";
import { CommonResponse } from "src/@types/graphql.type";

type BaseUpdateModel = { id?: number };
type BaseArrayModal<T extends string> = CommonResponse<T, Array<any>>;
type BaseObjectModal<T extends string> = CommonResponse<T, any>;

export function useOptimistic() {
  function addArrayOptimistic<T extends BaseUpdateModel>(
    newItem: T,
    swrKey?: string,
    fieldKey?: string
  ) {
    if (!swrKey) return;
    const key = fieldKey || swrKey;
    mutate(
      swrKey,
      (currentState: BaseArrayModal<typeof key>) => {
        return currentState
          ? produce(currentState, (draftState) => {
              draftState[key].result.push(newItem);
            })
          : currentState;
      },
      false
    );
    return newItem;
  }

  function addMultipleArrayOptimistic<T extends BaseUpdateModel>(
    newItems: Array<T>,
    swrKey?: string,
    fieldKey?: string
  ) {
    if (!swrKey) return;
    const key = fieldKey || swrKey;
    mutate(
      swrKey,
      (currentState: BaseArrayModal<typeof key>) => {
        return currentState
          ? produce(currentState, (draftState) => {
              draftState[key].result.push(...newItems);
            })
          : currentState;
      },
      false
    );
    return newItems;
  }

  function updateArrayOptimistic<T extends BaseUpdateModel>(
    updateItem: T,
    swrKey?: string,
    fieldKey?: string
  ) {
    if (!swrKey) return;
    const key = fieldKey || swrKey;
    let editedItem;
    mutate(
      swrKey,
      (currentState: BaseArrayModal<typeof key>) => {
        return currentState
          ? produce(currentState, (draftState) => {
              const result = draftState[key].result;
              const index = result.findIndex((l) => l.id === updateItem.id);
              if (index !== -1) {
                editedItem = result[index];
                result.splice(index, 1, {
                  ...editedItem,
                  ...updateItem,
                });
              }
            })
          : currentState;
      },
      false
    );
    return editedItem;
  }

  function updateObjectOptimistic<T extends BaseUpdateModel>(
    updateFields: T,
    swrKey?: string,
    fieldKey?: string
  ) {
    if (!swrKey) return;
    const key = fieldKey || swrKey;
    let editedItem;
    mutate(
      swrKey,
      (currentState: BaseObjectModal<typeof key>) => {
        return currentState
          ? produce(currentState, (draftState) => {
              editedItem = draftState[key].result;
              draftState[key].result = {
                ...draftState[key].result,
                ...updateFields,
              };
            })
          : currentState;
      },

      false
    );
    return editedItem;
  }

  function deleteArrayOptimistic(
    id: number,
    swrKey?: string,
    fieldKey?: string
  ) {
    if (!swrKey) return;
    const key = fieldKey || swrKey;
    let deletedItem;
    mutate(
      swrKey,
      (currentState: BaseArrayModal<typeof key>) => {
        return currentState
          ? produce(currentState, (draftState) => {
              const result = draftState[key].result;
              const index = result.findIndex((l) => l.id === id);
              if (index !== -1) {
                deletedItem = result[index];
                result.splice(index, 1);
              }
            })
          : currentState;
      },
      false
    );
    return deletedItem;
  }

  return {
    addArrayOptimistic,
    addMultipleArrayOptimistic,
    deleteArrayOptimistic,
    updateArrayOptimistic,
    updateObjectOptimistic,
  };
}
