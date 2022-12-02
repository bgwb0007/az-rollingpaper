import './App.css';
import PostEditor from './PostEditor';
import ReceiverSelect from './ReceiverSelect';
import 'bootstrap/dist/css/bootstrap.min.css';

const dummyList = [
  {
      id : 1,
      name : "임서형",
      position : "사원",
      email : "seohyunglim@lgcns.com",
      phone : "010-8836-0007",
      photo : "/test/img1.png"
  },{
      id : 2,
      name : "지강두",
      position : "팀장",
      email : "jgd@lgcns.com",
      phone : "010-1111-2222",
      photo : "/test/img1.png"
  },{
      id : 3,
      name : "김영운",
      position : "사원",
      email : "seohyunglim@lgcns.com",
      phone : "010-8836-0007",
      photo : "/test/img1.png"
  },{
    id : 4,
    name : "임서형",
    position : "사원",
    email : "seohyunglim@lgcns.com",
    phone : "010-8836-0007",
    photo : "/test/img1.png"
},{
    id : 5,
    name : "지강두",
    position : "팀장",
    email : "jgd@lgcns.com",
    phone : "010-1111-2222",
    photo : "/test/img1.png"
},{
    id : 6,
    name : "김영운",
    position : "사원",
    email : "seohyunglim@lgcns.com",
    phone : "010-8836-0007",
    photo : "/test/img1.png"
}
]


function App() {
  return (
    <div className="App">
      <h2>2022 연말 Rolling Paper</h2>
      <ReceiverSelect receiverList={dummyList}/>
      <PostEditor receiver={"testtt"} />
    </div>
  );
}

export default App;
