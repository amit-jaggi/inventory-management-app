import {
    FETCH_INITIAL_DATA_REQUEST,
    FETCH_INITIAL_DATA_SUCCESS,
    FETCH_INITIAL_DATA_FAILURE,
    EDIT_PRODUCT,
    DISABLE_PRODUCT,
    ENABLE_PRODUCT,
    DELETE_PRODUCT,
} from '../../utils/constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const reducer = (state = initialState, { type, payload }) => {
    // console.log('state >', state);
    // console.log('payload >', payload);
    switch (type) {
        case FETCH_INITIAL_DATA_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_INITIAL_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload.map((el, index) => ({
                    id: index + 1,
                    name: el.name,
                    category: el.category,
                    price: el.price.includes('$')
                        ? Number(el.price.split('$')[1])
                        : Number(el.price),
                    quantity: el.quantity,
                    value: el.value.includes('$')
                        ? Number(el.value.split('$')[1])
                        : Number(el.value),
                    isDisable: false
                })),
                error: null
            };
        case FETCH_INITIAL_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case EDIT_PRODUCT:
            return {
                ...state,
                data: state.data.map(
                    (el) => el.id === payload.id
                        ? ({
                            ...el,
                            id: payload.id,
                            category: payload.category,
                            isDisable: payload.isDisable,
                            name: payload.name,
                            price: payload.price,
                            quantity: payload.quantity,
                            value: payload.value,
                        }) : el
                )
            }
        case DISABLE_PRODUCT:
            return {
                ...state,
                data: state.data.map((el) => el.id === payload ? ({ ...el, isDisable: true }) : el)
            }
        case ENABLE_PRODUCT:
            return {
                ...state,
                data: state.data.map((el) => el.id === payload ? ({ ...el, isDisable: false }) : el)
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                data: state.data.filter((el) => el.id !== payload)
            }
        default:
            return state;
    }
};

export default reducer;
