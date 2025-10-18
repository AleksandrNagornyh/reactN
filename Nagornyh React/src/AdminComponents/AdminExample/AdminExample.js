import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { addFile } from "../../api/file";
import { getServices } from "../../api/services";
import { addExample } from "../../api/examples";
import AdminHeader from "../AdminHeader/AdminHeader";

function AdminExample() {
  const fileRef = useRef(null);
  const [service, setService] = useState("");

  const dispatch = useDispatch();
  const services = useSelector(state => state.services.services).map(x => x.name);
  const sended = useSelector(state => state.examples.isExampleAdded);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);
  

  const sendExample = async () => {
    const file = fileRef.current.files[0];

    if (!file || !service) {
      return;
    }

    const filePath = await addFile(file);

    const example = {
      service: service,
      img: `/files/${filePath}`,
    }

    dispatch(addExample(example));
  }

  return (<>
    <AdminHeader />
    <h1>Новый пример</h1>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div>
        <select className="gallery-select" onChange={event => setService(event.target.value)} defaultValue={service}>
          <option value="" disabled={true}>Выберете услугу</option>
          {services.map(x => 
            <option key={x} value={x}>{x}</option>
          )}
        </select>
        <div style={{marginTop: "20px"}}>
          <label htmlFor="file" style={{marginRight: "20px"}}>Картинка</label>
          <input id="file" type="file" ref={fileRef} accept=".webp,.jpg,.jpeg,.png,.gif" />
        </div>
        <br />
        <button onClick={() => sendExample()}>Отправить</button>
      </div>
      { sended && <div style={{padding: '15px', background: '#aceba6', marginTop: '20px'}}>Новый пример добавлен</div> }
    </div>
  </>)
}

export default AdminExample;