import { PropsInterface } from "../../interfaces/PropsInterface";
import BlogForm from "../BlogForm/BlogForm";

function AuthorCreateForm(props: PropsInterface) {
  return <BlogForm formName="authorCreateForm" />;
}

export default AuthorCreateForm;
