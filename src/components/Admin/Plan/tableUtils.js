import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { setRecord } from "../../../features/recordBriefSlice";

export const getColumns = (dispatch, navigate) => [
  {
    title: "Brief Name",
    dataIndex: "brief_name",
    key: "briefName",
    render: (text) => text || "-",
  },
  {
    title: "Upload Date",
    dataIndex: ["plan", "createdAt"],
    key: "uploadDate",
    render: (createdAt) => {
      const date = new Date(createdAt);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return formattedDate;
    },
  },
  {
    title: "Uploaded by",
    dataIndex: "client",
    key: "uploadedBy",
    render: (client) => {
      return client && client.fullName ? client.fullName : "-";
    },
  },
  {
    title: "reason",
    dataIndex: ["plan", "reason"],
    key: "reason",
    render: (text) => text || "-",
  },
  //   {
  //     title: "Region",
  //     dataIndex: "regions",
  //     key: "region",
  //     render: (regions) => {
  //       if (regions && regions.length > 0) {
  //         if (regions.length === 1) {
  //           return regions[0].region_name;
  //         } else {
  //           return `${regions[0].region_name} +${regions.length - 1}`;
  //         }
  //       }
  //       return "-";
  //     },
  //   },
  //   {
  //     title: "City",
  //     dataIndex: "cities",
  //     key: "city",
  //     render: (cities) => {
  //       if (cities && cities.length > 0) {
  //         if (cities.length === 1) {
  //           return cities[0].city_name;
  //         } else {
  //           return `${cities[0].city_name} +${cities.length - 1}`;
  //         }
  //       }
  //       return "-";
  //     },
  //   },
  //   {
  //     title: "Medium",
  //     dataIndex: "mediums",
  //     key: "medium",
  //     render: (mediums) => {
  //       if (mediums && mediums.length > 0) {
  //         if (mediums.length === 1) {
  //           return mediums[0].medium_name;
  //         } else {
  //           return `${mediums[0].medium_name} +${mediums.length - 1}`;
  //         }
  //       }
  //       return "-";
  //     },
  //   },
];

export const getColumnsApproved = () => [
  {
    title: "Brief Name",
    dataIndex: "brief_name",
    key: "briefName",
    render: (text) => text || "-",
  },
  {
    title: "Upload at",
    dataIndex: ["plan", "createdAt"],
    key: "uploadAt",
    render: (createdAt) => {
      const date = new Date(createdAt);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return formattedDate;
    },
  },
  {
    title: "Uploaded by",
    dataIndex: "client",
    key: "uploadedBy",
    render: (client) => {
      return client && client.fullName ? client.fullName : "-";
    },
  },
];

export const paginationConfig = {
  pageSize: 10,
  showSizeChanger: false,
  showQuickJumper: false,
  showTotal: (total, range) =>
    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
};
