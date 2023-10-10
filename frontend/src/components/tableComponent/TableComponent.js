import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";
import { getTableData } from "../../services/service";

export const TableComponent = (props) => {
  const [jsonData, setJsonData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const columnNames = [
    "Student",
    "Naziv diplomskog rada",
    "Datum odbrane",
    "Mentor",
    "Resursi",
  ];

  const clickHandler = (event, rowIndex) => {
    if (props.setThesis) {
      setSelectedRow(rowIndex);
      props.setThesis(jsonData[rowIndex]);
    }
  };

  useEffect(() => {
    getTableData(setJsonData);
  }, [props.updated]);

  useEffect(() => {
    const dataArray = [
      columnNames,
      ...jsonData.map((item) => {
        if (
          props.teacher === undefined || props?.teacher.id ===
          item.committee_members?.find(
            (member) => member.committee_member_type?.type === "Mentor"
          ).teacher.id
        ) {
          const student = item.thesis?.student;
          const thesis = item.thesis;

          const mentor = item?.committee_members?.find(
            (member) => member.committee_member_type.type === "Mentor"
          ).teacher;
          const resourceLinks = item.thesis.resources?.map((resource) => {
            const resourceType = resource.resource_type.type;
            const resourceFile = resource.resource_file;
            const published = resource.published;
            if (resourceType === "PDF") {
              return (
                <>
                  <a
                    style={{
                      color: published ? "#8D8741" : "rgb(192,192,192)",
                      fontWeight: "bold",
                    }}
                    key={resource.id}
                    href={published ? resourceFile : undefined}
                    download={published}
                    target="_blank"
                  >
                    PDF
                  </a>{" "}
                </>
              );
            } else if (resourceType === "ZIP") {
              return (
                <>
                  <a
                    style={{
                      color: published ? "#8D8741" : "rgb(192,192,192)",
                      fontWeight: "bold",
                    }}
                    key={resource.id}
                    href={published ? resourceFile : undefined}
                    download={published}
                  >
                    ZIP
                  </a>{" "}
                </>
              );
            } else if (resourceType === "PTT") {
              return (
                <>
                  <a
                    style={{
                      color: published ? "#8D8741" : "rgb(192,192,192)",
                      fontWeight: "bold",
                    }}
                    key={resource.id}
                    href={published ? resourceFile : undefined}
                    download={published}
                  >
                    PTT
                  </a>{" "}
                </>
              );
            }
          });
          return [
            `${student.name} ${student.surname} (${student.index_number})`,
            thesis.thesis_title,
            thesis.defense_date,
            `${mentor.name} ${mentor.surname}`,
            resourceLinks, // No need for .join(", ") here
          ];
        }
      }),
    ];
    setData(dataArray);
  }, [jsonData]);

  return (
    <TableContainer
      sx={{ height: "100%", maxHeight: "52vh" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{ position: "sticky", top: 0, backgroundColor: "white" }}
          >
            {data[0]?.map((columnName, columnIndex) => (
              <TableCell key={columnIndex} sx={{ fontWeight: "bold" }}>
                {columnName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(1)?.map((rowData, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={(event) => clickHandler(event, rowIndex)}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                ":hover": { backgroundColor: "#f0f0f0", cursor: "pointer" },
                backgroundColor:
                  selectedRow === rowIndex ? "#f0f0f0" : "inherit",
              }}
            >
              {rowData?.map((cellData, cellIndex) => (
                <TableCell key={cellIndex}>{cellData}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
