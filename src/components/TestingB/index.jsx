import React, { useState, useEffect } from "react";
import { Tag, Input, Tooltip, Button, Divider } from "antd";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";

import { fetchAdminMedium } from "../../features/fetchAdminMediumsSlice";

import { editAdminMedium } from "../../features/editAdminMediumSlice";

import { addMedium } from "../../features/AdminMediums/addMediumSlice";

import { deleteAdminMedium } from "../../features/AdminMediums/deleteAdminMediumSlice";

import SEC from "../Admin/SEC";

import Cities from "../Admin/Cities";

import Agency from "../Admin/Agency";

const TestingB = () => {
  const dispatch = useDispatch();
  const { adminMedium } = useSelector((res) => res);

  const initialMediums = adminMedium.items.allMediums;

  useEffect(() => {
    dispatch(fetchAdminMedium());
  }, []);
  useEffect(() => {
    setMediums(adminMedium.items.allMediums);
  }, [adminMedium.items.allMediums]);

  const [mediums, setMediums] = useState([]);

  const [editedText, setEditedText] = useState("");

  const [editId, setEditId] = useState(null);

  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    if (adminMedium.items && adminMedium.items.allMediums) {
      setMediums(adminMedium.items.allMediums);
      const highestId = adminMedium.items.allMediums.reduce(
        (max, item) => Math.max(max, item.medium_id),
        0
      );
      setNextId(highestId + 1);
    }
  }, [adminMedium.items.allMediums]);

  const handleAddMedium = () => {
    if (mediums.some((m) => m.editable)) {
      alert("Finish editing the current medium before adding a new one.");
      return;
    }

    const newMedium = {
      medium_id: nextId + 1, // Temporary unique ID for new medium
      medium_name: "", // Start with an empty name
      editable: true,
      isNew: true, // Flag indicating this is a new medium
    };

    setMediums([...mediums, newMedium]);
    setEditedText(""); // Reset editedText to be empty for the new medium
    setEditId(newMedium.medium_id); // Set editId to the new medium's ID
  };

  const handleEdit = (medium_id) => {
    if (mediums.some((m) => m.editable && m.medium_id !== medium_id)) {
      alert("Please save the currently editing row before editing another.");
      return;
    }

    const medium = mediums.find((m) => m.medium_id === medium_id);
    if (!medium) {
      console.error(`No medium found with ID ${medium_id}`);
      return;
    }

    setMediums(
      mediums.map((m) =>
        m.medium_id === medium_id ? { ...m, editable: true } : m
      )
    );
    setEditedText(medium.medium_name); // Set editedText to the medium's current name
    setEditId(medium_id); // Update editId to reflect the currently edited medium
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSave = (medium_id) => {
    const medium = mediums.find((m) => m.medium_id === medium_id);

    if (!medium) {
      console.error(`No medium found with ID ${medium_id}`);
      alert(`No medium found with ID ${medium_id}. Please check the ID.`);
      return;
    }

    if (medium.isNew) {
      handleSaveNewMedium(medium_id);
      setMediums(
        mediums.map((m) =>
          m.medium_id === medium_id
            ? { ...m, medium_name: editedText, isNew: false, editable: false }
            : m
        )
      );
      console.log("Saving a new medium:", medium);
    } else {
      console.log("Updating an existing medium:", medium);
      handleUpdateMedium(medium_id); // Standard update handling
    }

    setEditedText(""); // Clear the edit text field after saving
  };

  const handleSaveNewMedium = (medium_id) => {
    const dataToSend = {
      medium_name: editedText,
    };

    console.log("edored", editedText);
    dispatch(addMedium(dataToSend));
  };

  const handleUpdateMedium = (medium_id) => {
    const medium = mediums.find((m) => m.medium_id === medium_id);

    if (!medium) {
      console.error(`No medium found with ID ${medium_id}`);
      alert(`No medium found with ID ${medium_id}. Please check the ID.`);
      return;
    }

    console.log(`Updating medium with ID: ${medium_id}`);

    const dataToSend = {
      medium_name: editedText,
    };

    dispatch(
      editAdminMedium({
        idMedium: medium_id,
        dataMedium: dataToSend,
      })
    );

    // Update local state
    setMediums(
      mediums.map((m) =>
        m.medium_id === medium_id
          ? { ...m, medium_name: editedText, editable: false }
          : m
      )
    );
    setEditedText(""); // Clear the edit text field
  };

  const handleCancel = (medium_id) => {
    setMediums(
      mediums
        .map((m) => (m.medium_id === medium_id ? { ...m, editable: false } : m))
        .filter((m) => m.medium_name !== "" || m.medium_id !== medium_id)
    );
  };

  const handleDelete = (medium_id) => {
    setMediums(mediums.filter((m) => m.medium_id !== medium_id));
    dispatch(deleteAdminMedium(medium_id));
  };

  return (
    <div style={{ padding: "15px" }}>
      <h2>Settings</h2>
      <Divider />
      <h4>Breif Review</h4>
      <Divider />
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
          Medium(s)
        </div>
        <Button
          onClick={handleAddMedium}
          style={{ margin: "0", background: "#294799", color: "white" }} // Adjust margin as necessary
        >
          Add Medium
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
            key={medium.medium_id}
            style={{
              minWidth: "100px",
              width: medium.editable ? "auto" : "150px",
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
                  {medium.medium_name}
                </span>
              )}
              <div style={{ display: "flex", gap: 5 }}>
                {medium.editable ? (
                  <>
                    <Tooltip title="Save">
                      <CheckOutlined
                        onClick={() => handleSave(medium.medium_id)}
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Tooltip>
                    <Tooltip title="Cancel">
                      <CloseOutlined
                        onClick={() => handleCancel(medium.medium_id)}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title="Edit">
                      <img
                        src="/images/vector.png"
                        onClick={() => handleEdit(medium.medium_id)}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <img
                        src="/images/trash2.png"
                        onClick={() => handleDelete(medium.medium_id)}
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
      <SEC />
      <Cities />
      <Agency />
    </div>
  );
};

export default TestingB;
