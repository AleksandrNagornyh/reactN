import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFile } from "../../api/file";
import { addService } from "../../api/services";
import AdminHeader from "../AdminHeader/AdminHeader";

function AdminService() {
  const dispatch = useDispatch();
  const sended = useSelector(state => state.services.isServiceAdded);
  const nameRef = useRef(null);
  const descriprionRef = useRef(null);
  const priceRef = useRef(null);
  const mesurementRef = useRef(null);
  const fileRef = useRef(null);

  const sendForm = async () => {
    const file = fileRef.current.files[0];

    if (!file) {
      return;
    }

    const filePath = await addFile(file);

    const service = {
      name: nameRef.current.value,
      descriprion: descriprionRef.current.value,
      price: priceRef.current.value,
      mesurement: mesurementRef.current.value,
      img: `/statics/${filePath}`,
    }

    dispatch(addService(service));
  }

  return (<>
    <AdminHeader />
    <h1>Новая услуга</h1>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div>
        <div>
          <label htmlFor="name" style={{marginRight: "20px"}}>Название</label>
          <input id="name" type="text" ref={nameRef} />
        </div>
        <div>
          <label htmlFor="descriprion" style={{marginRight: "20px"}}>Описание</label>
          <textarea id="descriprion" ref={descriprionRef} rows="5" ></textarea>
        </div>
        <div>
          <label htmlFor="price" style={{marginRight: "20px"}}>Цена</label>
          <input id="price" type="text" ref={priceRef} />
        </div>
        <div>
          <label htmlFor="mesurement" style={{marginRight: "20px"}}>Единица работы</label>
          <input id="mesurement" type="text" ref={mesurementRef} />
        </div>
        <div>
          <label htmlFor="file" style={{marginRight: "20px"}}>Картинка</label>
          <input id="file" type="file" ref={fileRef} accept=".webp,.jpg,.jpeg,.png,.gif" />
        </div>
        <br />
        <button onClick={() => sendForm()}>Отправить</button>
      </div>
      { sended && <div style={{padding: '15px', background: '#aceba6', marginTop: '20px'}}>Новая услуга добавлена</div> }
    </div>
  </>)
}

export default AdminService;