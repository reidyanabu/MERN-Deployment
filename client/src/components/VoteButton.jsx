import axios from "axios";

const VoteButton = props => {

    const { voteAction, authorId, quoteId, votes } = props;

    const handleVoteClick = () => {
        
        let currentVoteCount = votes;
        let url = `http://localhost:8000/api/quotes/${authorId}`;
        if (voteAction === 'Up') {
            currentVoteCount += 1;
        } else if (voteAction === 'Down') {
            currentVoteCount -= 1;
        }
        axios.put(url, {
                'quote_id': quoteId,
                'votes': currentVoteCount
            })
            .catch(e=>console.log(e));
    }

    return (
        <>
        <button className={'btn btn-info'} onClick={ handleVoteClick }>Vote {voteAction}</button>
        </>
    );
}
export default VoteButton;