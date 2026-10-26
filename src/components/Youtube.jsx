import React, { useState } from 'react'
import Button from './ui/Button'

const VIDEO_ID = 'MyEem1zDqnY'

const Youtube = () => {
    const [playing, setPlaying] = useState(false)

    const play = (e) => {
        e?.preventDefault()
        setPlaying(true)
    }

    return (
        <section
            id="video"
            className="z-40 relative py-12 lg:py-20 overflow-hidden flex items-center"
        >
            <div className="custom-container relative z-40 flex flex-col lg:flex-row items-center lg:gap-16 xl:gap-24">

                <div className="flex flex-col w-full lg:w-1/2 xl:w-2/5 gap-6 text-center items-center lg:items-start lg:text-start">
                    <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">YouTube</p>
                    <h1 className="heading"><span className="text-russian-red block">Russian video lessons,</span> wherever you are</h1>
                    <p>Short, friendly video lessons in Hindi. Start with this one, then visit the channel for new lessons every
                        week.</p>
                    <div className="flex flex-wrap flex-col sd:flex-row gap-2 sd:gap-4 w-full sd:w-auto">
                        <Button
                            color="blue"
                            label="Watch video"
                            href="#video"
                            onClick={play}
                            icon={<i className="fa-solid fa-play ms-1"></i>}
                        />
                        <Button
                            color="red"
                            label="Visit my channel"
                            href="https://www.youtube.com/@yourchannel"
                            target="_blank"
                            rel="noopener"
                            icon={<i className="fa-brands fa-youtube ms-1"></i>}
                        />
                    </div>
                </div>

                <div className="relative w-full lg:w-1/2 xl:w-3/5 mt-10 lg:mt-0">
                    <div className="relative aspect-video overflow-hidden rounded bg-russian-dark-blue shadow-lg">
                        {playing ? (
                            <iframe
                                className="absolute inset-0 size-full"
                                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                                title="Russian video lesson"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        ) : (
                            <>
                                <img
                                    src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                                    alt="Watch the intro video"
                                    className="absolute inset-0 size-full object-cover"
                                />
                                <div className="absolute inset-0 bg-russian-dark-blue/30"></div>
                                <button
                                    type="button"
                                    onClick={play}
                                    aria-label="Play video"
                                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                                >
                                    <span className="size-16 rounded-full bg-russian-red text-white text-2xl flex items-center justify-center shadow-lg transition-all group-hover:scale-110">
                                        <i className="fa-solid fa-play ml-1"></i>
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Youtube