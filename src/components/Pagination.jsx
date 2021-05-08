import React from 'react';
import { connect } from 'react-redux';

import { fetchRepositories, setLoading, searchRepositories} from '../actions';

import './Pagination.css';

const mapStateToProps = state => ({ repos: state.repos, pagination: state.pagination });

/**
 * Functional pagination component.
 *  
 *  Uses: 
 *  - redux store `repos` and `pagination` to render pagination controls.
 * 
 *  - `fetchRepositories` and `setLoading` actions to process pagination events
 * 
 * @param {any} props 
 * @returns {JSX.Element} jsx element to render
 */
const Pagination = ({
    /**
     * GitHub repos array to render
     */
    repos, 
    /**
     * redux store `pagination` object with `next` and `prev` attributes (all numbers)
     */
    pagination, 
    /**
     * redux connected fetching repositories action
     */
    fetchRepositories, 
    /**
     * redux connected set loading action 
     */
    setLoading,
    /**
     * reduct connected search repository action
     */
    searchRepositories
}) => {

    const fetch = (move) => {

        setLoading(true);

        if (pagination.page) {
            searchRepositories(null, move);
        } else {
            fetchRepositories(move); 
        }
    }

    const { page } =  pagination;

    const next = () => fetch(pagination.next);
    const prev = () => fetch(pagination.prev);
    

    const firstID = repos !== undefined && repos.length > 0 ? repos[0].id : '--';
    const lastID  = repos !== undefined && repos.length > 0 ? repos[repos.length - 1].id : '--'

    return (
        <div className="ui bottom fixed text menu pagination">
            <div onClick={prev} className="item pagination-control">
                Prev
            </div>
            <div className="header item"> &nbsp;&nbsp;|</div>
            <div onClick={next} className="item pagination-control">
                Next
            </div>
            <div className="right menu pagination-info">
                {page ?
                    <div className="header item">Page</div> 
                    :
                    <div className="header item">IDs</div>
                }
                {page ? 
                    <div className="item">[ {`${pagination.next-1} / ${pagination.last}`} ]</div>
                    :
                    <div className="item">[ {`${firstID}:${lastID}`} ]</div>
                }
            </div>
        </div>
    );


}

export default connect (mapStateToProps, {fetchRepositories, setLoading, searchRepositories})(Pagination);