import { useState, useEffect } from "react";
import MyHeader from "../components/MyHeader";
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Tree = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const receiver = location.state;


    
    
    const [show, setShow] = useState(false);
    const [deco1, setDeco1] = useState(false);
    const [deco2, setDeco2] = useState(false);
    const [modalDeco, setModalDeco] = useState({
        name:"",
        author: "",
        content: "",
    });
    const handleClose = () => setShow(false);
    const handleShow = (decoId) => {
        setModalDeco(tempMap[decoId]);
        setShow(true);
    };


    // 빈곳: 0, 사용못하는 위치: -1
    // 메시지 위치: 메시지id
    let treeArr1 = [];
    for(let i = 0; i < 5; i++) {
        let temp = [];
        for(let j = 0; j < 5; j++){
            if((i===0&&j===0) || (i===0&&j===1) || (i===0&&j===4) || (i===1&&j===0) || (i===1&&j===4) || (i===2&&j===0))  temp.push(-1);
            else temp.push(0);
        }
        treeArr1.push(temp);
    }
    let decoArr = new Array(59).fill(0);
    const tempMap = {
        77:{'name': '임서형','author': '글쓴이', 'content':'테스트글입니다.'},
        88:{'name': '임서형','author': '22', 'content':'22222222222.'},
        6:{'name': '임서형','author': '33', 'content':'33333333333.'},
        9:{'name': '임서형','author': '44', 'content':'444444444444.'},
    };
    decoArr[3] = 77;
    decoArr[10] = 88;
    decoArr[45] = 6;
    decoArr[58] = 9;


    
    const appendDecoP1 = () => {
        let rand_1_12 = Math.floor(Math.random() * 13) + 1;
        let result = [];
        for(let i=0; i<25; i++){
            if(i===0 || i===1  || i===3 || i===4 || i===5 || i===9){
                result.push(<span key={i} className="deco-blank"></span>);
                continue;
            }
            let decoId = decoArr.shift();
            if(decoId === 0){
                result.push(<span key={i} className="deco-blank"></span>);
            }else{
                debugger
                rand_1_12 = Math.floor(Math.random() * 12) + 1;
                let imgSrc = "static/img/deco"+rand_1_12+".png";
                result.push(<img key={i} src={imgSrc} alt={"deco"+i} onClick={()=>{
                    handleShow(decoId);
                }}></img>);
            }
        }
        return result;
    }
    const appendDecoP2 = () => {
        let rand_1_12 = Math.floor(Math.random() * 13) + 1;
        let imgSrc = "";
        let result = [];
        for(let i=0; i<40; i++){
            let decoId = decoArr.shift();
            if(decoId===0){
                result.push(<span key={i} className="deco-blank"></span>)
            }else{
                rand_1_12 = Math.floor(Math.random() * 12) + 1;
                imgSrc = "static/img/deco"+rand_1_12+".png";
                result.push(<img key={i} src={imgSrc} alt="deco" onClick={()=>
                    handleShow(decoId)}></img>)
            }
        }
        return result;
    }
    useEffect(()=>{
        console.log("mount!");
        setDeco1(appendDecoP1);
        setDeco2(appendDecoP2);
    },[]);
    return <div className="Tree">
        <MyHeader headText={receiver.name + "'s Tree"} leftChild={<Button variant="secondary" onClick={()=>{navigate("/")}}>{'<'} 뒤로가기</Button>}></MyHeader>

        <div className="tree-wrapper">
            <div className="tree-top">
                <div className="tree-img">
                    <div className="tree-part-1" id="tree-part-1">
                        {deco1}
                    </div>
                    <div className="tree-part-2">
                        {deco2}
                    </div>
                    <div className="tree-part-3"></div>
                    
                </div>
            </div>
            <div className="tree-bottom">
            </div>
            
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><strong>{modalDeco.author}</strong>님이 보낸 메시지</Modal.Title>
            </Modal.Header>
            <Modal.Body> <br /><br />
            {modalDeco.content}<br /><br /><br /><br /></Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                닫기
            </Button>
            </Modal.Footer>
        </Modal>
        

    </div>
}

export default Tree;