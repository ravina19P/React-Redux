import axios from 'axios'
import axiosInstance from '../AxiosInterceptor/axiosInterceptor';
const GetData = async () => {
    try {
        // const responce = await axios.get("https://onlinetestapi.gerasim.in/api/Ecomm/GetAllCategory");
        const responce = await axios.get("https://onlinetestapi.gerasim.in/api/Ecomm/GetAllCategory");
        // const responce = await axios.get(`${process.env.REACT_APP_BASEURL}/GetAllCategory`);
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetData };

const getMobileData = async () => {
    try {
        const response = await axiosInstance.get("https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId?id=1");
        return response.data.data
    } catch (error) {
        console.error("Error fetching mobile data:", error);
    }
};

export { getMobileData }
const GetCameraData = async () => {
    try {
        const response = await axiosInstance.get("https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId?id=2");
        return response.data.data
    } catch (error) {
        console.error("Error fetching mobile data:", error);
    }
};

export { GetCameraData }
const GetTabletData = async () => {
    try {
        const response = await axiosInstance.get("https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId?id=3");
        return response.data.data
    } catch (error) {
        console.error("Error fetching mobile data:", error);
    }
};

export { GetTabletData }
const GetLaptopData = async () => {
    try {
        const response = await axiosInstance.get("https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId?id=4");
        return response.data.data
    } catch (error) {
        console.error("Error fetching mobile data:", error);
    }
};

export { GetLaptopData }

const GetMonitorData = async () => {
    try {
        const response = await axiosInstance.get("https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId?id=5");
        return response.data.data
    } catch (error) {
        console.error("Error fetching mobile data:", error);
    }
};

export { GetMonitorData }

const DeleteProduct = async (productId) => {
    try {
        const responce = await axios.get("https://onlinetestapi.gerasim.in/api/Ecomm/DeleteProductById", { params: { id: productId } });
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
}
export { DeleteProduct }
const CreateCategory = async () => {
    try {
        const responce = await axiosInstance.post('https://onlinetestapi.gerasim.in/api/Ecomm/CreateNewCategory');
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
}
export { CreateCategory }
const DeleteProductFromCartById = async (productId) => {
    try {
        const responce = await axiosInstance.get('https://onlinetestapi.gerasim.in/api/Ecomm/DeleteProductFromCartById', { params: { id: productId } });
        console.log(responce);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
}
export { DeleteProductFromCartById }

const commonAPi = async (id) => {
    try {
      const response = await axiosInstance.get(`https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId?id=${id}`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
    }
  }
const getParamspair = () => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const params1 = new URLSearchParams(url.search);
    const pramspair = {};
    params1.forEach((value, key) => {
        console.log(value, key);
        pramspair[key] = value
    });
    return pramspair;
}
export {commonAPi,getParamspair};