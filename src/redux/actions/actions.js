import {
  VIEWS,
  EDIT_PRODUCT,
  DISABLE_PRODUCT,
  ENABLE_PRODUCT,
  DELETE_PRODUCT,
} from '../../utils/constants';

export const changeViews = view => ({
  type: VIEWS,
  payload: !view,
});

export const editProduct = productDetails => ({
  type: EDIT_PRODUCT,
  payload: productDetails,
});

export const disableProduct = productDetails => ({
  type: DISABLE_PRODUCT,
  payload: productDetails,
});

export const enableProduct = productDetails => ({
  type: ENABLE_PRODUCT,
  payload: productDetails,
});

export const deleteProduct = productDetails => ({
  type: DELETE_PRODUCT,
  payload: productDetails,
})


