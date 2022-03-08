import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import "./style.css";
import IconSuffle from "../../assets/ic_vc_suffle.svg";
import IconPrevious from "../../assets/ic_vc_prev.svg";
import IconPlay from "../../assets/ic_vc_play.svg";
import IconRepeat from "../../assets/ic_vc_repeat.svg";
import IconUnMute from "../../assets/ic_vc_mute.svg";
import IconMute from "../../assets/ic_vc_muteM.svg";
import IconPause from "../../assets/ic_vc_pouse.svg";
import {useSelector} from "react-redux";
import {useDispatch} from 'react-redux'

const PlayerController = () => {
    const dispatch = useDispatch()

    const songs = useSelector(state => state.player.songs)
    const isPlayingNow = useSelector(state => state.player.isPlaying)
    const currentlyPlaying = useSelector(state => state.player.currentlyPlaying)
    const currentSong = useMemo(() => songs.find(item => item.id === currentlyPlaying), [currentlyPlaying])

    const audioEl = useRef(null);
    const didMountRef = useRef(false);
    const intervalRef = useRef();
    const touch = useRef(0)
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);

    const [isRepeat, setRepeat] = useState(false)
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const [isSuffled, setShuffled] = useState(false);
    const [playingStatus] = useState(0); // ex: 0: stopped, 1: playing, 2: paused
    const [repeatType] = useState(0); // ex: 0: disable, 1: repeat One, 2: repeat All
    const [isMuted, setMute] = useState(false);
    const [volume, setVolume] = useState(1);

    const duration = audioEl.current?.duration

    const handlePlaying = useCallback((playIndex) => {
        dispatch({type: 'CURRENTLY_PLAYING', payload: playIndex})
    }, [])

    const onScrub = (value) => {
        clearInterval(intervalRef.current);
        audioEl.current.currentTime = value;
    }

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) setIsPlaying(true);
        startTimer();
    };

    const onClickSuffle = () => setShuffled(prev => !prev);
    const onClickPrev = () => {
        touch.current++

        if (touch.current >= 2) {
            setCurrentSongIndex(() => {
                let temp = currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = songs.length - 1;
                }

                handlePlaying(temp)
                return temp;
            });
        } else {
            audioEl.current.currentTime = 0
        }

        setTimeout(() => {
            touch.current = 0
        }, 2000)
    };
    const onClickPlayStop = () => {
        if (currentlyPlaying === null) dispatch({type: 'CURRENTLY_PLAYING', payload: 0})
        setIsPlaying(prev => !prev)
    };
    const onClickNext = () => {
        setCurrentSongIndex(() => {
            let temp = currentSongIndex;
            temp++;

            if (temp > songs.length - 1) {
                temp = 0;
            }

            handlePlaying(temp)
            return temp;
        });
    };

    function convert(value) {
        return ((Math.floor(value / 60) > 10 ? Math.floor(value / 60) : '0' + Math.floor(value / 60)) + ":" + (value % 60 ? (value % 60 > 10 ? Math.floor(value % 60) : '0' + Math.floor(value % 60)) : '00'))
    }

    const onClickRepeat = () => setRepeat(prev => !prev);
    const onClickMute = () => setMute(prev => !prev)

    const onChangeVolume = (e) => {
        const vol = e.target.value
        setVolume(vol);
        audioEl.current.volume = vol
        // do something more if needed
    };

    const SuffleButton = () => (
        <button
            className={` flex items-center justify-center rounded-full w-10 h-10 ${isSuffled && ' bg-black'}`}
            onClick={onClickSuffle}>
            <img src={isSuffled ? IconSuffle : IconSuffle} alt="suffle"/>
        </button>
    );

    const PlayStopButton = () => (
        <button
            className="playstop_bg shadow-stop-btn-bg w-[60px] h-[60px] flex items-center justify-center rounded-full"
            onClick={onClickPlayStop}
        >
            <img
                src={
                    isPlaying ? IconPause : IconPlay
                }
                alt="play"
            />
        </button>
    );

    const RepeatButton = () => (
        <button
            className={` flex items-center justify-center rounded-full w-10 h-10 ${isRepeat && ' bg-black'}`}
            onClick={onClickRepeat}>
            <img
                src={
                    repeatType === 0
                        ? IconRepeat
                        : repeatType === 1
                            ? IconRepeat
                            : IconRepeat
                }
                alt="repeat"
            />
        </button>
    );

    const PrevNextButton = ({isNext}) => (
        <button
            onClick={() => {
                isNext ? onClickNext() : onClickPrev();
            }}
        >
            <img className={isNext && `rotate-180`} src={IconPrevious} alt="next"/>
        </button>
    );

    const MuteButton = () => (
        <button onClick={onClickMute}>
            <img src={isMuted ? IconMute : IconUnMute} alt="mute"/>
        </button>
    );

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioEl.current.ended) {
                if (isRepeat) {
                    audioEl.current.currentTime = 0
                    audioEl.current.play()
                    return
                }
                if (isSuffled) {
                    const picRandom = Math.floor(Math.random() * songs.length)
                    setCurrentSongIndex(picRandom)
                    handlePlaying(picRandom)
                    return
                }
                onClickNext();
            } else {
                setTrackProgress(audioEl.current.currentTime);
            }
        }, [1000]);
    }

    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
            startTimer()
        } else {
            audioEl.current.pause();
        }
    });

    useEffect(() => {
        if (isPlaying) {
            dispatch({type: 'PAUSE_MAIN', payload: true})
        } else {
            dispatch({type: 'PAUSE_MAIN', payload: false})
        }

    }, [isPlaying])

    useEffect(() => {
        audioEl.current.muted = isMuted;
    }, [isMuted])

    useEffect(() => {
        setCurrentSongIndex(currentlyPlaying)
        return () => setCurrentSongIndex(0)
    }, [currentlyPlaying])

    useEffect(() => {
        if (didMountRef.current) {
            if (isPlayingNow) setIsPlaying(false)
            else setIsPlaying(true)
            return
        }
        didMountRef.current = true;

    }, [isPlayingNow])

    return (
        <div
            className="flex items-center justify-between h-[102px] fixed bottom-0 w-full py-2.5 px-6 text-white backdrop-blur-pBoard music_container">
            <div className="flex flex-col space-y-1.5 text-sm leading-4.5 -tracking-[0.04em] max-w-[360px]">
                <p className="text-white font-bold whitespace-nowrap text-ellipsis overflow-hidden">{currentSong?.name}</p>
                <p className="text-secondary font-normal">{currentSong?.author}</p>
            </div>
            <audio src={songs[currentSongIndex]?.url} ref={audioEl}/>

            <div className="absolute button-group">
                <div className="flex gap-[35px] justify-center items-center py-1">
                    <SuffleButton/>
                    <PrevNextButton isNext={false}/>
                    <PlayStopButton/>
                    <PrevNextButton isNext/>
                    <RepeatButton/>
                </div>
                <div className="flex items-center space-x-2 py-1.5">
                    <p className="text-[#8D96BC] text-xs leading-[12.6px] w-[14px] pr-[36px]">{convert(trackProgress)}</p>
                    <input
                        type="range"
                        className="
                              progress
                              w-[420px]
                              focus:outline-none focus:ring-0 focus:shadow-none
                            "
                        step={1}
                        min={0}
                        max={duration ? duration : `${duration}`}
                        value={trackProgress}
                        onChange={(e) => onScrub(e.target.value)}
                        onMouseUp={onScrubEnd}
                        onKeyUp={onScrubEnd}
                    />
                    <p className="text-[#8D96BC] text-xs leading-[12.6px] w-[14px]">{duration ? convert(duration) : '00:00'}</p>
                </div>
            </div>
            <div className="flex items-center pr-[12px] gap-[23px]">
                <MuteButton/>
                <input
                    type="range"
                    className="
              volume
              w-[203px]
              focus:outline-none focus:ring-0 focus:shadow-none
            "
                    step={0.1}
                    min={0}
                    max={1}
                    value={volume}
                    onChange={onChangeVolume}
                />
            </div>
        </div>
    );
};

export default PlayerController;