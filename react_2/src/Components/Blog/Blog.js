import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../../api/blogs";
import { useParams } from "react-router";
import AddComment from "../AddComment/AddComment";

function Blog() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector(state => state.blogs.blog);
  const comments = useSelector(state => state.blogs.comments);
  
  useEffect(() => {
    dispatch(getBlog(id));
  }, [dispatch, id]);

  return (<>
    <h1>{ blog.title }</h1>
    <p>{ blog.text }</p>
    <h3>Комментарии</h3>
    { comments?.map((x, index) => <p style={{borderBottom: 'solid 1px #000'}} key={index}>{ x }</p>)}
    <AddComment id={id} />
  </>);
}

export default Blog;