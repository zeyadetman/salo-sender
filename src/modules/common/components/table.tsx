import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export enum OrderStatus {
  PENDING = "PENDING",
  PICKED_UP = "PICKED_UP",
  DROPPED_OFF = "DROPPED_OFF",
}

export const DataTable = ({ rows }: { rows: any[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Parcel ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">
                <Typography
                  color={
                    OrderStatus.DROPPED_OFF === row?.Order?.status
                      ? "green"
                      : ""
                  }
                >
                  {row?.Order?.status === OrderStatus.DROPPED_OFF ? (
                    <Typography color="green">Delivered</Typography>
                  ) : row?.Order?.status === OrderStatus.PICKED_UP ? (
                    <Typography color="blue">Picked up</Typography>
                  ) : (
                    <Typography color="orange">Pending to picked up</Typography>
                  )}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
