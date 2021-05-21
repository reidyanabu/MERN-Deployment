import { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, navigate } from '@reach/router';

const AddAuthor = props => {

    const [authorName, setAuthorName] = useState("");
    const [authorNameError, setAuthorNameError] = useState("");

    const onCreateAuthorSubmit = e => {
        e.preventDefault();

        if (authorName.length<3) {
            setAuthorNameError("Author name needs to be at least 3 characters");
        } else {
            axios.post('http://localhost:8000/api/quotes/author/new', {
                'author_name': authorName
                })
                .then(res=> {
                    if (res.status !== 200) {
                        setAuthorNameError("Error creating Author");
                    } else {
                        navigate('/');
                    }
                }) // navigate back to author listing
                .catch(err=>{
                    setAuthorNameError(err.response.data.errors.author_name.message);
                });
        }
    }

    return (
    <>
    <div className="newAuthor">
        <Link to="/" style={{ textDecoration: 'none' }}>
            Home
        </Link>
        <div className="heading">
            <h2>Add New Author</h2>
        </div>
        <Form className="editCreateForm">
            <Form.Group as={Row} controlId="title" className="formElement">
                <Form.Label column sm={5}><h5>Author Name: </h5></Form.Label>
                <Col sm={6}>
                    <Form.Control type="text" onChange={(e)=>setAuthorName(e.target.value)} name="authorName" value={authorName}/>
                    {
                    authorNameError ?
                    <p style={{color:'red'}}>{ authorNameError }</p> :
                    ''
                    }
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="submitForm" className="formElement">
                <Col><button className="btn btn-danger" onClick={()=>navigate(`/`)}>Cancel</button></Col>
                <Col><input className="btn btn-primary" type="submit"onClick={onCreateAuthorSubmit}/></Col>
            </Form.Group>
        </Form>
    </div>
    </>
    );
}
export default AddAuthor;