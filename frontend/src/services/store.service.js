import api from "./api"
import AuthService from "./auth.service";
const VITE_STORE_API = import.meta.env.VITE_STORE_API;


//create store
const createStore = async (store) => {
    const response = await api.post(VITE_STORE_API, store);
    if (response.data) {
      const user = await AuthService.getUserById(response.data.userId); // Fetch updated user data
      AuthService.updateLocalStorageUser(user.data); // Update localStorage with new user data
    }
    return response;
  };
//get store
const getAllStore = async()=>{
    return await api.get(VITE_STORE_API)
}
const getStoreByUserId = async(userId) =>{
    return await api.get(`${VITE_STORE_API}/user/${userId}`);
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
    getStoreByUserId,
}
console.log(StoreService);
export default StoreService;
