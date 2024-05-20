import React from "react";

import OngoingCampaign from "./OngoingCampaign";

const CampaignTabs = ({ tab, navigate, dispatch, response }) => {
  return (
    <>
      {tab === "ongoing" && (
        <OngoingCampaign
          navigate={navigate}
          dispatch={dispatch}
          response={response}
        />
      )}
      {tab === "completed" && "saS"}
    </>
  );
};

export default CampaignTabs;
