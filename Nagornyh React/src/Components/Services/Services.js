import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../api/services";

function Services() {
  const dispatch = useDispatch();
  
  const services = useSelector(
    state => state.services.services,
  );

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (<>
    <h1>Меню</h1>
    { services.map(x => <div style={{display: 'flex', marginTop: '10px'}}>
    <img alt={x.name} src={x.img} style={{width: '200px', height: '150px', objectFit: 'cover', marginRight: '10px'}} />
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1'}}>
      <h4>{ x.name }</h4>
      <span>Стоимость: { x.price } за { x.mesur }</span>
      <p>{ x.description }</p>
    </div>
  </div>) }
  </>);
}

export default Services;