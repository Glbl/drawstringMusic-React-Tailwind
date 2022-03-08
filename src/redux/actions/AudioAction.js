import * as types from "../../constant/actions/Player";


export const playAndPause = payload =>({
    type: types.PLAY_PAUSE,
    payload
})

export const setCurrentlyPlaying = payload =>({
    type: types.CURRENTLY_PLAYING,
    payload
})