import "./style.css";

import { CSSTransition } from "react-transition-group";
import React from "react";

function Fade(props) {
  return (
    <CSSTransition unmountOnExit timeout={2000} classNames="fade" {...props} />
  );
}

function HiddenMessage({ children }) {
  const [show, setShow] = React.useState(false);
  const toggle = () => setShow((s) => !s);
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <Fade in={show}>
        <div>{children}</div>
      </Fade>
    </div>
  );
}

export { HiddenMessage };
