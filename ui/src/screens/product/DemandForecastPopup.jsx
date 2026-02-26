import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DemandForecastPopup = ({ open, handleClose }) => {
  const chartData = [
    { year: 2020, demand: 2000, price: 3.0 },
    { year: 2021, demand: 1500, price: 2.8 },
    { year: 2022, demand: 1800, price: 3.1 },
    { year: 2023, demand: 2200, price: 3.3 },
    { year: 2024, demand: 2500, price: 3.5 },
  ];

  const tableData = [
    {
      name: "Jazz - Sticky Notes",
      category: "Stationary",
      costPrice: "$2.5",
      sellingPrice: "$3.3",
      availableStock: "21,200",
      unitsSold: "653121",
      forecast: "12152",
    },
    {
      name: "Gio - Note Pad",
      category: "Stationary",
      costPrice: "$1.2",
      sellingPrice: "$2.7",
      availableStock: "1,21,2123",
      unitsSold: "131244",
      forecast: "2342",
    },
  ];

  return (
    <Dialog open={open} handleClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>
        Demand Forecast
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="demand" stroke="#8884d8" name="Product Demand" />
              <Line type="monotone" dataKey="price" stroke="#82ca9d" name="Selling Price" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box mt={4}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Product Category</TableCell>
                  <TableCell>Cost Price</TableCell>
                  <TableCell>Selling Price</TableCell>
                  <TableCell>Available Stock</TableCell>
                  <TableCell>Units Sold</TableCell>
                  <TableCell>Calculated Demand Forecast</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.costPrice}</TableCell>
                    <TableCell>{row.sellingPrice}</TableCell>
                    <TableCell>{row.availableStock}</TableCell>
                    <TableCell>{row.unitsSold}</TableCell>
                    <TableCell style={{ backgroundColor: "#a5f3fc" }}>{row.forecast}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DemandForecastPopup;
