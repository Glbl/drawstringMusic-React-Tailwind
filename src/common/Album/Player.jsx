import React, { useEffect, useRef, useState } from 'react';
import {
    PlusIcon
} from '@heroicons/react/outline';
import { ReactComponent as PlayIcon } from "../../assets/icons/Icon.svg";
import { ReactComponent as PauseIcon } from "../../assets/icons/pause.svg";


const Player = ({ item, currentlyPlaying, handlePlaying, handlePause, isPlaying, pauseMain }) => {

    const song = useRef(new Audio(item.url))
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        song.current.addEventListener('loadedmetadata', function () {
            setDuration(song.current.duration)
        });
    }, [])

    function convert(value) {
        return ((Math.floor(value / 60) > 10 ? Math.floor(value / 60) : '0' + Math.floor(value / 60)) + ":" + (value % 60 ? (value % 60 > 10 ? Math.floor(value % 60) : '0' + Math.floor(value % 60)) : '00'))
    }

    return (
        <div
            className={`flex items-center justify-between py-2.5 pl-4 pr-8 antialiased ${item.id === currentlyPlaying && 'bg-trackHover rounded-2xl'}`}>
            <div className="flex items-center space-x-4">

                {
                    (item.id === currentlyPlaying) ?
                        <>
                            {
                                (isPlaying || !pauseMain) ? <div className='w-8 h-8 flex items-center justify-center cursor-pointer' onClick={handlePause}><PlayIcon className="w-2.5 h-2.5" /></div> :
                                    <div className='w-8 h-8 flex items-center justify-center cursor-pointer' onClick={handlePause}><PauseIcon className="w-2.5 h-2.5" /></div>
                            }
                        </> :
                        <div className='w-8 h-8 flex items-center justify-center cursor-pointer' onClick={() => handlePlaying(item.id)}><PlayIcon className="w-2.5 h-2.5" /></div>
                }

                <img src={item?.links?.images[0].url} className="h-11 w-11" alt="" />
                <PlusIcon className="w-3 h-3 text-gray-400" />
                <p className="max-w-[300px] text-sm leading-[18px] font-semibold -tracking-[.04em] overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</p>
            </div>
            <p className="font-epilogue text-sm leading-none font-normal">{convert(duration)}</p>
        </div>
    );
};

export default Player;