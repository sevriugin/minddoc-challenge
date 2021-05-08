import github from '../apis/github';

/**
 * Fetching repositories from GitHub
 * 
 * @param {number} since - pagination parameter 
 * @returns {(dispatch) => void} async function for thunk middleware 
 */
export const fetchRepositories = (since) => async dispatch => {
    try {

        const response = await github.get('/repositories', since && {
            params: { since }
        });

        console.log(response);

        dispatch({
            type: 'FETCH_REPOS',
            payload: response
        })

    } catch (err) {
        console.error(err.message)
    }
};

/**
 * 
 * Search GitHub repositories
 * 
 * @param {string?} term search term
 * @param {number?} page page number 
 * @returns {(dispatch) => void} async function for thunk middleware  
 */
export const searchRepositories = (term, page) => async (dispatch, getState) => {
    try {

        let { params } = getState();

        if (params && !term) {
            if (page) {
                params.page = page;
            } else {
                params.page = undefined;
            }
        } else {
            params = {
                q: `${term} in:name` 
            }
        }

        const response = await github.get('/search/repositories', { params });

        console.log(response);

        dispatch({
            type: 'SEARCH_REPOS',
            payload: response
        })

    } catch (err) {
        console.error(err.message) 
    }
} 

/**
 * Select repository
 * 
 * @param {any} repo repository to be selected 
 * @returns {any} action with `repo` as `payload`
 */
export const selectRepository = repo => ({
    type: 'SELECT_REPO',
    payload: repo
});

/**
 * Toggle fovority repository property
 * @param {number} id repository id to change
 * @returns {any} action with `id` as `payload` 
 */
export const toggleFavorite = id => ({
    type: 'TOGGLE_FAVORITE',
    payload: id
});

/**
 * Set loading - indicate loading action for peros download process
 * 
 * @param {boolean} loading 
 * @returns {any} actions with `loading` as `payload`
 */
export const setLoading = loading => ({
    type: 'SET_LOADING',
    payload: loading
})

/**
 * Clear search term
 * 
 * @returns {any} action with type and no payload
 */
export const clearSearchTerm = () => ({
    type: 'CLEAR_SEARCH_TERM',
})