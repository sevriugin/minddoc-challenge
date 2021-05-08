import { combineReducers } from 'redux';
import { cloneDeep } from 'lodash'


/**
 * Repos reducer
 * 
 * @param {[any]} repos 
 * @param {any} action 
 * @returns 
 */
const reposReducer = (repos = [], action) => {
    if (action.type === 'FETCH_REPOS') {
        return action.payload.data;

    } else if (action.type === 'TOGGLE_FAVORITE') {
        const id = action.payload; 
        return [...repos].map(item => {
            const repo = cloneDeep(item);
            if (repo.id === id) {
                if (repo.favorite === undefined) {
                    repo.favorite = true;
                } else {
                    repo.favorite = !repo.favorite;
                }
            }
            return repo;
        });
    } else if (action.type === 'SEARCH_REPOS') {
        console.log('reposReducer', action.payload.data.items);

        return action.payload.data.items;
    }

    return repos;
}

/**
 * 
 * Select repo reducer
 * 
 * @param {any} selected 
 * @param {any} action 
 * @returns 
 */
const selectReducer = (selected = null, action) => {
    if (action.type === 'SELECT_REPO') {
        return action.payload;
    } else if (action.type === 'TOGGLE_FAVORITE' && selected) {
        const repo = cloneDeep(selected);
        if (repo.favorite === undefined) {
            repo.favorite = true;
        } else {
            repo.favorite = !repo.favorite;
        }

        return repo;

    } 

    return selected;
}

/**
 * 
 * Pagination reducer
 * 
 * @param {any} pagination 
 * @param {any} action 
 * @returns 
 */
const paginationReducer = (pagination = {}, action) => {
    if (action.type === 'FETCH_REPOS' || action.type === 'SEARCH_REPOS') {
        const {headers: { link: linkString }} = action.payload;
        const repos = action.type === 'SEARCH_REPOS' ? action.payload.data.items : action.payload.data; 
        const [first] = repos;

        let pageMode = false;

        const links = linkString.split(',');
        const paginationArray = links.map(item => item.split(';'));
        const paginationEntries = paginationArray.map(item => {

            const [link, rel] = item;

            const indexSince = link.search('since=');
            const indexType  = rel.search('rel=');
            const indexPage  = link.search('page=');

            let since = 0;
            let page  = 0;
            let type  = undefined;

            if (indexSince >= 0) {
                let numbers = link.substr(indexSince).match(/\d/g);
                since = parseInt(numbers.join(''), 10);

            } else if (indexPage >= 0) {
                let numbers = link.substr(indexPage).match(/\d/g);
                page = parseInt(numbers.join(''), 10);
                pageMode = true;
            }

            if (indexType >= 0) {
                type = rel.trim().substring(indexType + 'rel='.length);
                type = type.substring(0, type.length-1);
            }
            
            return [type, since > 0 ? since : page];
        })

        const newPagination = Object.fromEntries(paginationEntries);

        if (pageMode) {
           newPagination.page = true; 
        }
        
        const {next, history} = pagination;

        const isMovingForward = () => {
            if (newPagination.page) {
                return next && next < newPagination.next;
            } else {
                return next && next <= first.id; 
            }
        };

        const isMovingBack = () => {
            if (newPagination.page) {
                return next && next > newPagination.next;
            } else {
                return next && next > first.id; 
            } 
        }

        if (history) {
            newPagination.history = [...history];
        } else {
            newPagination.history = [];
        }
        
        if (isMovingForward()) {
            newPagination.prev = newPagination.history[newPagination.history.length-1];
            newPagination.history.push(pageMode ? next : first.id-1);

        } else if (isMovingBack()) {

            newPagination.history.pop();

            if (newPagination.history.length > 1) {
                newPagination.prev = newPagination.history[newPagination.history.length-2]; 
            } else {
                newPagination.prev = undefined; 
            }
        }

        console.log(newPagination);

        return newPagination;

    }

    return pagination;
}

/**
 * 
 * Loading state reducer
 * 
 * @param {boolean} loading 
 * @param {any} action 
 * @returns 
 */
const loadingReducer = (loading = false, action) => {
    if (action.type === 'SET_LOADING') {
        return action.payload;
    } else if (action.type === 'FETCH_REPOS' || action.type === 'SEARCH_REPOS') {
        return false;
    } 

    return loading;
};

/**
 * 
 * Search params reducer
 * 
 * @param {any} params 
 * @param {any} action 
 * @returns 
 */
const searchParamsReducer = (params = null, action) => {
    if (action.type === 'SEARCH_REPOS') {
        console.log(action.payload.config.params);

        return action.payload.config.params;
    } else if (action.type === 'CLEAR_SEARCH_TERM') {
        return null;
    }

    return params;
}

export default combineReducers({
    repos: reposReducer,
    selected: selectReducer,
    pagination: paginationReducer,
    loading: loadingReducer,
    params: searchParamsReducer,
});