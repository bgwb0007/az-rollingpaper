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
    const appendTreeDeco1 = ()=>{
        let rand_1_12 = Math.floor(Math.random() * 13) + 1;
        let imgSrc = "";
        let result = [];
        for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
                let deco = treeArr1[i][j];
                if((deco===-1) || (deco === 1)){ // 사용못함 or 빈곳
                    result.push(<span key={i+'-'+j} className="deco-blank"></span>)
                }else{
                    rand_1_12 = Math.floor(Math.random() * 12) + 1;
                    imgSrc = "static/img/deco"+rand_1_12+".png";
                    result.push(<img key={i+'-'+j} src={imgSrc} alt="deco"></img>)
                }
            }
        }
        return result;
    }
    const appendTreeDeco2 = ()=>{
        let rand_1_12 = Math.floor(Math.random() * 13) + 1;
        let imgSrc = "";
        let result = [];
        for(let i=0; i<5; i++){
            for(let j=0; j<8; j++){
                rand_1_12 = Math.floor(Math.random() * 12) + 1;
                imgSrc = "static/img/deco"+rand_1_12+".png";
                result.push(<img key={i+'-'+j} src={imgSrc} alt="deco"></img>)
            }
        }
        return result; 
    }
    return <div className="Tree">
        <MyHeader headText={receiver.name + "'s Tree"} leftChild={<Button variant="secondary" onClick={()=>{navigate("/")}}>{'<'} 뒤로가기</Button>}></MyHeader>

        <div className="tree-wrapper">
            <div className="tree-top">
                <div className="tree-img">
                    <div className="tree-part-1">
                        {appendTreeDeco1()}
                    </div>
                    <div className="tree-part-2">
                        {appendTreeDeco2()}
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