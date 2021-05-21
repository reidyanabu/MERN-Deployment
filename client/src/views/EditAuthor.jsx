import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, navigate } from '@reach/router';

const EditAuthor = props => {

    const [authorName, setAuthorName] = useState("");
    const [authorNameError, setAuthorNameError] = useState("");
    const { author_id } = props;

    const getAuthor = () => {

        let url = `http://localhost:8000/api/quotes/author/${author_id}`;
        axios.get(url)
            .then(response=> {
                setAuthorName(response.data.author_name);
            })
            .catch(e=> {
                console.log(e);
                navigate("/no_dice");
            });
    }

    useEffect( () => {
        getAuthor();
    }, []);

    const onEditAuthorSubmit = e => {
        e.preventDefault();

        if (authorName.length<3) {
            setAuthorNameError("Author name needs to be at least 3 characters");
        } else {
            let url = `http://localhost:8000/api/quotes/author/edit/${author_id}`;
            axios.put(url, { 
                'author_name': authorName
                })
                .then(res=> {
                    if (res.status !== 200) {
                        setAuthorNameError("Error updating Author");
                    } else {
                        navigate('/');
                    }
                })
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
            <h2>Update Author</h2>
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
                <Col><button className="btn btn-danger" onClick={()=>navigate(`/`)} value="cancel">Cancel</button></Col>
                <Col><input className="btn btn-primary" onClick={onEditAuthorSubmit} type="submit"/></Col>
            </Form.Group>
        </Form>
    </div>
    </>
    );
}
export default EditAuthor;