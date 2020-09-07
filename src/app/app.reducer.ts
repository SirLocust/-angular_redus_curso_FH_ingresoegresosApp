import * as fromUi from './shared/ui.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState{
    ui: fromUi.State
}

export const appReducers : ActionReducerMap<AppState> = {
    ui:fromUi.uiReducer
}