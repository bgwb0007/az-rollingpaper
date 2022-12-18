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
            <div className="mainText">
                <img src="static/img/home-tree1.png" alt="메인트리" />
                <h2>2022년이 모두 지나갔습니다. 한 해 동안 수고 많으셨습니다!<br/>
                팀 동료들에게 그간의 노력에 감사 인사를 전하고,<br/> 다가오는 2023년을 행복하게 맞이하세요.</h2>
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
                        <Button variant="warning" onClick={()=>{
                                navigate("/newPaper",{
                                    state: it
                                })
                            }}>글쓰기</Button>
                        <Button variant="success" onClick={()=>{
                            navigate("/tree",{
                                state: it
                            })
                        }}>보기</Button>
                    </Card.Body>
                </Card>
            ))}
            </div>
        </div>
    );
}
export default Home;