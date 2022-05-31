import axios, {AxiosError, AxiosResponse} from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PaginatedResponse } from "../models/pagination";

axios.defaults.baseURL = "https://localhost:7271/api/";
// to set a cookie from our client side, this is for cors purpose.
// we have added it also on the API side -> Startup.cs-> AllowCredentials()
axios.defaults.withCredentials = true;


// const Redirect = () => {
//     const navigate = useNavigate();

//     navigate("server-error")

// }
const redirect = () => new Promise(res => {

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
            toast.error(data.title);
            break;
        case 500:
            console.log("I co Ty na to brachu");
            redirect();

            //history.push("/server-error");
            //toast.error(data.title);
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

const agent = {
    catalog,
    testErrors,
    Basket
}

export default agent;
