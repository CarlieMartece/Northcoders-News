export default function Votes (props) {

    return (
        <div className="article__votes">
            <h4>Votes: {props.votes}</h4>
            <p>UpVote / DownVote</p>
        </div>
    )

}