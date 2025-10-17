import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBlog } from "../../api/blogs";
import { v4 as uuid } from "uuid"
import AdminHeader from "../AdminHeader/AdminHeader";

function AdminBlog() {
  const sended = useSelector(state => state.blogs.isBlogAdded);
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const previewRef = useRef(null);
  const textRef = useRef(null);  

  const sendBlog = () => {
    const blog = {
      guid: uuid(),
      title: titleRef.current.value,
      preview: previewRef.current.value,
      text: textRef.current.value,
      comments: []
    }

    dispatch(addBlog(blog));
  }

  return (<>
    <AdminHeader />
    <h1>Новый блог</h1>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div>
        <div>
          <label htmlFor="title" style={{marginRight: "20px", width: "80px", display: "inline-block"}}>Название</label>
          <input id="title" type="text" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="preview" style={{marginRight: "20px", width: "80px", display: "inline-block"}}>Превью</label>
          <textarea id="preview" ref={previewRef} rows="5" ></textarea>
        </div>
        <div>
          <label htmlFor="text" style={{marginRight: "20px", width: "80px", display: "inline-block"}}>Текст</label>
          <textarea id="text" ref={textRef} rows="5" ></textarea>
        </div>
        <br />
        <button onClick={() => sendBlog()}>Отправить</button>
      </div>
    { sended && <div style={{padding: '15px', background: '#aceba6', marginTop: '20px'}}>Новая статья добавлена</div> }
    </div>
  </>)
}

export default AdminBlog;