import { useState } from "react";

export default function NavBar () {


    const [topicValue, setTopicValue] = useState('');
    const [action, setAction] = useState('/articles');


    const handleTopicChange = (event) => {
        setTopicValue(event.target.value);
    }

    const topicArray = ["all", "coding", "cooking", "football"]
    const handleSubmit = (event) => {
        if (topicArray.indexOf(topicValue) === -1) {
            event.preventDefault();
        } else if (topicValue === "all") {
            setAction("/");
        } else {
            setAction("/articles");
        }
    }

    return (
        <nav className="nav-topics">
            <form onSubmit={(event) => {handleSubmit(event)}} action={action}>
                <label htmlFor="topic"><h2>Topics:</h2></label>
                <select
                    id="topic"
                    name="topic"
                    onChange={(event) => {handleTopicChange(event)}}
                >
                <option default value="">--Select--</option>
                <option className="nav-topics-selector" value="all">All</option>
                <option className="nav-topics-selector" value="coding">Coding</option>
                <option className="nav-topics-selector" value="cooking">Cooking</option>
                <option className="nav-topics-selector" value="football">Football</option>
                </select>
                <input type="submit" value="Get Articles"></input>
            </form>
        </nav>
    )

}