import { useState } from "react";

const PostEditor = () =>{
    const [state, setState] = useState({
        author: "",
        content: "",
    });

const handleChangeState = (e)=>{
    setState({
        ...state,
        [e.target.name]: e.target.value,
    });
}
const handleSubmit = ()=>{
    if(window.confirm("메시지는 12월 25일 전송됩니다.")){
        console.log("전송되었습니다");
    }else{
        console.log("취소");
    }
}

    return (
        <div className="PostEditor">
            <h2>2022 연말 Rolling Paper</h2>
            <div>
                <input 
                    name="author"
                    value={state.author} 
                    onChange={handleChangeState}
                    placeholder="보내는사람"
                />
            </div>
            <div>
                <textarea 
                    name="content"
                    value={state.content} 
                    onChange={handleChangeState} 
                    placeholder="메시지를 입력해 주세요"
                />
            </div>
            <div>
                <button onClick={handleSubmit}>메시지 보내기</button>
            </div>

        </div>
    );
}
export default PostEditor; 