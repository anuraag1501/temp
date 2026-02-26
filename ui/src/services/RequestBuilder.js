import axios from 'axios';
import { BASE_URL, GET } from '../constants';


class RequestBuilder {
  constructor() {
    this.baseUrl = BASE_URL; 
    this.method = GET;
    this.headers = {
      'Content-Type': 'application/json',
    };
    this.body = null;
    this.url = '';
  }

  // Method to set the HTTP method (GET, POST, etc.)
  setMethod(method) {
    this.method = method;
    return this;
  }

  // Method to set the request body
  setBody(body) {
    this.body = body;
    return this;
  }

  // Method to set the URL path (additional path after the base URL)
  setUrl(urlPath) {
    this.url = `${this.baseUrl}${urlPath}`;
    return this;
  }

  // Method to set headers
  setHeaders(headers) {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  // Method to make the API request
  async makeRequest() {
    try {
      const response = await axios({
        method: this.method,
        url: this.url,
        headers: this.headers,
        data: this.body,
      });
      return response.data;
    } catch (error) {
      console.error('API call failed', error);
      throw error;
    }
  }
}

export default RequestBuilder;
