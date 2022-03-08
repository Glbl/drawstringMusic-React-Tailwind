import * as types from "../../constant/actions/Player";
import songs from "../../data/songs.json"

const initialState = {
    songs: songs,
    isPlaying: false,
    currentlyPlaying: null,
    pauseMain: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
        case types.PLAY_PAUSE:
            return {
                ...state,
                isPlaying: !state.isPlaying,
            };
        case types.CURRENTLY_PLAYING:
            return {
                ...state,
                currentlyPlaying: action.payload
            };
        case types.PAUSE_MAIN:
            return {
                ...state,
                pauseMain: action.payload
            };
        default:
            return state;
    }
}