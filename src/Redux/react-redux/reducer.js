// data store 

import { CAMERA_DATA, LAPTOP_DATA, MOBILE_DATA, TABLET_DATA, MONITOR_DATA,CART_DATA } from "./constant";

const initialState = {

    mobileData: [],
    cameraData: [],
    tabletData: [],
    laptopData: [],
    monitorData: [],
    cartData: [],
}

export default function applicationReducer(state = initialState, action) {

    switch (action.type) {
        case MOBILE_DATA:
            return {
                ...state,
                mobileData: action.payload.data
            }
        case CAMERA_DATA:
            return {
                ...state,
                cameraData: action.payload.data
            }
        case LAPTOP_DATA:
            return {
                ...state,
                laptopData: action.payload.data
            }
        case TABLET_DATA:
            return {
                ...state,
                tabletData: action.payload.data
            }
        case MONITOR_DATA:
            return {
                ...state,
                monitorData: action.payload.data
            }
        case CART_DATA:
            return {
                ...state,
                cartData: action.payload.data
            }
        default:
            return {
                ...state
            }
    }



}