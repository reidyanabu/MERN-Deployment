import { Link } from '@reach/router';
import DeleteButton from '../components/DeleteButton';
import {MDBTable, MDBTableHead, MDBTableBody} from 'mdbreact';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Authors = () => {

    const [authors,setAuthors] = useState([]);

    const getAuthors = () => {

        let url = `http://localhost:8000/api/quotes/author`;
        axios.get(url)
        .then( response=> {
            setAuthors(response.data);
        })
        .catch(e=>console.log(e));
    }

    useEffect( () => {
        getAuthors();
    }, [authors]);

    const removeFromDom = idToRemove => {
        setAuthors(authors.filter(author => author._id !== idToRemove));
    }

    return (
    <div className="authorsListing">
        <p><Link to="/new">Add a Quotable Author</Link></p>
        <p><h2>We have quotes by:</h2></p>
        <div className="authorsListing">
            <MDBTable hover bordered className="authorsListing">
                <MDBTableHead color="primary-color">
                    <tr>
                        <th class="tablePadding tableHeader"><b>Author</b></th>
                        <th class="tablePadding tableHeader"><b>Actions Available</b></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                { (authors).map( (author => (
                    <tr class="tablePadding">
                        <td class="tablePadding vAlign">{author.author_name}</td>
                        <td class="tablePadding">
                            <Link to={`/quotes/${author._id}`}><button className={'btn btn-info'} >View Quotes</button></Link>&nbsp;
                            <Link to={`/edit/${author._id}`}><button className={'btn btn-info'} >Edit Author</button></Link>&nbsp;
                            <DeleteButton authorId={author._id} whatToDelete={'Author'} callback={()=>removeFromDom(author._id)}/>
                        </td>
                    </tr>
                )))}
                </MDBTableBody>
            </MDBTable>
        </div>
    </div>
    );
}
export default Authors;