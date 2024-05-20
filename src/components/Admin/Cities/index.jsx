import React, { useState, useEffect } from "react";
import { Tag, Input, Tooltip, Button } from "antd";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";

import { fetchAdminCities } from "../../../features/Cities/fetchAdminCitiesSlice";

import { editAdminCity } from "../../../features/Cities/editAdminCitySlice";
import { addCity } from "../../../features/Cities/addAdminCitySlice";

import { deleteCity } from "../../../features/Cities/deleteAdminCitySlice";

const Cities = () => {
  const dispatch = useDispatch();
  const { fetchSEC } = useSelector((res) => res);

  const { fetchCity } = useSelector((res) => res);

  console.log("fetchCity", fetchCity);

  useEffect(() => {
    dispatch(fetchAdminCities());
  }, []);

  useEffect(() => {
    setMediums(fetchCity.items.cities);
  }, [fetchCity.items.allSecClassRanges]);

  const [mediums, setMediums] = useState([]);

  const [editedText, setEditedText] = useState("");

  const [editId, setEditId] = useState(null);

  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    if (fetchCity.items && fetchCity.items.cities) {
      setMediums(fetchCity.items.cities);
      const highestId = fetchCity.items.cities.reduce(
        (max, item) => Math.max(max, item.city_id),
        0
      );
      setNextId(highestId + 1);
    }
  }, [fetchCity.items.cities]);

  const handleAddMedium = () => {
    if (mediums.some((m) => m.editable)) {
      alert("Finish editing the current medium before adding a new one.");
      return;
    }

    const newMedium = {
      city_id: nextId + 1, // Temporary unique ID for new medium
      city_name: "", // Start with an empty name
      editable: true,
      isNew: true, // Flag indicating this is a new medium
    };

    setMediums([...mediums, newMedium]);
    setEditedText(""); // Reset editedText to be empty for the new medium
    setEditId(newMedium.city_id); // Set editId to the new medium's ID
  };

  const handleEdit = (city_id) => {
    if (mediums.some((m) => m.editable && m.city_id !== city_id)) {
      alert("Please save the currently editing row before editing another.");
      return;
    }

    const medium = mediums.find((m) => m.city_id === city_id);
    if (!medium) {
      console.error(`No medium found with ID ${city_id}`);
      return;
    }

    setMediums(
      mediums.map((m) => (m.city_id === city_id ? { ...m, editable: true } : m))
    );
    setEditedText(medium.city_name); // Set editedText to the medium's current name
    setEditId(city_id); // Update editId to reflect the currently edited medium
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSave = (city_id) => {
    const medium = mediums.find((m) => m.city_id === city_id);

    if (!medium) {
      console.error(`No medium found with ID ${city_id}`);
      alert(`No medium found with ID ${city_id}. Please check the ID.`);
      return;
    }

    if (medium.isNew) {
      handleSaveNewMedium(city_id);
      setMediums(
        mediums.map((m) =>
          m.city_id === city_id
            ? { ...m, city_name: editedText, isNew: false, editable: false }
            : m
        )
      );
      console.log("Saving a new medium:", medium);
    } else {
      console.log("Updating an existing medium:", medium);
      handleUpdateMedium(city_id); // Standard update handling
    }

    setEditedText(""); // Clear the edit text field after saving
  };

  const handleSaveNewMedium = (city_id) => {
    const dataToSend = {
      city_name: editedText,
    };

    console.log("edored", editedText);
    dispatch(addCity(dataToSend));
  };

  const handleUpdateMedium = (city_id) => {
    const medium = mediums.find((m) => m.city_id === city_id);

    if (!medium) {
      console.error(`No medium found with ID ${city_id}`);
      alert(`No medium found with ID ${city_id}. Please check the ID.`);
      return;
    }

    console.log(`Updating medium with ID: ${city_id}`);

    const dataToSend = {
      city_name: editedText,
    };

    dispatch(
      editAdminCity({
        idMedium: city_id,
        dataMedium: dataToSend,
      })
    );

    // Update local state
    setMediums(
      mediums.map((m) =>
        m.city_id === city_id
          ? { ...m, city_name: editedText, editable: false }
          : m
      )
    );
    setEditedText(""); // Clear the edit text field
  };

  const handleCancel = (city_id) => {
    setMediums(
      mediums
        .map((m) => (m.city_id === city_id ? { ...m, editable: false } : m))
        .filter((m) => m.city_name !== "" || m.city_id !== city_id)
    );
  };

  const handleDelete = (city_id) => {
    setMediums(mediums.filter((m) => m.city_id !== city_id));
    dispatch(deleteCity(city_id));
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
          City(s)
        </div>
        <Button
          onClick={handleAddMedium}
          style={{ margin: "0", background: "#294799", color: "white" }} // Adjust margin as necessary
        >
          Add City
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
            key={medium.city_id}
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
                  {medium.city_name}
                </span>
              )}
              <div style={{ display: "flex", gap: 5 }}>
                {medium.editable ? (
                  <>
                    <Tooltip title="Save">
                      <CheckOutlined
                        onClick={() => handleSave(medium.city_id)}
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Tooltip>
                    <Tooltip title="Cancel">
                      <CloseOutlined
                        onClick={() => handleCancel(medium.city_id)}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title="Edit">
                      <img
                        src="/images/vector.png"
                        onClick={() => handleEdit(medium.city_id)}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <img
                        src="/images/trash2.png"
                        onClick={() => handleDelete(medium.city_id)}
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

export default Cities;
