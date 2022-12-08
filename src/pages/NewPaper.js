import { useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";

const NewPaper = () =>{
    
    const navigate = useNavigate();
    const location = useLocation();
    const receiver = location.state;

    const authorInput = useRef();
    const contentInput = useRef();

    const [state, setState] = useState({
        author: "",
        content: "",
        isPrivateYn: "N",
        testRow: "",
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if(state.author.length < 1){
            authorInput.current.focus();
            return;
        }
        if(state.content.length < 1){
            contentInput.current.focus();
            return;
        }
        setShow(true);
    };

    const handleChangeState = (e)=>{
        setState({
            ...state,
            [e.target.id]: e.target.value,
        });
    }
    const handleChangeStateSwitch = (e)=>{
        const isChecked = e.target.checked;
        setState({
            ...state,
            [e.target.id]: isChecked ? 'Y' : 'N',
        })
    }

    const sendPaper = (e)=>{
       
        const url = "https://prod-17.eastasia.logic.azure.com:443/workflows/c37bacf5695d438da5843900cf884ea1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=J3o9Ia4KgWxzno0moRAZj1wievsKtuTNtz3WoTzJec8";
        const date = new Date();
        const rowKey = receiver.name + "_" + date.getFullYear() + date.getMonth() + date.getDate()
                        + date.getHours() + date.getMinutes() + date.getSeconds();
        
        let params = {
            PartitionKey: "2022안부메시지",
            RowKey: rowKey,
            name : receiver.name ,
            email : receiver.email ,
            phone : receiver.phone,
            author: state.author,
            content: state.content,
            isPrivateYn : state.isPrivateYn,
        };
        axios.post(url, params
          ,{ 
            headers:{ 
             'Content-type': 'application/json', 
             'Accept': 'application/json' 
               } 
             })
          .then(function (response) {
               // response  
               debugger
               if(response.data.status === '200' && response.data.success === 'Y'){
                console.log("성공:",response);
                alert("메시지 전송이 성공적으로 예약되었습니다.");
                navigate("/");
               }else{
                console.log("실패:",response);
                alert("저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
                handleClose();
               }
          }).catch(function (error) {
              // 오류발생시 실행
              debugger
              console.log("실패:",error);
              alert("저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
              handleClose();
          }).then(function() {
              // 항상 실행
              debugger
          });
    }

    return (
        <div className="NewPaper">
            <div className="inputWrapper">
                <InputGroup className="receiver">
                    <InputGroup.Text id="receiver">
                    To
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="To"
                    aria-describedby="receiver"
                    value= {receiver.name}
                    id="receiver"
                    readOnly
                    />
                </InputGroup>
                <InputGroup className="author">
                    <InputGroup.Text>
                    From
                    </InputGroup.Text>
                    <Form.Control
                    ref={authorInput}
                    aria-label="From"
                    aria-describedby="author"
                    value={state.author}
                    id="author"
                    onChange={handleChangeState}
                    placeholder="보내는 사람 이름을 입력해주세요."
                    />
                </InputGroup>
                <div className="isPrivateYn">
                <OverlayTrigger
                    key='top'
                    placement='top'
                    overlay={
                        <Tooltip id='tooltip-top'>
                        메시지를 받는 사람만 볼 수 있습니다.
                        </Tooltip>
                    }
                    >
                        <Badge pill bg="secondary">
                            ?
                        </Badge>
                    </OverlayTrigger>
                    <Form.Check 
                        reverse
                        type="switch"
                        id="isPrivateYn"
                        label="비밀글 보내기"
                        onChange={handleChangeStateSwitch}
                    />
                </div>
                <Form.Group className="content">
                    <Form.Label></Form.Label>
                    <Form.Control 
                        ref={contentInput}
                        as="textarea" 
                        rows={9} 
                        id="content"
                        value={state.content} 
                        onChange={handleChangeState} 
                        placeholder="메시지를 입력해 주세요."
                    />
                </Form.Group>
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
                <Button variant="primary" onClick={sendPaper}>
                    보내기
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default NewPaper; 