import React from "react";
import NewBriefCmp from "./NewBriefCmp";
import ApprovedBriefCmp from "./ApprovedBriefCmp";

const BriefTabs = ({ tab, navigate, dispatch }) => {
  return (
    <>
      {tab === "new" && <NewBriefCmp navigate={navigate} dispatch={dispatch} />}
      {tab === "approved" && (
        <ApprovedBriefCmp navigate={navigate} dispatch={dispatch} />
      )}
    </>
  );
};

export default BriefTabs;
