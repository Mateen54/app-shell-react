import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import {
  approvedBriefApi,
  resetStatus,
} from "../../../features/acceptBrief/acceptBriefSlice";
import { rejectBriefApi } from "../../../features/rejectBreif/rejectBriefSlice";

const useBriefActions = (navigate) => {
  const dispatch = useDispatch();
  const resUpdate = useSelector((res) => res.acceptBrief);
  const rejectRes = useSelector((res) => res.rejectBrief);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reason, setReason] = useState("");
  const [dispatched, setDispatched] = useState(false);
  const [dispatchedReject, setDispatchedReject] = useState(false);

  useEffect(() => {
    if (dispatched) {
      if (resUpdate.status === "succeeded") {
        message.success("Brief approved successfully!");
        dispatch(resetStatus());
        setTimeout(() => {
          navigate("/brief-management");
        }, 2000);
      } else if (resUpdate.status === "failed") {
        message.error("Failed to approve brief.");
      }
    }
  }, [resUpdate.status, dispatched, navigate, dispatch]);

  useEffect(() => {
    if (dispatchedReject) {
      if (rejectRes.status === "succeeded") {
        message.success("Brief rejected successfully!");
        setIsModalVisible(false);
        setReason("");
        setTimeout(() => {
          navigate("/brief-management");
        }, 2000);
      } else if (rejectRes.status === "failed") {
        message.error("Failed to reject brief.");
      }
    }
  }, [rejectRes.status, dispatchedReject, navigate, dispatch]);

  const approveBrief = (briefId) => {
    setDispatched(true);
    dispatch(approvedBriefApi(briefId));
  };

  const handleAddReason = (briefId) => {
    setDispatchedReject(true);
    dispatch(rejectBriefApi({ brief_id: briefId, reason }));
  };

  return {
    isModalVisible,
    setIsModalVisible,
    reason,
    setReason,
    approveBrief,
    handleAddReason,
    setDispatchedReject,
  };
};

export default useBriefActions;
