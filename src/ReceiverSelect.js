import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ReceiverSelect = ({receiverList}) =>{
    
    const [state, setState] = useState({
        receiverSerch: "",
        receiverListSerched: [...receiverList],
        content: "",
    });

    const handleChangeState = (e)=>{
        
        const Hangul = require('hangul-js');
        let searcher = new Hangul.Searcher(e.target.value);
        let tempListSerched = [];
        receiverList.forEach(m =>{
            if(searcher.search(m.name) >= 0) {
                tempListSerched.push(m);
            }
            return;
        });
        setState({
            ...state,
            [e.target.id]: e.target.value,
            receiverListSerched: tempListSerched
        });
    }

    return (
        <div className="ReceiverSelect">
            <div>
            <Form.Group className="receiverSerch">
                <Form.Control 
                    id="receiverSerch"
                    type="email" 
                    placeholder="이름으로 검색하세요." 
                    value={state.author} 
                    onChange={handleChangeState}
                />
            </Form.Group>
            </div>
            <div className="card-wrap">
            {state.receiverListSerched.map((it) => (
                <Card key={it.id}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            {it.name} {it.position}
                        </Card.Text>
                        <Button variant="primary">선택</Button>
                    </Card.Body>
                </Card>
            ))}
            </div>
        </div>
    );
}
export default ReceiverSelect; 