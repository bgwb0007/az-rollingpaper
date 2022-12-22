import './App.css';
import Home from './pages/Home';
import NewPaper from './pages/NewPaper';
import Tree from './pages/Tree';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Snow from './components/Snow';
const memberList = [
{
      id : 1,
      name : "지강두",
      position : "팀장",
      email : "kangdoo@lgcns.com",
      photo : "/test/img1.png"
},{
      id : 2,
      name : "김종우",
      position : "책임",
      email : "jongwookim@lgcns.com",
      photo : "/test/img1.png"
},{
      id : 3,
      name : "심규열",
      position : "책임",
      email : "skysim06@lgcns.com",
      photo : "/test/img1.png"
},{
    id : 5,
    name : "김찬수",
    position : "선임",
    email : "kugar93@lgcns.com",
    photo : "/test/img1.png"
},{
    id : 6,
    name : "박재연",
    position : "선임",
    email : "jaeyeon.park@lgcns.com",
    photo : "/test/img1.png"
},{
  id : 7,
  name : "윤선희",
  position : "선임",
  email : "SH.Youn@lgcns.com",
  photo : "/test/img1.png"
},{
  id : 8,
  name : "이가연",
  position : "선임",
  email : "leegy@lgcns.com",
  photo : "/test/img1.png"
},{
  id : 9,
  name : "주상연",
  position : "선임",
  email : "SYJoo@lgcns.com",
  photo : "/test/img1.png"
},{
  id : 10,
  name : "김광남",
  position : "사원",
  email : "kwang5348@lgcns.com",
  photo : "/test/img1.png"
},{
  id : 11,
  name : "김영운",
  position : "사원",
  email : "yeongun1026@lgcns.com",
  photo : "/test/img1.png"
},{
  id : 12,
  name : "임서형",
  position : "사원",
  email : "seohyunglim@lgcns.com",
  photo : "/test/img1.png"
},{
  id : 13,
  name : "제유빈",
  position : "사원",
  email : "yubin.je@lgcns.com",
  photo : "/test/img1.png"
},{
  id : 14,
  name : "최철곤",
  position : "선임",
  email : "absolutec@lgcns.com",
  photo : "/test/img1.png"
}
]


function App() {

  if(!window.Kakao.isInitialized()){
    window.Kakao.init(process.env.REACT_APP_JS_KEY);
    // console.log("key: ",process.env.REACT_APP_JS_KEY);
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Snow></Snow>
        <Routes>
          <Route path="/" element={<Home receiverList={memberList}/>} />
          <Route path="/newPaper" element={<NewPaper />} />
          <Route path="/tree" element={<Tree />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
