import { ADD_PRODUCT_URL, BULK_FETCH_PRODUCTS, BULK_UPDATE_PRODUCT_URL, POST } from '../constants';
import RequestBuilder from './RequestBuilder';

class Service {
    static instance = null;

    static getInstance() {
        if (this.instance === null) {
            this.instance = new Service();
        }
        return this.instance;
    }

    async fetchAllProducts() {
        return await new RequestBuilder()
            .setUrl(BULK_FETCH_PRODUCTS)
            .makeRequest();
    }

    async upsertProduct(data) {
        return await new RequestBuilder()
            .setMethod(POST)
            .setUrl(ADD_PRODUCT_URL)
            .setBody(data)
            .makeRequest();
    }

    async bulkOperation(data) {
        return await new RequestBuilder()
            .setMethod(POST)
            .setUrl(BULK_UPDATE_PRODUCT_URL)
            .setBody(data)
            .makeRequest();
    }

}

export default Service;
