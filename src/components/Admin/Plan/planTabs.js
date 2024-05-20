import React from "react";
import ApprovedPlan from "./ApprovedPlan";
import LostPlan from "./LostPlan";

const PlanTabs = ({ tab, navigate, dispatch }) => {
  return (
    <>
      {tab === "lost" && <LostPlan navigate={navigate} dispatch={dispatch} />}
      {tab === "approved" && (
        <ApprovedPlan navigate={navigate} dispatch={dispatch} />
      )}
    </>
  );
};

export default PlanTabs;
