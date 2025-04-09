import '../styles/css/SearchBar.css'
import { useState } from 'react'

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("")

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    const clearInput = () => {
        setSearchValue("")
    }

    return (
        <div className="search-bar">
            <p>SEARCH</p>
            <div className='input-wrapper'>
                <input 
                    className="input"
                    value={searchValue}
                    onChange={handleChange}
                />
                {searchValue && (
                    <img
                        src="/assets/button/btn_x.svg"
                        alt="x-button"
                        className="x-button"
                        onClick={clearInput}
                    />
                )}
                <img
                    src="/assets/size=24, type=search.svg"
                    alt="Search"
                    className="search-button"
                />
            </div>
        </div>
    )
}

export default SearchBar