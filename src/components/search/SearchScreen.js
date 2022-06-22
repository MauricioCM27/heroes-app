
import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import HeroCard from '../hero/HeroCard';

const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const [{ searchText }, handleInputChange] = useForm({
        searchText: q
    });

    const heroesFilter = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchText.trim().length <= 0) {
            return;
        }

        navigate(`?q=${searchText}`);
    }

    return (
        <>
            <h1>
                Search Screen
            </h1>
            <hr />
            <div className='row'>

                <div className='col-5'>

                    <h4>Search</h4>
                    <hr />

                    <form onSubmit={handleSearch}>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Search'
                            name='searchText'
                            autoComplete='off'
                            value={searchText}
                            onChange={handleInputChange}
                        />

                        <div className='d-grid gap-2'>
                            <button
                                type='submit'
                                className='btn btn-outline-primary mt-1'
                            >
                                Search...
                            </button>
                        </div>


                    </form>

                </div>

                <div className='col-7'>

                    <h4>
                        Results
                    </h4>
                    <hr />

                    {
                        (q === '') ?
                            <div className='alert alert-info animate__animated animate__fadeIn'>Search for a hero</div>
                            : (heroesFilter.length === 0) && <div className='alert alert-danger animate__animated animate__fadeIn'>No results: {q} </div>
                    }

                    {
                        heroesFilter.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }

                </div>

            </div>
        </>
    )
}

export default SearchScreen