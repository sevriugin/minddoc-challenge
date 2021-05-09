import { paginationReducer } from './index';

describe('Pagination reducer test', () => {
    it('repos fetch pagination', () => {
        const action = {
            type: 'FETCH_REPOS',
            payload: {
                headers: {
                    link: "<https://api.github.com/repositories?since=369>; rel=\"next\", <https://api.github.com/repositories{?since}>; rel=\"first\""
                },
                data: [
                    {id: 1}
                ]
            }
        };

        const pagination = paginationReducer({}, action); 
        
        expect(pagination.next).toBe(369);
    });

    it('repos search pagination', () => {
        const action = {
            type: 'SEARCH_REPOS',
            payload: {
                headers: {
                    link: "<https://api.github.com/search/repositories?q=core+in%3Aname&page=2>; rel=\"next\", <https://api.github.com/search/repositories?q=core+in%3Aname&page=34>; rel=\"last\""
                },
                data: {
                    items: [
                        {id: 1}
                    ]}
            }
        };

        const pagination = paginationReducer({}, action); 
        
        expect(pagination.next).toBe(2);
    });


});