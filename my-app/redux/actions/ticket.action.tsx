
export enum updateList {
    UPDATE = "UPDATE_DATA"
}

export const ticketAction = (data: any) => 
    (dispatch: (arg0: { type: any; data: any; }) => void) => {
        dispatch({
            type: updateList.UPDATE,
            data,
        })
}