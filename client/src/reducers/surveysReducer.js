import { fetch_Surveys } from "../actions/types";
export default function(state=[],action){
    switch(action.type){
        case fetch_Surveys: return action.payload
        default: return state
    }
}