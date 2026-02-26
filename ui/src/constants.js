
/**
 * Base URL for the API
 */
export const BASE_URL = 'http://127.0.0.1:5000/';

/**
 * HTTP Methods
 */
export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";




/**
 * URLS ROTUES
 */

export const BULK_FETCH_PRODUCTS = "products/getAll";
export const ADD_PRODUCT_URL = "products/upsert";
export const BULK_UPDATE_PRODUCT_URL = "products/bulk";



/**
 * ACTIONS CONSTANTS
 */

export const ACTION_VIEW = "view";
export const ACTION_EDIT = "edit";
export const ACTION_DELETE = "delete";
export const ACTION_UPSERT = "upsert";


export const TABLE_COL_CONFIG = [
    {name: "Product Id", hidden: true, order: 1},
    {name: "Product Name", order: 1},
    {name: "Description", order: 2},
    {name: "Category Name", order: 3}
]

export const filterSearchProps = {
    "& .MuiOutlinedInput-root": {
        height: "4vh",
        width: "12vw",
        backgroundColor: "#1a1a1a", // Dark background
        color: "#ffffff", // White text
        "& fieldset": { borderColor: "#06d6af" }, // Green border
        "&:hover fieldset": { borderColor: "#06d6af" },
        "&.Mui-focused fieldset": { borderColor: "#06d6af !important" }, // Override MUI's blue focus
    },
    "& input": {
        color: "#ffffff", // Ensure text is white
    }
};

export const dropdownStyles = {
    width: "12vw",
    height: "4vh",
    color: "#ffffff",
    border: "1px solid #06d6af",
    backgroundColor: "#1a1a1a",
    "& .MuiSelect-select": { color: "#ffffff" },
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#1a1a1a",
        "& fieldset": { borderColor: "#06d6af" },
        "&:hover fieldset": { borderColor: "#06d6af" },
        "&.Mui-focused fieldset": { borderColor: "#06d6af !important" },
    },
    "& .MuiSvgIcon-root": { color: "#ffffff" },
}

export const dropdownMenuProps = {
    PaperProps: {
        sx: {
            backgroundColor: "#1a1a1a",
            "& .MuiMenuItem-root": {
                color: "#ffffff",
                "&:hover": { backgroundColor: "#333333" },
            },
        },
    },
}
