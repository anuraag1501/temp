import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "../../styles/common/DataTable.css";
import { searchAndHighlight } from '../../utils/utils';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ACTION_DELETE, ACTION_EDIT, ACTION_VIEW } from '../../constants';


const DataTable = ({ data, columns, searchValue, actionPaneRequired = false, onActionClick }) => {
    return (
        <TableContainer component={Paper} sx={{ width: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#161616" }}>
                        {columns.map((column, index) => (

                            <TableCell key={index} sx={{
                                fontSize: "1.2em",
                                height: "4vh",
                                fontWeight: "600",
                                color: '#d5d5e5',
                                backgroundColor: "#161616",
                                borderRight: !actionPaneRequired && index == columns.length - 1 ? "none" : '1px solid #d5d5e5',
                                width: column.width || "auto"
                            }}>
                                {column.headerName}
                            </TableCell>

                        ))}

                        {
                            actionPaneRequired &&
                            <TableCell
                                key="action_header"
                                sx={{
                                    fontSize: "1.2em",
                                    height: "4vh",
                                    fontWeight: "600",
                                    color: '#d5d5e5',
                                    backgroundColor: "#161616",
                                    width: "auto"
                                }}>
                                Action
                            </TableCell>
                        }

                    </TableRow>
                </TableHead>
                <TableBody>

                    {data.map((row, rowIndex) => (

                        <TableRow key={rowIndex} sx={{ backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f2f2f2' }}>
                            {columns.map((column, colIndex) => (

                                <TableCell
                                    key={colIndex}
                                    sx={{
                                        color: "#161616",
                                        height: "4vh",
                                        fontSize: "1.1em",
                                        borderRight: '1px solid #161616'
                                    }}
                                >
                                    {searchAndHighlight(row[column.field], searchValue)}
                                </TableCell>

                            ))}

                            {
                                actionPaneRequired &&
                                <TableCell
                                    key={rowIndex}
                                    sx={{
                                        color: "#161616",
                                        height: "4vh",
                                        fontSize: "1.1em",
                                        borderRight: '1px solid #161616'
                                    }}
                                >
                                    <div className='action-tab-container'>
                                        <VisibilityIcon onClick={() => onActionClick(row, ACTION_VIEW)} />
                                        <EditIcon onClick={() => onActionClick(row, ACTION_EDIT)} />
                                        <DeleteIcon sx={{ color: "red" }} onClick={() => onActionClick(row, ACTION_DELETE)} />
                                    </div>

                                </TableCell>
                            }

                        </TableRow>

                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
