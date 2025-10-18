import { useRef } from "react";
import { useDispatch } from "react-redux";
import { sendComment } from "../../api/blogs";

function AddComment({ id }) {
  const textareaRef = useRef();
  const dispatch = useDispatch();

  const send = () => {
    const text = textareaRef.current.value;

    if (!text) {
      return;
    }

    dispatch(sendComment({id, text}));
    textareaRef.current.value = "";
  }

  return (<div>
    <textarea style={{marginTop: "10px", width: "100%", minHeight: "100px"}} ref={textareaRef}></textarea>
    <button style={{marginTop: "10px"}} onClick={() => send()}>Отправить</button>
  </div>);
}

export default AddComment;