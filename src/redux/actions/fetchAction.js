import {
  FETCH_INITIAL_DATA_REQUEST,
  FETCH_INITIAL_DATA_SUCCESS,
  FETCH_INITIAL_DATA_FAILURE,
} from '../../utils/constants';

export const fetchInitialData = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_INITIAL_DATA_REQUEST });

    try {
      // Perform asynchronous operation (e.g., fetch data)
      const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
      const data = await response.json();

      // Dispatch success action with fetched data
      dispatch({
        type: FETCH_INITIAL_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // Dispatch failure action if request fails
      dispatch({
        type: FETCH_INITIAL_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};
