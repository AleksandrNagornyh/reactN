import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExamples } from "../../api/examples";
import { getServices } from "../../api/services";

function Gallery() {
  const [currentSelect, setCurrentSelect] = useState("all");
  const images = useSelector(state => state.examples.examples);
  const select = useSelector(state => state.services.services).map(x => x.name);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServices());
    dispatch(getExamples());
  }, [dispatch]);
  
  return (<>
    <h1>Каталог товаров</h1>
    <div>
    <div>
      <input id='services_all' type="radio" name="service" value="all" defaultChecked={true} onChange={event => setCurrentSelect(event.target.value)} /> 
      <label for='services_all'>Все</label>
    </div>
      { select.map((x, index) => <div>
        <input 
          id={`service_${index}`}
          key={x}
          type="radio" 
          name="service" 
          value={x}
          onChange={event => setCurrentSelect(event.target.value)} />
        <label for={`service_${index}`}>{x}</label>
      </div>)}
    </div>

    <div style={{display: 'flex', flexWrap: 'wrap', gap: '25px', marginTop: '10px'}}>
      { images.filter(x => currentSelect === "all" || currentSelect === x.name)
        .map((x, index) => <div key={x.name + index}>
          <div>
            <img alt={x.name} src={x.img} style={{height: '200px', width: '275px', objectFit: 'cover', borderRadius: '5px'}} />
            <div style={{color: '#1e212879', textAlign: 'center'}}>{x.name}</div>
          </div>
        </div>)
      }
    </div>
  </>);
}

export default Gallery;