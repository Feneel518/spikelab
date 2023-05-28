import React from "react";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import Link from "next/link";

const StudioNavbar = (props) => {
  return (
    <div>
      <div className="p-5 ">
        <Link href={"/"} className="flex items-center gap-3">
          <UTurnLeftIcon className="h-6 w-6 rotate-90 text-primary" />
          <h1 className="text-lg text-primary">Go To Website</h1>
        </Link>
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  );
};

export default StudioNavbar;
