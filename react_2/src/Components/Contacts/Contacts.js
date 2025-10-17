import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import sendClient from "../../api/clients";
import map from '../../static/map.jpg';

function Contacts() {
  const dispatch = useDispatch();
  const sended = useSelector(state => state.clients.isClientAdded);

  const name = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);

  const send = () => {
    const client = {
      name: name.current.value,
      email: email.current.value,
      phone: phone.current.value,
    }
    dispatch(sendClient(client));
  }

  return (<>
    <h1>Наши контакты</h1>
    <div>Телефон: <a href="tel:+79120055000">+7 (912) 00-55-000</a></div>
    <div>Email: <a href="mailto:master@mail.ru">master@mail.ru</a></div>
    <div> Найти нас можете: Адрес: г. Москва, ул. Молодежная, 11, к. 15</div>
    <div>Мы на карте</div>
    <div><img alt="карта" src={map} width={'100%'} /></div>
    { sended && <div style={{padding: '15px', background: '#aceba6'}}>Форма отправлена</div> }
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <h3>Отправьте нам свой вопрос</h3>
      <div>Наш сотрудник рассмотришь ваш вопрос и ответи на нвашу электронную почту</div>
      <div style={{marginTop: "20px"}}>
        <label htmlFor="name">Ваше имя</label>
        <input id="name" type="text" ref={name} style={{marginLeft: "20px"}} />
      </div>
      <div style={{marginTop: "20px"}}>
        <label htmlFor="email">Почта</label>
        <input id="email" type="email" ref={email} style={{marginLeft: "20px"}} />
      </div>
      <div style={{marginTop: "20px"}}>
        <label htmlFor="phone">Телефон</label>
        <input id="phone" type="text" ref={phone} style={{marginLeft: "20px"}} />
      </div>
      <button onClick={() => send()} style={{marginTop: "20px"}}>Отправить</button>
    </div>
  </>);
}

export default Contacts;