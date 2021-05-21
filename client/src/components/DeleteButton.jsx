import axios from 'axios';

const DeleteButton = props => {
    
    const { whatToDelete, callback, authorId, quoteId } = props;

    const handleDelete = () => {
        let url = '';
        
        if (whatToDelete === 'Author') {
            // delete the author
            url = `http://localhost:8000/api/quotes/author/${authorId}`;
            axios.delete(url)
                .then( response => { callback(); } )
                .catch(e=>console.log(e));
        } else if (whatToDelete === 'Quote') {
            // delete the quote (uses put)
            url = `http://localhost:8000/api/quotes/author/remove_quote/${authorId}`;
            axios.put(url, {
                '_id': quoteId
            })
            .then( response => { callback(); } )
            .catch(e=>console.log(e)); 
        }
    }

    return (
        <>
        <button className={'btn btn-danger'} onClick={handleDelete}>Delete</button>
        </>
    );
}
export default DeleteButton;