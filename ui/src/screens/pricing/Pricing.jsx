import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import FilterPane from '../common/FilterPane';
import DataTable from '../common/DataTable';
import { CircularProgress } from '@mui/material';
import Service from '../../services/Service';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, setSelectedCategory } from '../../redux/slices/ProductSlice';
import { TABLE_COL_CONFIG } from '../../constants';
import "../../styles/product/Product.css";


const Pricing = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.product.searchValue);
  const selectedCategory = useSelector((state) => state.product.selectedCategory);

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);


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

  return (
    <div className='product-container'>
      <Header title={"Price Optimization Tools"} userName={"Amish Singh"} />

      <FilterPane
        title="Pricing Optimization"
        categories={categories}
        onSearchChange={(value) => { }}
        onCategoryChange={(value) => { }}
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
            />
          )
        )}

      </div>

    </div>
  )
}

export default Pricing