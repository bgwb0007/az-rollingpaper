import { useState, useEffect } from "react";
import MyHeader from "../components/MyHeader";
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const Tree = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const receiver = location.state;
    const [show, setShow] = useState(false);
    const [paperArr, setPaperArr] = useState([]);
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

    const sendHttpReq = (e)=>{
        const url = "https://prod-14.centralus.logic.azure.com:443/workflows/1f968dca724f4e719721c248962ef9d9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hjsDZHV-FxY0MveyalbxF1KlopuANG_1U5SOAwDwGjw";
       
        axios.get(url, {}
          ,{
            headers:{ 
             'Content-type': 'application/json', 
             'Accept': 'application/json' 
               } 
             })
          .then(function (res) {
               // response
               console.log("res: ",res.data.value);
               let temp = [];
               for(let row of res.data.value){
                if(row.name === receiver.name) temp.push(row);
               }
               setPaperArr(temp);
               document.getElementsByClassName('loading')[0].style.display = 'none';
                document.getElementsByClassName('loading')[1].style.display = 'none';
          }).catch(function (error) {
              // 오류발생시 실행
              console.log("실패:",error);
          }).then(function() {
              // 항상 실행
          });
    }


    let decoArr = new Array(59).fill(0);

    const paperInit = (cb)=>{
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
        sendHttpReq();
        document.body.style.overflow = 'hidden';
        return ()=>{document.body.style.overflow = 'auto'};
    },[]);

    useEffect(()=>{
        paperInit(()=>{
            setDeco1(appendDecoP1);
            setDeco2(appendDecoP2);
            
        });
        
    },[paperArr]);



    return <div className="Tree">
        <MyHeader headText={receiver.name + "'s Tree"} leftChild={<Button variant="secondary" onClick={()=>{navigate("/")}}>{'<'} 뒤로가기</Button>}></MyHeader>
        <Spinner className="loading" animation="border" variant="danger" />
        <div className="dimmed-div loading"></div>
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
            {/* <div className="tree-bottom">
            </div> */}
            
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