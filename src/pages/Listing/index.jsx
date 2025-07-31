import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

const Listing = () => {
  const COURT_HALL_NUMBER = 0;
  const COLUMN = {
    CourtHall: 0,
    List: 1,
    SERIAL: 2,
  };
  // pull from local storage
  // localStorage.setItem(
  //   "myCases",
  //   JSON.stringify([
  //     { ch: "21", list: "", serial: "" },
  //     { ch: "21", list: "1", serial: "2" },
  //   ])
  // );
  // const casesAllotted = [
  //   { ch: "21", list: "", serial: "" },
  //   { ch: "21", list: "1", serial: "2" },
  // ];

  const casesAllotted = JSON.parse(localStorage.getItem("myCases") || "[]");

  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.rainkart.in/")
      .then((res) => res.json())
      .then((data) => {
        if (data.tables) {
          setTables(data.tables);
        } else {
          setError("No tables found in the API response.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data from the API.");
        setLoading(false);
      });
  }, []);

  const isMatchingRow = (cell) => {
    const court = cell[COLUMN.CourtHall];
    const list = cell[COLUMN.List];
    const serialNumber = cell[COLUMN.SERIAL];

    if (
      casesAllotted?.some(
        (x) => x.ch === court && x.list === list && x.serial === serialNumber
      )
    )
      return true;
    return false;
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Karnataka Judiciary Display Board
      </Typography>

      {tables.slice(0, 2).map((table, index) => (
        <Paper elevation={3} sx={{ p: 2, mb: 4 }} key={index}>
          <Typography variant="h6" gutterBottom>
            Table {index + 1}
          </Typography>

          <Table size="small">
            <TableBody>
              {table.rows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    backgroundColor:
                      rowIndex > 0 && isMatchingRow(row) ? "green" : "#ffffff",
                  }}
                >
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      sx={{
                        fontWeight: rowIndex === 0 ? "bold" : "normal",
                        backgroundColor: rowIndex === 0 ? "#f5f5f5" : "inherit",
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ))}
    </Container>
  );
};

export default Listing;
