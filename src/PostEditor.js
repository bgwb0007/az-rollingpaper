import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const PostEditor = ({receiver}) =>{
    const [state, setState] = useState({
        author: "",
        content: "",
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    const handleChangeState = (e)=>{
        setState({
            ...state,
            [e.target.id]: e.target.value,
        });
    }

    return (
        <div className="PostEditor">
            <div>
                <InputGroup className="receiver">
                    <InputGroup.Text id="receiver">
                    To
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="To"
                    aria-describedby="receiver"
                    value= {receiver}
                    id="receiver"
                    readOnly
                    />
                </InputGroup>
                <InputGroup className="author">
                    <InputGroup.Text id="author">
                    From
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="From"
                    aria-describedby="author"
                    value={state.author}
                    id="author"
                    onChange={handleChangeState}
                    placeholder="보내는 사람 이름을 입력해주세요."
                    />
                </InputGroup>
            </div>
            <div>
                <Form.Group className="content">
                    <Form.Label></Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        id="content"
                        value={state.content} 
                        onChange={handleChangeState} 
                        placeholder="메시지를 입력해 주세요."
                    />
                </Form.Group>
            </div>
            <div>
                <Button variant="primary" onClick={handleShow}>
                    메시지 보내기
                </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>2022 연말 Rolling Paper</Modal.Title>
                </Modal.Header>
                <Modal.Body>작성한 메시지는 12월 25일 발송됩니다</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    보내기
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default PostEditor; 