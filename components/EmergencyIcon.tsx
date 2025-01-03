import React from "react";

type props = {
  emergency: string;
};

const EmergencyIcon = (props: props) => {
  const { emergency } = props;

  if (emergency === "low") {
    return (
      <div className="flex items-center gap-2">
        <span>low</span>
      </div>
    );
  } else if (emergency === "middle") {
    return (
      <div className="flex items-center gap-2">
        <span>middle</span>
      </div>
    );
  } else if (emergency === "high") {
    return (
      <div className="flex items-center gap-2">
        <span>high</span>
      </div>
    );
  }
};

export default EmergencyIcon;
