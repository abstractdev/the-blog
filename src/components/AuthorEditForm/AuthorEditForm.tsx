import { PropsInterface } from "../../interfaces/PropsInterface";
import BlogForm from "../BlogForm/BlogForm";

function AuthorEditForm(props: PropsInterface) {
  const { blogpostTitle, blogpostId } = props;
  return (
    <BlogForm
      formName="authorEditForm"
      blogpostTitle={blogpostTitle}
      blogpostId={blogpostId}
    />
  );
}

export default AuthorEditForm;
