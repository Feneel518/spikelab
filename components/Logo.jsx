import React from "react";

const Logo = (props) => {
  const { renderDefault, title } = props;
  return (
    <div className="flex items-center space-x-2">
      <h1>Hello</h1>
      {renderDefault && <>{renderDefault(props)}</>}
    </div>
  );
};

export default Logo;
