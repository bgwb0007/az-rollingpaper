import './App.css';
import Home from './pages/Home';
import NewPaper from './pages/NewPaper';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"

const memberList = [
{
      id : 1,
      name : "지강두",
      position : "팀장",
      email : "kangdoo@lgcns.com",
      phone : "010-9937-6447",
      photo : "/test/img1.png"
},{
      id : 2,
      name : "김종우",
      position : "책임",
      email : "jongwookim@lgcns.com",
      phone : "010-4242-7415",
      photo : "/test/img1.png"
},{
      id : 3,
      name : "심규열",
      position : "책임",
      email : "skysim06@lgcns.com",
      phone : "010-2637-9060",
      photo : "/test/img1.png"
},{
    id : 5,
    name : "김찬수",
    position : "선임",
    email : "kugar93@lgcns.com",
    phone : "010-3639-1614",
    photo : "/test/img1.png"
},{
    id : 6,
    name : "박재연",
    position : "선임",
    email : "jaeyeon.park@lgcns.com",
    phone : "010-4458-6803",
    photo : "/test/img1.png"
},{
  id : 7,
  name : "윤선희",
  position : "선임",
  email : "SH.Youn@lgcns.com",
  phone : "010-8549-0518",
  photo : "/test/img1.png"
},{
  id : 8,
  name : "이가연",
  position : "선임",
  email : "leegy@lgcns.com",
  phone : "010-2753-4532",
  photo : "/test/img1.png"
},{
  id : 9,
  name : "주상연",
  position : "선임",
  email : "SYJoo@lgcns.com",
  phone : "010-8408-4125",
  photo : "/test/img1.png"
},{
  id : 10,
  name : "김광남",
  position : "사원",
  email : "kwang5348@lgcns.com",
  phone : "010-5804-7948",
  photo : "/test/img1.png"
},{
  id : 11,
  name : "김영운",
  position : "사원",
  email : "yeongun1026@lgcns.com",
  phone : "010-9331-7947",
  photo : "/test/img1.png"
},{
  id : 12,
  name : "임서형",
  position : "사원",
  email : "seohyunglim@lgcns.com",
  phone : "010-8836-0007",
  photo : "/test/img1.png"
}
]


function App() {

  const sortedItems = memberList;

  return (
    <BrowserRouter>
      <div className="App">
        <h2>2022 연말 Rolling Paper</h2>
        <Routes>
          <Route path="/" element={<Home receiverList={memberList}/>} />
          <Route path="/newPaper" element={<NewPaper />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
