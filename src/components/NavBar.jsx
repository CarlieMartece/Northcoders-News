import { Link } from "react-router-dom";

export default function NavBar () {
    
    const navOptions =  [
        ['/', 'all', 'All Articles'],
        ['/articles/topics/coding', 'coding', 'Coding'],
        ['/articles/topics/football', 'football', 'Football'],
        ['/articles/topics/cooking', 'cooking', 'Cooking'],
    ]

    return (
        <nav className="nav-topics">
            <h3>Browse Topics: </h3>
            {navOptions.map((option) => {
                return (
                    <Link className="nav__link" to={option[0]} key={option[1]}>
                        {option[2]}
                    </Link>
                ) 
            })}
        </nav>
    )

}