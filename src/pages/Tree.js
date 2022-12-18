import MyHeader from "../components/MyHeader";
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
const Tree = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const receiver = location.state;

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
    decoArr[3] = 77;
    decoArr[10] = 88;
    decoArr[45] = 6;
    decoArr[58] = 9;
    console.log(decoArr);

    const appendDecoP1 = () => {
        let rand_1_12 = Math.floor(Math.random() * 13) + 1;
        let imgSrc = "";
        let result = [];
        let decoId = "";
        for(let i=0; i<25; i++){
            if(i===0 || i===1  || i===3 || i===4 || i===5 || i===9){
                result.push(<span key={i} className="deco-blank"></span>);
                continue;
            }
            decoId = decoArr.shift();
            if(decoId === 0){
                result.push(<span key={i} className="deco-blank"></span>);
            }else{
                rand_1_12 = Math.floor(Math.random() * 12) + 1;
                imgSrc = "static/img/deco"+rand_1_12+".png";
                result.push(<img key={i} src={imgSrc} alt="deco" onClick={()=>{
                    onDeco(decoId);
                }}></img>);
            }
        }
        return result;
    }
    const appendDecoP2 = () => {
        let rand_1_12 = Math.floor(Math.random() * 13) + 1;
        let imgSrc = "";
        let result = [];
        let decoId = "";
        for(let i=0; i<40; i++){
            decoId = decoArr.shift();
            if(decoId===0){
                result.push(<span key={i} className="deco-blank"></span>)
            }else{
                rand_1_12 = Math.floor(Math.random() * 12) + 1;
                imgSrc = "static/img/deco"+rand_1_12+".png";
                result.push(<img key={i} src={imgSrc} alt="deco" onClick={()=>{
                    onDeco(decoId);
                }}></img>)
            }
        }
        return result;
    }
    const onDeco = (decoId)=>{
        alert(decoId);
    }

    // const appendTreeDeco1 = ()=>{
    //     let rand_1_12 = Math.floor(Math.random() * 13) + 1;
    //     let imgSrc = "";
    //     let result = [];
    //     for(let i=0;i<5;i++){
    //         for(let j=0;j<5;j++){
    //             let deco = treeArr1[i][j];
    //             if((deco===-1) || (deco === 1)){ // 사용못함 or 빈곳
    //                 result.push(<span key={i+'-'+j} className="deco-blank"></span>)
    //             }else{
    //                 rand_1_12 = Math.floor(Math.random() * 12) + 1;
    //                 imgSrc = "static/img/deco"+rand_1_12+".png";
    //                 result.push(<img key={i+'-'+j} src={imgSrc} alt="deco"></img>)
    //             }
    //         }
    //     }
    //     return result;
    // }
    // const appendTreeDeco2 = ()=>{
    //     let rand_1_12 = Math.floor(Math.random() * 13) + 1;
    //     let imgSrc = "";
    //     let result = [];
    //     for(let i=0; i<5; i++){
    //         for(let j=0; j<8; j++){
    //             rand_1_12 = Math.floor(Math.random() * 12) + 1;
    //             imgSrc = "static/img/deco"+rand_1_12+".png";
    //             result.push(<img key={i+'-'+j} src={imgSrc} alt="deco"></img>)
    //         }
    //     }
    //     return result; 
    // }

    return <div className="Tree">
        <MyHeader headText={receiver.name + "'s Tree"} leftChild={<Button variant="secondary" onClick={()=>{navigate("/")}}>{'<'} 뒤로가기</Button>}></MyHeader>

        <div className="tree-wrapper">
            <div className="tree-top">
                <div className="tree-img">
                    <div className="tree-part-1">
                        {appendDecoP1()}
                    </div>
                    <div className="tree-part-2">
                        {appendDecoP2()}
                    </div>
                    <div className="tree-part-3"></div>
                    
                </div>
            </div>
            <div className="tree-bottom">
            </div>
            
        </div>


    </div>
}

export default Tree;