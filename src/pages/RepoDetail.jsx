import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import github from '../apis/github';

import Placeholder from '../components/Placeholder';
import RepoDetailCard from '../components/RepoDetailCard';

import './RepoDetail.css'

const mapDispatchToProps = state => ({ selected: state.selected })

/**
 * 
 * Renders repo detail page 
 * 
 * Uses: 
 *  - redux `selected` to fetch repo detail object from github api
 * 
 *  - `RepoDetailCard` component to renders the actual detail object 
 * 
 * @param {any} props 
 * @returns {JSX.Element}
 */
const RepoDetail = ({selected}) => {

    const [repo, setRepo] = useState(null);

    useEffect(() => {

        if (!selected) {
            return;
        }

        const getRepoDetail = async () => {
            const response = await github.get(`/repos/${selected.owner.login}/${selected.name}`);
        
            console.log(response);
            setRepo(response.data);
        };

        getRepoDetail();

    }, [selected])

    if (selected === null) {
        return <h3>Please select perository to see details</h3>;
    }

    if (repo === null) {
        return <Placeholder />;
    }

    return <RepoDetailCard repo={repo} />;
};

export default connect(mapDispatchToProps)(RepoDetail);