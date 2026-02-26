import React from 'react';
import { Search } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { dropdownMenuProps, dropdownStyles, filterSearchProps } from '../../constants';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import "../../styles/common/FilterPane.css";

const FilterPane = ({ title, endAdornment, categories, onSearchChange, onCategoryChange }) => {
    const navigate = useNavigate();

    return (
        <div className='filterpane-container'>
            <div className='info-div'>
                <div className='back-btn' onClick={() => navigate("/")}>
                    <KeyboardDoubleArrowLeftIcon />
                    <span className='btn-text'>Back</span>
                </div>

                <div className="vertical-line"></div>

                <div className='title'>
                    {title}
                </div>
            </div>

            <div className='filter-div'>
                <div className='toggle-info'>
                    <ToggleOnIcon sx={{ fontSize: "2em" }} />
                    <span className='info'>
                        With Demand Forecast
                    </span>
                </div>

                {/* Search Box */}
                <div className='search-box-div'>
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        sx={filterSearchProps}
                        onChange={(e) => onSearchChange(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: "#06d6af" }} />
                                </InputAdornment>
                            )
                        }}
                    />
                </div>

                {/* Category Dropdown */}
                <div className="category-div">
                    <span className='category-info'>Category:</span>

                    <Select
                        onChange={(e) => onCategoryChange(e.target.value)}
                        displayEmpty
                        sx={dropdownStyles}
                        MenuProps={dropdownMenuProps}
                    >
                        {categories.length > 0 ? (
                            [
                                ...(categories.length > 1
                                    ? [<MenuItem key="default" value="">Select All</MenuItem>]
                                    : []),
                                ...categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))
                            ]
                        ) : (
                            <MenuItem disabled>No Categories Available</MenuItem>
                        )}
                    </Select>
                </div>

                <div className="filter-icon-div">
                    <FilterAltIcon sx={{ fontSize: "1.2em", color: "#06d6af" }} />
                    <span className='filter-label'>Filter</span>
                </div>

                {endAdornment && (
                    <div className='endAdornment-div'>
                        <div className="vertical-line mr-fix"></div>
                        {endAdornment}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterPane;
