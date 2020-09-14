import * as fromUi from './shared/ui.reducer'
import { ActionReducerMap } from '@ngrx/store'
import * as fromAuht from './auth/auth.reducer'
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer'

export interface AppState{
    ui: fromUi.State
    auth:fromAuht.AuthState
    ingresoEgreso: fromIngresoEgreso.IngresoEgresoState
}

export const appReducers : ActionReducerMap<AppState> = {
    ui:fromUi.uiReducer,
    auth:fromAuht.authReducer,
    ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
}