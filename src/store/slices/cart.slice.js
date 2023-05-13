import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce } from "../../utils/configAxios";
import { getConfig } from "../../utils/configAxios";
import Swal from 'sweetalert2'

const initialState = {
    products: [],
    isShowCart: false
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        changeIsShowCart: (state) => {
            state.isShowCart = !state.isShowCart
        },
        setProducts: (state, action) => {
            const newProducts = action.payload
            state.products = newProducts
        }
    }
})

export const {changeIsShowCart, setProducts} = cartSlice.actions

export const getCartProducts = () => (dispatch) => {
    axiosEcommerce.get("cart", getConfig())
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => console.log(err))
}

export const addProductCart = (data) => (dispatch) => {
    axiosEcommerce.post("cart", data, getConfig())
    .then(() => {
        dispatch(getCartProducts())
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            iconColor: "#F3A847",
            title: 'Product added to cart',
            showConfirmButton: false,
            timer: 1500
        })
    })
    .catch((err) => {
        console.log(err)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must be logged in to perform this action!',
            color: '#242F3E',
            confirmButtonColor: '#F3A847'
        })
    } )
}

export const deleteProductCart = (id) => (dispatch) => {
    axiosEcommerce.delete(`cart/${id}`, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => console.log(err))
}

export const updateProductQuantityCart = (id, data) => (dispatch) => {
    axiosEcommerce.put(`cart/${id}`, data, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => console.log(err))
}

export const purchaseCart = () => (dispatch) => {
    axiosEcommerce.post(`purchases`, {}, getConfig())
    .then(() => {
        dispatch(getCartProducts())
        Swal.fire({
            icon: 'success',
            iconColor: '#F3A847',
            title: 'Thank you for your purchase!',
            showConfirmButton: true,
            color: '#242F3E',
            confirmButtonColor: '#F3A847',
            backdrop: `
                rgba(54, 55, 54,0.5)
            `
        })
    } )
    .catch((err) => {
        console.log(err)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must be logged in to perform this action!',
            color: '#242F3E',
            confirmButtonColor: '#F3A847'
        })
    } )
}

export default cartSlice.reducer