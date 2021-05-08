import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import './RepoList.css';

import RepoCard from '../components/RepoCard';
import Placeholder from '../components/Placeholder';

import { fetchRepositories, selectRepository } from '../actions';

import orderOptions from '../orderOptions';
import sortOptions from '../sortOptions';

const mapStateToProps = state => ({ repos: state.repos, loading: state.loading });

/**
 * 
 * Renders github repository list page 
 * 
 *  Uses: 
 *  - redux `repos` to sort and render the repo list
 * 
 *  - redux connected action `selectRepository` to fetch first page repos from github api when mounted 
 * 
 *  - redux `loading` to render `Placeholder` components when update for repos in coming 
 * 
 * @param {any} props 
 * @returns {JSX.Element} jsx elemet to render
 */
const RepoList = ({
    /**
     * redux `repos` array to sort and render
     */
    repos,
    /**
     * redux connected fetch repos action 
     */
    fetchRepositories, 
    /**
     * redux connected select repository action 
     */
    selectRepository,
    /**
     * sort option index 
     */
    selectedSort,
    /**
     * order option index
     */
    selectedOder,
    /**
     * redux `loading` state
     */
    loading
}) => {

    useEffect(() => {
        fetchRepositories();
    }, [fetchRepositories]);

    const SortBySelected = (array, sortOptionIndex, orderOptionIndex) => {

        if (sortOptionIndex === undefined || orderOptionIndex === undefined) {
            return array;
        } else if (sortOptionIndex === 0 && orderOptionIndex === 0) {
            return array;
        }

        const sortOption  = sortOptions[sortOptionIndex];
        const orderOption = orderOptions[orderOptionIndex];
        const {value: key} = sortOption;
        const {value: order} = orderOption; 

        const result = [...array];

        result.sort((a, b) => {
            if (a[key] < b[key]) {
                return order ? -1 : 1;
            } else if (a[key] === b[key]) {
                return 0;
            } else {
                return order ? 1 : -1; 
            }
        })

        return result;

    }

    const repoToCard = repo => <RepoCard key={repo.id} repo={repo} onSelect={selectRepository} />;

    if (repos === undefined || (repos && repos.length === 0) || loading) {
        return(
            <React.Fragment>
               <Placeholder />
               <Placeholder />
               <Placeholder />
               <Placeholder />
               <Placeholder />
               <Placeholder />
               <Placeholder />
               <Placeholder />
            </React.Fragment>
        )
    } 

    return (
        <div className="ui comments repo-list">
            
            { repos && repos.length > 0 && 
                SortBySelected(repos, selectedSort, selectedOder).map(repo => repoToCard(repo)) 
            }
        </div>
    )
};

export default connect(mapStateToProps, { fetchRepositories, selectRepository })(RepoList);