import React, { useState, useEffect, useRef } from "react";

function Text({ title, titleProps }) {
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    setWidth(elementRef.current.getBoundingClientRect().width);
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        position: "absolute",
        left: `-${width / 2 - 25}px`,
        bottom: "2rem",
        width: "max-content",
        maxWidth: "520px",
        fontSize: "16px",
        background: "rgba(0, 0, 0, .9)",
        color: "white",
        padding: "5px",
        ...titleProps,
      }}
    >
      {title}
    </div>
  );
}

function CustomTooltip({ children, title, sx, titleProps }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ position: "relative", ...sx }} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      {isOpen ? <Text title={title} titleProps={titleProps} /> : null}
      {children}
    </div>
  );
}

export default CustomTooltip;
