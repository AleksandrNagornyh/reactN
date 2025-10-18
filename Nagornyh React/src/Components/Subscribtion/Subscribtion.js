import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import subscribe from "../../api/subscribers";

function Subscribtion() {
  const dispatch = useDispatch();
  const sended = useSelector(state => state.subscribers.isSubscriberAdded);
  const email = useRef(null);

  const sendForm = () => {
    dispatch(subscribe(email.current.value));
  }

  return (<div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
    <h4>Подпишитесь на новости</h4>
    { sended && <div style={{padding: '15px', background: '#aceba6'}}>Вы подписались</div> }
    <div style={{padding: "20px"}}>
      <div>
        <label htmlFor="email" style={{marginRight: "20px"}}>Почта</label>
        <input id="email" type="email" ref={email} style={{marginRight: "20px"}} />
        <button onClick={() => sendForm()}  style={{marginRight: "20px"}}>Отправить</button>
      </div>
    </div>
  </div>)
}

export default Subscribtion;