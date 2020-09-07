import * as fromUi from './ui.accions'


export interface State{
    isLoading: boolean
}


const initState: State = {
    isLoading: false;
}


export  const uiReducer = (state = initState, action : fromUi.accionesLoading): State =>{

    switch (action.type) {
        case fromUi.ACTIVAR_LOADING:
            return {
                isLoading: true
            }
        case fromUi.ACTIVAR_LOADING:
            return {
                isLoading: false 
            }
    
        default:
            return state;
    }
}