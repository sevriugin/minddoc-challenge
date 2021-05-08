import React, {useState} from 'react';

import './TopMenu.css';

import orderOptions from '../orderOptions';
import sortOptions from '../sortOptions';

/**
 * 
 * Renders top menu with sort options, order options and search input
 * 
 * @param {any} props 
 * @returns {JSX.Element} jsx element to render
 */
const TopMenu = ({
    /**
     * selected order option index [0..orderOptions.length)
     */
    selectedOrder,
    /**
     * selected sort option index [0..sortOptions.lenght)
     */
    selectedSort,
    /**
     * search term
     */
    searchTerm, 
    /**
     * on select order option callback: (index: number) => void
     */
    onSelectedOrder, 
    /**
     * on select sort option callback: (index: number) => void
     */
    onSelectedSort,
    /**
     * on change serach term callback: (term: string) => void
     */
    onChangeSearchTerm,
    /**
     * on start search
     */
    onSeachClick,
    /**
     * on search cancle
     */
    onSearchCancel
}) => {

    const [searching, setSearching] = useState(false);

    const startSearch = () => {

        if (searchTerm === '') {
            return;
        }
        
        setSearching(true);
        onSeachClick(); 
    };

    const cancelSearch = () => {
        setSearching(false);
        onSearchCancel(); 
    }

    const optionToItemMap = (option, index, selected, onClick) => <div onClick={() => onClick(index)} className={selected === index ? "item active top-menu-item" : "item top-menu-item"} key={option.id}>{option.title}</div>; 

    return (
        <div className="ui top fixed text menu top-menu">

            <div className="header item">Sort By</div>

            {sortOptions.map((option, index) => optionToItemMap(option, index, selectedSort, onSelectedSort))}
        
            <div className="right menu">
                <div className="header item">Order</div>
                    {orderOptions.map((option, index) => optionToItemMap(option, index, selectedOrder, onSelectedOrder))}
                        
                    <div className="header item">|</div>

                    <div className="ui right aligned category search item">
                        <div className="ui transparent icon input">
                        <input value={searchTerm} className="prompt" type="text" placeholder="Search github..." onChange={(e) => onChangeSearchTerm(e.target.value)}/>
                        { searching ? 
                            <i onClick={cancelSearch} className="close link icon"></i> 
                            : 
                            <i onClick={startSearch} className="search link icon"></i>}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TopMenu;