import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

const Home = ({receiverList}) =>{
    const navigate = useNavigate();
    
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
        <div className="Home">
            <div className="mainImg01">
                <img src="static/img/back01.png" alt="메인배경" />
            </div>
            <div className="mainText">
                <h2>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</h2>
                <h2>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</h2>
            </div>
            <div>
            <Form.Group className="receiverSerch">
                <Form.Control 
                    id="receiverSerch"
                    type="text"
                    placeholder="이름으로 검색하세요." 
                    value={state.author} 
                    onChange={handleChangeState}
                />
            </Form.Group>
            </div>
            <div className="card-wrap">
            {state.receiverListSerched
            .sort((a,b)=>
                a.name < b.name ? -1 : a.name > b.name ? 1 : 0
            ).map((it) => (
                <Card key={it.id}>
                    <Card.Img variant="top"/>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            {it.name} {it.position}
                        </Card.Text>
                        <Button variant="primary" onClick={()=>{
                                navigate("/newPaper",{
                                    state: it
                                })
                            }}>선택</Button>
                    </Card.Body>
                </Card>
            ))}
            </div>
        </div>
    );
}
export default Home;