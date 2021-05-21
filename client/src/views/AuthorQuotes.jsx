import { Link, navigate } from '@reach/router';
import DeleteButton from '../components/DeleteButton';
import VoteButton from '../components/VoteButton';
import {MDBTable, MDBTableHead, MDBTableBody} from 'mdbreact';
import axios from 'axios';
import { useState, useEffect } from 'react';

const AuthorQuotes = props => {

    const [author,setAuthor] = useState();
    const [quotes,setQuotes] = useState([]);
    const [authorName, setAuthorName] = useState('');

    const { author_id } = props;

    useEffect( () => {
        getAuthor();
    }, [author]);

    const getAuthor = () => {

        let url = `http://localhost:8000/api/quotes/author/${author_id}`;
        axios.get(url)
            .then( response=> {
                setAuthor(response.data);
                setQuotes(response.data.quotes);
                setAuthorName(response.data.author_name);
        })
        .catch(e=>console.log(e)); 
    }

    const removeFromDom = idToRemove => {
        setQuotes(quotes.filter(quote => quote._id !== idToRemove));
    }

    return (
    <div className="authorsListing">
        <div className="authorsListing">
        <p><Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to={`/quotes/${author_id}/new`}>Add A Quote</Link></p>
        <p><h2>Quotes by {authorName}</h2></p>
        <MDBTable hover bordered className="authorsListing">
                <MDBTableHead color="primary-color">
                    <tr>
                        <th class="tablePadding tableHeader"><b>Quote</b></th>
                        <th class="tablePadding tableHeader"><b>Votes</b></th>
                        <th class="tablePadding tableHeader"><b>Actions Available</b></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                { (quotes).map( (quote => (
                    <tr class="tablePadding">
                        <td class="tablePadding vAlign">'{quote.quote}'</td>
                        <td class="tablePadding vAlign">{quote.votes}</td>
                        <td class="tablePadding">
                            <VoteButton voteAction={'Up'}   authorId={author._id} quoteId={quote._id} votes={quote.votes}/>
                            <VoteButton voteAction={'Down'} authorId={author._id} quoteId={quote._id} votes={quote.votes}/>
                            <DeleteButton authorId={author._id} quoteId={quote._id} whatToDelete={'Quote'} callback={()=>removeFromDom(quote._id)}/>
                        </td>
                    </tr>
                )))}
                </MDBTableBody>
            </MDBTable>
        </div>
    </div>
    );
}
export default AuthorQuotes;