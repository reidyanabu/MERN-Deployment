import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, navigate } from '@reach/router';

const AddQuote = props => {

    const [quote, setQuote] = useState("");
    const [quoteError, setQuoteError] = useState("");

    const [authorName, setAuthorName] = useState('');

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

    const onCreateQuoteSubmit = e => {
        e.preventDefault();

        if (quote.length<3) {
            setQuoteError("A quote needs to be at least 3 characters");
        } else {
            let url = `http://localhost:8000/api/quotes/author/new_quote/${author_id}`;
            axios.put(url, {
                'quote': quote
                })
                .then(res=> {
                    if (res.status !== 200) {
                        setQuoteError("Error creating Quote");
                    } else {
                        navigate(`/quotes/${author_id}`);
                    }
                })
                .catch(err=>{
                    setQuoteError(err.response.data.errors.quote.message);
                });
        }
    }

    return (
        <>
        <div className="newQuote">
            <Link to="/" style={{ textDecoration: 'none' }}>
                Home
            </Link>
            <div className="heading">
                <h2>Add New Quote</h2>
            </div>
            <p><h4>Provide a quote by {authorName}</h4></p>
            <Form className="editCreateForm">
                <Form.Group as={Row} controlId="quote" className="formElement">
                    <Form.Label column sm={5}><h5>Quote: </h5></Form.Label>
                    <Col sm={6}>
                        <Form.Control type="text" onChange={(e)=>setQuote(e.target.value)} name="quote" value={quote}/>
                        {
                        quoteError ?
                        <p style={{color:'red'}}>{ quoteError }</p> :
                        ''
                        }
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="submitForm" className="formElement">
                    <Col><button className="btn btn-danger" onClick={()=>navigate(`/quotes/${author_id}`)}>Cancel</button></Col>
                    <Col><input className="btn btn-primary" type="submit" onClick={onCreateQuoteSubmit}/></Col>
                </Form.Group>
            </Form>
        </div>
        </>
    );
}
export default AddQuote;