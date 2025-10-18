import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../api/services";

function Calculator() {
  const allServices = useSelector(state => state.services.services);
  const [services, setService] = useState([]);
  const [needAddService, setNeedAddService] = useState(false);
  const price = services.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.count, 0);
  const selectedAll = services.length === allServices.length;
  const existSelected = services.length > 0;
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const addService = service => {
    if (services.some(x => x.name === service.name)) {
      return;
    }

    setService([...services, {...service, count: 1 } ]);
  }

  const removeService = service => {
    setService(services.filter(x => x.name !== service.name));
  }

  const changeCount = (service, value) => {
    const count = parseFloat(value);   
    const storeService = services.find(x => x.name === service.name);
    storeService.count = count;
    storeService.value = value;
    setService([...services]);
  }

  return (<>
    <h1>Оформить заказ</h1>
    <div style={{textAlign: "center"}}>Текущая стоимость: {price}</div>
    <div style={{marginTop: "10px"}}>
      <h3>Выбранные услуги</h3>
      { !existSelected && <div>Нет услуг</div> }
      { existSelected && services.map(x => (
        <div key={x.name} style={{marginTop: "10px"}}>
          <span style={{fontWeight: 600}}>{ x.name }</span>
          <span style={{marginLeft: "10px"}}>за { x.price } р. { x.mesur }</span>
          <input type="text"
            value={x.value ?? 1} 
            onChange={(event) => changeCount(x, event.target.value)} 
            style={{width: "100px", borderRadius: "7px", marginLeft: "10px"}} />
          <button onClick={() => removeService(x)} style={{marginLeft: "10px", padding: 0, border: 0, background: "none"}}>❌</button>
        </div>
      ))}

      { !needAddService && !selectedAll && <button onClick={() => setNeedAddService(true)} style={{ marginTop: "5px" }}>Добавить услугу</button> }
      { needAddService && allServices.filter(x => !services.some(y => y.name === x.name)).map(x => <>
          <div key={x.name} style={{marginTop: "10px"}} onClick={() => addService(x)}>
            <span style={{fontWeight: 600}}>{ x.name }</span>
            <span style={{marginLeft: "10px"}}>за { x.price } р. { x.mesur }</span>
            <button onClick={() => {addService(x); setNeedAddService(false);}} style={{marginLeft: "10px"}}>Добавить</button>
          </div>
        </>)}
        { needAddService && <button onClick={() => setNeedAddService(false)} style={{ marginTop: "5px" }}>Отмена</button> }
      </div>
  </>);
}

export default Calculator;