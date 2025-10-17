import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../api/blogs";
import Subscribtion from "../Subscribtion/Subscribtion";
import { NavLink } from "react-router";

function Blogs() {
  const dispatch = useDispatch();

  const blogs = useSelector(state => state.blogs.blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (<>
    <h1>Блоги</h1>
    { blogs.map(x => 
      <div>
        <h2>{x.title}</h2>
        <p>{x.preview}</p>
        <NavLink to={`/blogs/${x.id}`}>Читать полностью</NavLink>
      </div>) }
    <Subscribtion />
  </>);
}

export default Blogs;