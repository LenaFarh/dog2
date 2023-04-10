import cn from "classnames";
import "./index.css";



export const Form = ({submitForm, title, children, className}) => {

  return (
    <>
        <form onSubmit={submitForm} className={cn("form", `${className ?? ''}`)}>
            <h1 className="form_title">{title}</h1>
            {children}
        </form>
    </>
  );
};

