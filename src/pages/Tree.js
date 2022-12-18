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
    const [paperArr, setPaperArr] = useState(
        [
            {'RowKey':'임서형_111','name': '임서형','author': '글쓴이', 'content':'테스트글입니다.'},
            {'RowKey':'임서형_222','name': '임서형','author': '22', 'content':'22222222222.'},
            {'RowKey':'임서형_333','name': '임서형','author': '33', 'content':'33333333333.'},
            {'RowKey':'임서형_444','name': '임서형','author': '44', 'content':'444444444444.'},
        ]
    );
    const [deco1, setDeco1] = useState(false);
    const [deco2, setDeco2] = useState(false);
    const [decoMap, setDecoMap] = useState(new Map());
    const [modalDeco, setModalDeco] = useState({
        name:"",
        author: "",
        content: "",
    });
    const handleClose = () => setShow(false);
    const handleShow = (decoId) => {
        setModalDeco(decoMap.get(decoId));
        setShow(true);
    };

    let decoArr = new Array(59).fill(0);

    const paperInit = (cb)=>{
        //TODO. 데이터 받아오기 result.value => paperArr
        for(let deco of paperArr){
            setDecoMap(decoMap.set(deco.RowKey, deco));
        }
        let i = 0;
        console.log(paperArr);
        while(i< paperArr.length){
            let rand_0_58 = Math.floor(Math.random() * 59);
            if(decoArr[rand_0_58] === 0){ // 자리있는경우
                decoArr[rand_0_58] = paperArr[i].RowKey;
                i++;
            }
        }
        cb();
    }
    
    const appendDecoP1 = () => {
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
                let rand_1_12 = Math.floor(Math.random() * 12) + 1;
                let imgSrc = "static/img/deco"+rand_1_12+".png";
                result.push(<img key={i} src={imgSrc} alt={"deco"+i} onClick={()=>{
                    handleShow(decoId);
                }}></img>);
            }
        }
        return result;
    }
    const appendDecoP2 = () => {
        let imgSrc = "";
        let result = [];
        for(let i=0; i<40; i++){
            let decoId = decoArr.shift();
            if(decoId===0){
                result.push(<span key={i} className="deco-blank"></span>)
            }else{
                let rand_1_12 = Math.floor(Math.random() * 12) + 1;
                imgSrc = "static/img/deco"+rand_1_12+".png";
                result.push(<img key={i} src={imgSrc} alt="deco" onClick={()=>
                    handleShow(decoId)}></img>)
            }
        }
        return result;
    }
    useEffect(()=>{
        console.log("mount!");
        paperInit(()=>{
            setDeco1(appendDecoP1);
            setDeco2(appendDecoP2);
        });
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