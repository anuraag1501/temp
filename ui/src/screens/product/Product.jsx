import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue, setSelectedCategory } from '../../redux/slices/ProductSlice';
import "../../styles/product/Product.css";
import Header from '../common/Header';
import FilterPane from '../common/FilterPane';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalculateIcon from '@mui/icons-material/Calculate';
import Service from '../../services/Service';
import DataTable from '../common/DataTable';
import ProductPopup from './ProductPopup';
import DemandForecastPopup from './DemandForecastPopup';
import { ACTION_DELETE, ACTION_EDIT, ACTION_UPSERT, ACTION_VIEW, TABLE_COL_CONFIG } from '../../constants';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const Product = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.product.searchValue);
  const selectedCategory = useSelector((state) => state.product.selectedCategory);

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(0);

  const [actionPayload, setActionPayload] = useState([]);
  const [editObj, setEditObj] = useState(null);


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await Service.getInstance().fetchAllProducts();
      setAllProducts(data.products.sort((a, b) => a.product_name.localeCompare(b.product_name)));
    } catch (error) {
      console.log("Error ", error);
    }
    setLoading(false);
  };

  const formatHeaderName = (key) => {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleUpsertProduct = async (formData) => {
    let key = "product_name";
    if (formData.product_id)
      key = "product_id";

    setFilteredProducts([
      ...filteredProducts.filter(product => product[key] !== formData[key]),
      formData
    ].sort((a, b) => String(a.product_name).localeCompare(b.product_name)))

    setActionPayload([
      ...actionPayload.filter(pl => pl.data[key] !== formData[key]),
      { operation: ACTION_UPSERT, data: formData }
    ])
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      dispatch(setSearchValue(''));
      dispatch(setSelectedCategory(''));
    }
  }, []);

  /** Updating Columns when products change */
  useEffect(() => {
    if (!allProducts.length) return;

    const cols = Object.keys(allProducts[0]).map((key) => ({
      field: key,
      headerName: formatHeaderName(key),
    }));

    const configMap = TABLE_COL_CONFIG.reduce((acc, conf) => {
      acc[conf.name.toLowerCase().replace(/\s+/g, '_')] = conf; 
      return acc;
    }, {});

    const filteredAndSortedCols = cols
      .filter(col => !configMap[col.field]?.hidden) 
      .sort((a, b) => {
        const orderA = configMap[a.field]?.order ?? Infinity;
        const orderB = configMap[b.field]?.order ?? Infinity;
        return orderA - orderB;
      });

    setColumns(filteredAndSortedCols);
  }, [allProducts]);



  useEffect(() => {
    // Filtering All Categories
    const uniqueCategories = [...new Set(allProducts.map((p) => p.category_name))];
    setCategories(uniqueCategories);
  }, [allProducts]);

  /** Filtering products based on search value */
  useEffect(() => {
    const filtered = allProducts
      .filter(product => !selectedCategory || product.category_name === selectedCategory)
      .filter((product) =>
        Object.values(product).some((value) =>
          value.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      );

    setFilteredProducts(filtered);
  }, [searchValue, selectedCategory, allProducts]);

  const refreshPageList = () => {
    dispatch(setSearchValue(''));
    fetchProducts();
  }

  const popupButton = () => {
    return (
      <div className='pop-up-btn-div'>
        <button className='btn' onClick={() => setOpen(1)}>
          <AddCircleIcon />
          Add New Products
        </button>

        <button className='btn' onClick={() => setOpen(2)}>
          <CalculateIcon />
          Demand Forecast
        </button>
      </div>
    );
  };

  const handleAction = (rowData, action) => {
    switch (action) {

      case ACTION_VIEW:
        break;
      case ACTION_EDIT:
        setEditObj(rowData);
        setOpen(3);
        break;
      case ACTION_DELETE:
        setFilteredProducts(filteredProducts.filter(product => product.product_id != rowData.product_id))
        setActionPayload([...actionPayload, { operation: ACTION_DELETE, data: rowData }]);
        break;
    }
  }

  const uploadToServer = async () => {
    setLoading(true);
    try {
      const res = await Service.getInstance().bulkOperation(actionPayload);
      setActionPayload([]);
      toast.success("Changes Uploaded Successfully!");
    } catch (error) {
      toast.error("Some Error Occurred!");
    }
    fetchProducts();
    setLoading(false);
  }

  return (
    <div className='product-container'>
      <Header title={"Price Optimization Tools"} userName={"Amish Singh"} />

      <FilterPane
        title="Create and Manage Product"
        endAdornment={popupButton()}
        categories={categories}
        onSearchChange={(value) => dispatch(setSearchValue(value))}
        onCategoryChange={(value) => dispatch(setSelectedCategory(value))}
      />

      <div className='content-area'>
        {loading ? (

          (<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: "100%" }}>
            <CircularProgress size={100} sx={{ color: '#fff' }} />
          </span>)

        ) : (
          filteredProducts.length > 0 && columns.length > 0 && (
            <DataTable
              data={filteredProducts}
              columns={columns}
              searchValue={searchValue}
              actionPaneRequired={true}
              onActionClick={handleAction}
            />
          )
        )}

        <div className="product-footer">
          <button className='btn-action cancel-btn' onClick={refreshPageList}>Cancel</button>
          <button className='btn-action save-btn' onClick={uploadToServer}>Save</button>
        </div>
      </div>

      <ProductPopup open={open === 1} handleClose={() => setOpen(0)} handleUpsert={handleUpsertProduct} actionButtonLabel="Add" />
      <DemandForecastPopup open={open === 2} handleClose={() => setOpen(0)} />
      <ProductPopup open={open === 3} handleClose={() => setOpen(0)} handleUpsert={handleUpsertProduct} actionButtonLabel="Update" formProp={editObj} />

    </div>
  );
};

export default Product;
