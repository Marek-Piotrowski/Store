import axios, {AxiosError, AxiosResponse} from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

axios.defaults.baseURL = "https://localhost:7271/api/";
// to set a cookie from our client side, this is for cors purpose.
// we have added it also on the API side -> Startup.cs-> AllowCredentials()
axios.defaults.withCredentials = true;

// attach token to request header
axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;

    if(token) config.headers!.Authorization = `Bearer ${token}`;

    return config;
})

// we are caching the response
axios.interceptors.response.use(response => {

    const pagination = response.headers['pagination'];
    if(pagination){
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        //console.log(response)
        return response;
    }
    return response;
}, (error: AxiosError) =>{
    // ! na koncu nadpisuje typescript z bledem, czasem warto z tego korzystac, bo nie mamy 100% pokrycia kody typscriptem. W tym przypadku wiemy jaki typ otrzymamy, ze bedzie to typ bledu
    const {data, status} = error.response!;


    switch (status) {
        case 400:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
                // to return strings av array
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title );
            break;
        case 404:
            //toast.error(data.title || "Unauthorised 404");
            break;
        case 500:
            console.log("I co Ty na to brachu");
            window.location.pathname = "/server-error";


            break;

        default:
            break;
    }

    return Promise.reject(error.response);
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get:(url: string, params?: URLSearchParams) => axios.get(url,{params}).then(responseBody),
    post:(url: string, body:{}) => axios.post(url,body).then(responseBody),
    put:(url: string, body:{}) => axios.put(url,body).then(responseBody),
    delete:(url: string) => axios.delete(url).then(responseBody),
}

const catalog = {
    list: (params: URLSearchParams) => requests.get("Products",params),
    details: (id: number)=> requests.get(`Products/${id}`),
    fetchFilters: () => requests.get("Products/filters")
}

const testErrors = {
    get400Error: () => requests.get("Buggy/bad-request"),
    get401Error: () => requests.get("Buggy/unauthorized"),
    get404Error: () => requests.get("Buggy/not-found"),
    get500Error: () => requests.get("Buggy/server-error"),
    geValidationError: () => requests.get("Buggy/validation-error"),
}

const Basket = {
    get: ()=> requests.get("basket"),
    addItem: (productId: Number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem: (productId: Number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),

}

const Account = {
    login: (values: any) => requests.post('Account/Login', values),
    register: (values: any) => requests.post('Account/Register', values),
    currentUser: () => requests.get('Account/currentUser'),
    fetchAddress: () => requests.get('Account/savedAddress'),
}

const Orders = {
    list: () => requests.get("orders"),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post("orders", values)
}

const Payments = {
    createPaymentIntent: () => requests.post("payments",{})

}

const agent = {
    catalog,
    testErrors,
    Basket,
    Account,
    Orders,
    Payments
}

export default agent;
