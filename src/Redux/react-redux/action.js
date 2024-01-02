//functiona call

import { CAMERA_DATA, LAPTOP_DATA, MOBILE_DATA, TABLET_DATA, MONITOR_DATA } from "./constant";

const storeMobileData = (apires) => (dispatch) => {
    console.log(apires);

    dispatch({
        type: MOBILE_DATA,
        payload: { data: apires }
    })

}


const storeCameraData = (apires) => (dispatch) => {
    console.log(apires);
    debugger

    dispatch({
        type: CAMERA_DATA,
        payload: { data: apires }
    })


}

const storeLaptopData = (apires) => (dispatch) => {
    console.log(apires);

    dispatch({
        type: LAPTOP_DATA,
        payload: { data: apires }
    })

}

const storetabletData = (apires) => (dispatch) => {
    console.log(apires);

    dispatch({
        type: TABLET_DATA,
        payload: { data: apires }
    })

}

const storemonitorData = (apires) => (dispatch) => {
    console.log(apires);

    dispatch({
        type: MONITOR_DATA,
        payload: { data: apires }
    })

}
// const IncrementData = (index, data) => (dispatch) => {
//     console.log(index, data);
//     const ItemData = data;
//     ItemData[index].quantity = ItemData[index].quantity ? ItemData[index].quantity + 1 : 1;
//     console.log(ItemData);
//     dispatch({
//         type:MOBILE_DATA,
//         payload:{data:ItemData}
//     })

// }
export { storeMobileData, storeCameraData, storeLaptopData, storemonitorData, storetabletData}