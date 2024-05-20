import React, { useState, useEffect } from "react";
import { Tag, Input, Tooltip, Button } from "antd";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";

import { deleteAdminMedium } from "../../../features/AdminMediums/deleteAdminMediumSlice";

import { fetchAdminSEC } from "../../../features/AdminSEC/fetchAdminSECSlice";

import { addSEC } from "../../../features/AdminSEC/addAdminSECSlice";

import { editAdminSEC } from "../../../features/AdminSEC/editAdminSecSlice";

import { deleteAdminSEC } from "../../../features/AdminSEC/deleteSECSlice";

const SEC = () => {
  const dispatch = useDispatch();
  const { fetchSEC } = useSelector((res) => res);

  const initialMediums = fetchSEC.items.allSecClassRanges;

  useEffect(() => {
    dispatch(fetchAdminSEC());
  }, []);

  console.log("fetchSEC", fetchSEC);

  useEffect(() => {
    setMediums(fetchSEC.items.allSecClassRanges);
  }, [fetchSEC.items.allSecClassRanges]);

  const [mediums, setMediums] = useState([]);

  const [editedText, setEditedText] = useState("");

  const [editId, setEditId] = useState(null);

  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    if (fetchSEC.items && fetchSEC.items.allSecClassRanges) {
      setMediums(fetchSEC.items.allSecClassRanges);
      const highestId = fetchSEC.items.allSecClassRanges.reduce(
        (max, item) => Math.max(max, item.sec_id),
        0
      );
      setNextId(highestId + 1);
    }
  }, [fetchSEC.items.allSecClassRanges]);

  const handleAddMedium = () => {
    if (mediums.some((m) => m.editable)) {
      alert("Finish editing the current medium before adding a new one.");
      return;
    }

    const newMedium = {
      sec_id: nextId + 1, // Temporary unique ID for new medium
      sec_range: "", // Start with an empty name
      editable: true,
      isNew: true, // Flag indicating this is a new medium
    };

    setMediums([...mediums, newMedium]);
    setEditedText(""); // Reset editedText to be empty for the new medium
    setEditId(newMedium.sec_id); // Set editId to the new medium's ID
  };

  const handleEdit = (sec_id) => {
    if (mediums.some((m) => m.editable && m.sec_id !== sec_id)) {
      alert("Please save the currently editing row before editing another.");
      return;
    }

    const medium = mediums.find((m) => m.sec_id === sec_id);
    if (!medium) {
      console.error(`No medium found with ID ${sec_id}`);
      return;
    }

    setMediums(
      mediums.map((m) => (m.sec_id === sec_id ? { ...m, editable: true } : m))
    );
    setEditedText(medium.sec_range); // Set editedText to the medium's current name
    setEditId(sec_id); // Update editId to reflect the currently edited medium
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSave = (sec_id) => {
    const medium = mediums.find((m) => m.sec_id === sec_id);

    if (!medium) {
      console.error(`No medium found with ID ${sec_id}`);
      alert(`No medium found with ID ${sec_id}. Please check the ID.`);
      return;
    }

    if (medium.isNew) {
      handleSaveNewMedium(sec_id);
      setMediums(
        mediums.map((m) =>
          m.sec_id === sec_id
            ? { ...m, sec_range: editedText, isNew: false, editable: false }
            : m
        )
      );
      console.log("Saving a new medium:", medium);
    } else {
      console.log("Updating an existing medium:", medium);
      handleUpdateMedium(sec_id); // Standard update handling
    }

    setEditedText(""); // Clear the edit text field after saving
  };

  const handleSaveNewMedium = (sec_id) => {
    const dataToSend = {
      sec_range: editedText,
    };

    console.log("edored", editedText);
    dispatch(addSEC(dataToSend));
  };

  const handleUpdateMedium = (sec_id) => {
    const medium = mediums.find((m) => m.sec_id === sec_id);

    if (!medium) {
      console.error(`No medium found with ID ${sec_id}`);
      alert(`No medium found with ID ${sec_id}. Please check the ID.`);
      return;
    }

    console.log(`Updating medium with ID: ${sec_id}`);

    const dataToSend = {
      sec_range: editedText,
    };

    dispatch(
      editAdminSEC({
        idMedium: sec_id,
        dataMedium: dataToSend,
      })
    );

    // Update local state
    setMediums(
      mediums.map((m) =>
        m.sec_id === sec_id
          ? { ...m, sec_range: editedText, editable: false }
          : m
      )
    );
    setEditedText(""); // Clear the edit text field
  };

  const handleCancel = (sec_id) => {
    setMediums(
      mediums
        .map((m) => (m.sec_id === sec_id ? { ...m, editable: false } : m))
        .filter((m) => m.sec_range !== "" || m.sec_id !== sec_id)
    );
  };

  const handleDelete = (sec_id) => {
    setMediums(mediums.filter((m) => m.sec_id !== sec_id));
    dispatch(deleteAdminSEC(sec_id));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          alignItems: "center",
        }}
      >
        {/* Placeholder for Medium(s) or Input Field */}
        <div style={{ flexGrow: 1, marginRight: "10px" }}>
          {" "}
          {/* If you have an input field, it should go here */}
          SEC(s)
        </div>
        <Button
          onClick={handleAddMedium}
          style={{ margin: "0", background: "#294799", color: "white" }} // Adjust margin as necessary
        >
          Add SEC
        </Button>
      </div>

      <div
        style={{
          border: "1px solid #C8C4C4",
          height: "auto",
          display: "flex",
          flexWrap: "wrap",
          paddingTop: "10px",
          paddingBottom: "40px",
          borderRadius: "10px",
        }}
      >
        {mediums?.map((medium) => (
          <div
            key={medium.sec_id}
            style={{
              minWidth: "100px",
              width: medium.editable ? "auto" : "auto",
              margin: "5px",
            }}
          >
            <Tag
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: medium.editable ? "white" : "#294799",
                color: medium.editable ? "black" : "white",
                padding: "5px 10px",
                borderRadius: "5px",
                width: "100%",
                height: "32px",
                borderRadius: "30px",
              }}
              closable={false}
            >
              {medium.editable ? (
                <Input
                  autoFocus
                  value={editedText}
                  onChange={handleTextChange}
                  style={{
                    flex: 1,
                    border: "none",
                    boxShadow: "none",
                    height: "28px",
                    padding: 0,
                  }}
                />
              ) : (
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {medium.sec_range}
                </span>
              )}
              <div style={{ display: "flex", gap: 5 }}>
                {medium.editable ? (
                  <>
                    <Tooltip title="Save">
                      <CheckOutlined
                        onClick={() => handleSave(medium.sec_id)}
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Tooltip>
                    <Tooltip title="Cancel">
                      <CloseOutlined
                        onClick={() => handleCancel(medium.sec_id)}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title="Edit">
                      <img
                        src="/images/vector.png"
                        onClick={() => handleEdit(medium.sec_id)}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <img
                        src="/images/trash2.png"
                        onClick={() => handleDelete(medium.sec_id)}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </>
                )}
              </div>
            </Tag>
          </div>
        ))}
      </div>
    </>
  );
};

export default SEC;
