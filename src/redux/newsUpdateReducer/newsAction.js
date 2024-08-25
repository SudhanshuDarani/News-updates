export const GET_NEWS_DATA = 'GET_NEWS_DATA';
export const ADD_NEWS_DETAIL = 'ADD_NEWS_DETAIL';
export const DELETE_NEWS_DETAIL = 'DELETE_NEWS_DETAIL';
export const getNewsData = (newsData) => ({
    type: GET_NEWS_DATA,
    payload: newsData,
});

export const deleteNewsData = (newsId) =>  ({
    type: DELETE_NEWS_DETAIL,
    payload: newsId
});

export const addNewsData = (newsData) => (dispatch) => {
    try {
        if (newsData !== undefined) {
            dispatch({ type: GET_NEWS_DATA, payload: newsData })
        } else {
            dispatch({ type: GET_NEWS_DATA, payload: newsData })
            return {
                ...newsData
            }
        }
    } catch (error) {
        console.log(error.message)
    }
};