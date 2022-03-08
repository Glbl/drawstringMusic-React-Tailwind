import React, {useCallback, useEffect} from 'react';
import Player from "./Player";
import {useDispatch, useSelector} from 'react-redux'

const Album = () => {
    const dispatch = useDispatch()
    const songs = useSelector(state => state.player.songs)
    const currentlyPlaying = useSelector(state => state.player.currentlyPlaying)
    const isPlaying = useSelector(state => state.player.isPlaying)
    const pauseMain = useSelector(state => state.player.pauseMain)

    const handlePlaying = useCallback((playIndex) => {
        dispatch({type: 'CURRENTLY_PLAYING', payload: playIndex})
    }, [])

    const handlePause = () => dispatch({type: 'PLAY_PAUSE'})

    return (
        <div className="w-3/5">
            <div className="flex items-center justify-between">
                <p className="text-xl leading-tight font-bold">Wale’s Test Album</p>
            </div>
            <div className="py-4.5">
                {
                    songs?.map((item, index) =>
                        <Player
                            pauseMain={pauseMain}
                            isPlaying={isPlaying}
                            handlePause={handlePause}
                            handlePlaying={handlePlaying}
                            currentlyPlaying={currentlyPlaying}
                            key={index}
                            item={item}/>
                    )
                }
            </div>
        </div>
    );
};

export default Album;