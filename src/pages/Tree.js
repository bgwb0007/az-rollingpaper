import { useState, useEffect } from "react";
import MyHeader from "../components/MyHeader";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const Tree = () =>{

    const navigate = useNavigate();
    // const location = useLocation();
    // const receiver = location.state;
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
    const [searchParams] = useSearchParams();
    const receiver = {"name": searchParams.get('name')};
    // console.log("searchParams: ", searchParams.get('name'));
    const handleClose = () => setShow(false);
    const handleShow = (decoId) => {
        setModalDeco(decoMap.get(decoId));
        setShow(true);
    };

    const kakaoShare = ()=> {
        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
              title: receiver.name + '\'s Tree',
              description: '클라우드 운영혁신팀 연말 롤링페이퍼',
              imageUrl:
                'https://agreeable-pebble-0e7f4bc00.2.azurestaticapps.net/static/img/kakao-share.png',
              link: {
                mobileWebUrl: 'https://agreeable-pebble-0e7f4bc00.2.azurestaticapps.net/tree?name=' + receiver.name,
                webUrl: 'https://agreeable-pebble-0e7f4bc00.2.azurestaticapps.net/tree?name=' + receiver.name,
              },
            },
            itemContent: {
              profileText: '2022 롤링페이퍼',
              profileImageUrl: 'https://agreeable-pebble-0e7f4bc00.2.azurestaticapps.net/static/img/deco9.png',
            //   titleImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
            //   titleImageText: 'Cheese cake',
            //   titleImageCategory: 'Cake',
            //   items: [
            //     {
            //       item: 'Cake1',
            //       itemOp: '1000원',
            //     },
            //     {
            //       item: 'Cake2',
            //       itemOp: '2000원',
            //     },
            //     {
            //       item: 'Cake3',
            //       itemOp: '3000원',
            //     },
            //     {
            //       item: 'Cake4',
            //       itemOp: '4000원',
            //     },
            //     {
            //       item: 'Cake5',
            //       itemOp: '5000원',
            //     },
            //   ],
            //   sum: '총 결제금액',
            //   sumOp: '15000원',
            },
            social: {
            //   likeCount: 10,
              commentCount: paperArr.length,
            //   sharedCount: 30,
            },
            buttons: [
              {
                title: '웹으로 이동',
                link: {
                  mobileWebUrl: 'https://agreeable-pebble-0e7f4bc00.2.azurestaticapps.net/tree?name=' + receiver.name,
                  webUrl: 'https://agreeable-pebble-0e7f4bc00.2.azurestaticapps.net/tree?name=' + receiver.name,
                },
              }
            ],
          });
    }

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
            //    console.log("res: ",res.data.value);
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
            // console.log("length: ", paperArr);
            setDeco1(appendDecoP1);
            setDeco2(appendDecoP2);
        });
    },[paperArr]);

    return <div className="Tree">
        <MyHeader headText={receiver.name + "'s Tree"} 
        leftChild={<Button variant="secondary" onClick={()=>{navigate("/")}}>{'<'} 홈으로</Button>}
        // rightChild={<Button variant="success" onClick={()=>{navigate("/NewPaper",{
        //     state : receiver
        // })}}>글쓰기</Button>}

        rightChild={<Button variant="warning" onClick={kakaoShare}>Kakao공유</Button>}
        ></MyHeader>
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
            <Modal.Body> <br />
            {modalDeco.content}<br /><br /><br /></Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                닫기
            </Button>
            </Modal.Footer>
        </Modal>
        

    </div>
}

export default Tree;