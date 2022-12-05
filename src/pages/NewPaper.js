import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios'
import { useSearchParams, useNavigate } from "react-router-dom";

const NewPaper = () =>{
    const [searchParams] = useSearchParams();
    
    const navigate = useNavigate();

    const receiver = {
        id : searchParams.get("id"),
        name : searchParams.get("name"),
        position : "사원",
        email : "seohyunglim@lgcns.com",
        phone : "010-8836-0007",
        photo : "/test/img2.png"
    }

    const [state, setState] = useState({
        author: "",
        content: "",
        isPublicYn: "Y",
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
    const sendPaper = (e)=>{
        let url = "https://rollingpaper01fnc.azurewebsites.net/api/HttpTrigger1?code=Fhylh_FMtkiJWxUTjn_T_fyfgYgXSxkvJL4z-zQfRtXLAzFuP-pRJQ==";

        let params = {
            name : receiver.name ,
            email : receiver.email ,
            phone : receiver.phone,
            author: state.author,
            content: state.content,
            isPublicYn : state.isPublicYn,
        };
        axios.post(url, {
            params
          },{ 
            headers:{ 
             'Content-type': 'application/json', 
             'Accept': 'application/json' 
               } 
             })
          .then(function (response) {
               // response  
               debugger
               console.log("성공:",response);
               alert("메시지 전송이 성공적으로 예약되었습니다.");
               navigate("/");
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
            <div>
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
                <Button variant="primary" onClick={sendPaper}>
                    보내기
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default NewPaper; 