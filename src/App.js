import React, {useState} from 'react';
import { connect } from 'react-redux';

import './App.css';

import { fetchRepositories, searchRepositories, setLoading } from './actions';

import RepoList from './pages/RepoList';
import RepoDetail from './pages/RepoDetail';
import TopMenu from './components/TopMenu';
import Pagination from './components/Pagination';

/**
 * Renders one page application
 * 
 * Uses: 
 * 
 *  - `TopMenu` component to present sort, order and serach options 
 * 
 *  - `RepoList` page to render repo list
 * 
 *  - `RepoDetail` page to render selected repo details
 * 
 *  - `Pagination` component to present pagination options
 * 
 *  - `fetchRepositories` action to fetch repos when search term was cleared
 * 
 *  - `searchRepositories` action to seach repos for given serach term 
 * 
 * @returns {JSX.Element} jsx element to render
 */
const App = ({
    fetchRepositories, 
    searchRepositories, 
    setLoading
}) => {
    const [selectedSort, setSelectedSort] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const search = () => {
        if (searchTerm === '') {
            console.log('nothing to search');
            return;
        }

        console.log('Search...', searchTerm);

        setLoading(true);
        searchRepositories(searchTerm);

    }

    const cancelSearch = () => {
        console.log('Cancel search!');
        setSearchTerm('');

        setLoading(true);
        fetchRepositories(); 
    }

    return (
        <React.Fragment>
            <TopMenu 
                selectedOrder={selectedOrder} 
                selectedSort={selectedSort}
                searchTerm={searchTerm}
                onSelectedOrder={setSelectedOrder}
                onSelectedSort={setSelectedSort}
                onChangeSearchTerm={setSearchTerm}
                onSeachClick={search}
                onSearchCancel={cancelSearch}
            />
        
            <div className="ui container grid app-container">
                <div className="ui row">
                    <div className="column eight wide">
                        <RepoList selectedSort={selectedSort} selectedOder={selectedOrder}/>
                    </div>
                    <div className="column eight wide app-repo-detail">
                        <RepoDetail />
                    </div>
                </div>            
            </div>

            <Pagination />
            
        </React.Fragment>
        
    );
};

export default connect(null, { fetchRepositories, searchRepositories, setLoading })(App);