export default function SortBar () {

    return (
        <nav className="nav-sort">
            <form action={'/articles'}>
                <li>
                    <label htmlFor="sort_by">Sort Topics: </label>
                    <select
                        id="sort_by"
                        name="sort_by"
                    >
                    <option className="nav-selector" value="created_at">Date</option>
                    <option className="nav-selector" value="title">Title</option>
                    <option className="nav-selector" value="topic">Topic</option>
                    <option className="nav-selector" value="author">Author</option>
                    <option className="nav-selector" value="votes">Votes</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="order_by">Order: </label>
                    <select
                        id="order_by"
                        name="order_by"
                    >
                    <option default className="nav-selector" value="DESC">Descending</option>
                    <option className="nav-selector" value="ASC">Ascending</option>
                    </select>
                </li>
                <li>
                    <input type="submit" value="Sort"></input>
                </li>
            </form>
        </nav>
    )

}