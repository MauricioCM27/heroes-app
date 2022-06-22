
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import HeroCard from './HeroCard';

const HeroList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]) ;

    return (
        <div className='row rows-cols-1 row-cols-3 g-3 animate__animated animate__fadeIn'>
                {
                    heroes.map(hero => (
                        <HeroCard
                            key={hero.id}
                            {...hero}
                        />
                    ))
                }

        </div>
    )
}

HeroList.propTypes = {
    publisher: PropTypes.string
}

export default HeroList;