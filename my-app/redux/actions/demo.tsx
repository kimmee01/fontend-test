
export enum demoType {
    UPDATE = "UPDATE_DATA"
}

export const demoAction = (data: any) => 
    (dispatch: (arg0: { type: any; data: any; }) => void) => {
        dispatch({
            type: demoType.UPDATE,
            data,
        })
}