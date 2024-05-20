// tableUtils.js
export const getNestedValue = (obj, path) => {
  return path.reduce((acc, part) => acc && acc[part], obj);
};

export const getColumns = () => [
  {
    title: "Campaign Name",
    dataIndex: "campaign_name",
    key: "campaign_name",
    render: (text) => text || "-",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text, record) => {
      if (record.key === "search-row") {
        return text;
      }
      if (!text) return "-";
      const date = new Date(text);
      if (isNaN(date)) return "-"; // Handle invalid date
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
  {
    title: "Client",
    dataIndex: "client_fullName",
    key: "client_fullName",
    render: (text) => text || "-",
  },
  {
    title: "Region",
    dataIndex: "regions",
    key: "regions",
    render: (regions) => {
      if (!regions || regions.length === 0) return "-";
      // Safe access using optional chaining
      const firstRegion = regions[0]?.regions;
      const remainingCount = regions.length - 1;
      return `${firstRegion ?? "-"}${
        remainingCount > 0 ? ` + ${remainingCount} more` : ""
      }`;
    },
  },

  {
    title: "City",
    dataIndex: "city",
    key: "city",
    render: (text) => text || "-",
  },
  {
    title: "Sites",
    dataIndex: "sites",
    key: "sites",
    render: (text) => text || "-",
  },
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
    dataIndex: "date",
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
