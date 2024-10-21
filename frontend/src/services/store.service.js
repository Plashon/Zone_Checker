import api from "./api"

const VITE_STORE_API = import.meta.env.VITE_STORE_API;

//create store
const createStore = async(store)=>{
    return await api.post(VITE_STORE_API,store)
}
//get store
const getAllStore = async()=>{
    return await api.get(VITE_STORE_API)
}
const getByStoreId = async(id)=>{
    return await api.get(`${VITE_STORE_API}/${id}`)
}
//update store data
const updateStoreById = async (id,store)=>{
    return await api.put(`${VITE_STORE_API}/${id}`,store)
}
//delete store use id to delete
const deleteStoreById = async (id)=>{
    return await api.delete(`${VITE_STORE_API}/${id}`)
}

const StoreService ={
    getAllStore,
    getByStoreId,
    createStore,
    updateStoreById,
    deleteStoreById,
}
console.log(StoreService);
export default StoreService;
