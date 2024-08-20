import { fetch_User } from "../actions/types";
export default function(state = null, action) {

    switch (action.type) {
        case fetch_User:
            return action.payload || false;
        default:
            return state; // Corrected to return the current state
    }
}
