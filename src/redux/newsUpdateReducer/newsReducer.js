import { GET_NEWS_DATA, DELETE_NEWS_DETAIL, ADD_NEWS_DETAIL } from "./newsAction";
const initialState = {
    isLoading: false,
    isError: false,
    newsDataList: []
};
export const reducer = (state = initialState, { type, payload }) => {
    try {
        if (state.newsDataList !== undefined && type === GET_NEWS_DATA) {
            return {
                ...state,
                newsDataList: payload,
                isLoading: false,
                isError: false
            }
        } else if (state.newsDataList !== undefined && type === ADD_NEWS_DETAIL) {
            return {
                ...state,
                newsDataList: [...state.newsDataList, payload]
            }
        } else if (state.newsDataList !== undefined && type === DELETE_NEWS_DETAIL) {
            return {
                ...state,
                newsDataList: state.newsDataList.filter(item => item.productId !== payload)
            }
        } else {
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        }
    } catch (err) {
        console.log(err.message)
    }
};