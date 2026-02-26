import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Grid, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

const formDataSkeleton = {
    product_name: '',
    category_name: '',
    cost_price: '',
    selling_price: '',
    description: '',
    stock_available: '',
    units_sold: ''
};

const ProductPopup = ({ open, handleClose, handleUpsert, actionButtonLabel, formProp }) => {
    const [formData, setFormData] = useState(formDataSkeleton);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        handleUpsert(formData);
        handleClose();
    };

    useEffect(() => {
        if (formProp)
            setFormData(formProp);
    }, [formProp]);
    useEffect(() => {
        return () => setFormData(formDataSkeleton);
    }, [])

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{ '& .MuiPaper-root': { backgroundColor: '#232323', color: '#d5d5e5', borderRadius: '8px' } }}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#06d6af' }}>
                {actionButtonLabel == "Add" ? "Add New " : "Update " }Product
                <IconButton onClick={handleClose} sx={{ color: '#06d6af' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <div className='vertical-line-popup'></div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Product Name"
                            name="product_name"
                            placeholder="Enter Product Name"
                            fullWidth
                            variant="outlined"
                            value={formData.product_name}
                            onChange={handleChange}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Product Category"
                            name="category_name"
                            placeholder="Enter Product Name"
                            fullWidth
                            variant="outlined"
                            value={formData.category_name}
                            onChange={handleChange}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Cost Price"
                            name="cost_price"
                            placeholder="xx,xxx,xxx"
                            fullWidth
                            variant="outlined"
                            value={formData.cost_price}
                            onChange={handleChange}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Selling Price"
                            name="selling_price"
                            placeholder="xx,xxx,xxx"
                            fullWidth
                            variant="outlined"
                            value={formData.selling_price}
                            onChange={handleChange}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            name="description"
                            placeholder="Enter Description"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            value={formData.description}
                            onChange={handleChange}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Available Stock"
                            name="stock_available"
                            placeholder="xx,xxx,xxx"
                            fullWidth
                            variant="outlined"
                            value={formData.stock_available}
                            onChange={handleChange}
                            sx={textFieldStyle}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Units Sold"
                            name="units_sold"
                            placeholder="xx,xxx,xxx"
                            fullWidth
                            variant="outlined"
                            value={formData.units_sold}
                            onChange={handleChange}
                            sx={textFieldStyle}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ padding: '1rem' }}>
                <Button onClick={handleClose} sx={cancelButtonStyle}>Cancel</Button>
                <Button onClick={handleSubmit} sx={addButtonStyle}>{actionButtonLabel}</Button>
            </DialogActions>
        </Dialog>
    );
};

// Custom Styles
const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#161616',
        color: '#d5d5e5',
        '& fieldset': {
            borderColor: '#06d6af',
        },
        '&:hover fieldset': {
            borderColor: '#06d6af',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#06d6af',
        }
    },
    '& .MuiInputLabel-root': {
        color: '#d5d5e5',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#06d6af',
    },
    borderRadius: '4px'
};

const cancelButtonStyle = {
    color: '#06d6af',
    border: '1px solid #06d6af',
    borderRadius: '4px',
    padding: '0.5rem 1.5rem',
    fontWeight: '600',
    '&:hover': {
        backgroundColor: '#06d6af',
        color: '#232323',
    }
};

const addButtonStyle = {
    backgroundColor: '#06d6af',
    color: '#232323',
    borderRadius: '4px',
    padding: '0.5rem 1.5rem',
    fontWeight: '600',
    '&:hover': {
        backgroundColor: '#05c4a0',
    }
};

export default ProductPopup;
