import React from 'react'
import Button from './ui/Button'
import ContentArea from './common/ContentArea';

const Discover = () => {
    const reasons = [
        {
            id: 1,
            title: "A new alphabet",
            description: "Read signs, menus & book covers within days.",
            borderColor: "border-russian-red",
            badgeColor: "bg-russian-red",
        },
        {
            id: 2,
            title: "Real conversations",
            description:
                "Speak with confidence in cafes, shops & meeting new people.",
            borderColor: "border-russian-dark-blue",
            badgeColor: "bg-russian-dark-blue",
        },
        {
            id: 3,
            title: "Living culture",
            description:
                "Understand the songs, films & traditions behind the language.",
            borderColor: "border-russian-red",
            badgeColor: "bg-russian-red",
        },
        {
            id: 4,
            title: "Confidence in Grammar",
            description:
                "Simple explanations that make grammar click, not confuse.",
            borderColor: "border-russian-dark-blue",
            badgeColor: "bg-russian-dark-blue",
        },
        {
            id: 5,
            title: "A New Way of Thinking",
            description:
                "Discover how Russian thinks & see your language differently.",
            borderColor: "border-russian-red",
            badgeColor: "bg-russian-red",
        },
        {
            id: 6,
            title: "Stories in the Original",
            description:
                "Read Pushkin & other Russian writers without translation.",
            borderColor: "border-russian-dark-blue",
            badgeColor: "bg-russian-dark-blue",
        },
        // {
        //     id: 7,
        //     title: "Deeper Connections",
        //     description:
        //         "Talk to native speakers, make friends & explore heritage roots.",
        //     borderColor: "border-russian-red",
        //     badgeColor: "bg-russian-red",
        // },
        // {
        //     id: 8,
        //     title: "A Skill That Opens Doors",
        //     description:
        //         "Stand out at work, while traveling, or anywhere Russian is spoken.",
        //     borderColor: "border-russian-dark-blue",
        //     badgeColor: "bg-russian-dark-blue",
        // },
        // {
        //     id: 9,
        //     title: "Deeper Connections",
        //     description:
        //         "Talk to native speakers, make friends & explore heritage roots.",
        //     borderColor: "border-russian-red",
        //     badgeColor: "bg-russian-red",
        // },
    ];
    return (
        <section
            className="z-40 relative py-12 lg:py-20 flex xl:justify-center flex-col"
            id="discover"
        >
            <div
                className="custom-container relative z-40"
                id="discover"
            >
                <div className="flex flex-col items-center lg:w-1/2 mx-auto gap-6 text-center">
                    <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">Your Russian journey</p>
                    <h1 className="heading">What you will <span className="text-russian-red">discover?</span></h1>
                    <p>Learning Russian opens more than a textbook. It opens songs you'll finally understand, films you'll watch without subtitles, and conversations you never thought you'd have. This is where that journey begins.</p>
                    {/* <ContentArea subTitle="Your Russian journey" title="What you will discover?" description="Learning Russian opens more than a textbook. It opens songs you'll finally understand, films you'll watch without subtitles, and conversations you never thought you'd have. This is where that journey begins." /> */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 my-10 lg:w-3/4 mx-auto">
                    {reasons.map((item) => (
                        <div
                            key={item.id}
                            className={`card bg-white p-6 rounded flex flex-col relative items-center md:items-start text-center md:text-start gap-1 border-t-4 ${item.borderColor} shadow-lg`}
                        >
                            <span
                                className={`${item.badgeColor} size-8 absolute -top-4 rounded-full text-15 leading-[18px] font-medium text-white flex items-center justify-center shadow-2xl`}
                            >
                                {item.id}
                            </span>

                            <p className="font-bold text-15 uppercase text-russian-dark-blue">
                                {item.title}
                            </p>

                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap flex-col sd:flex-row gap-2 sd:gap-4 w-full sd:w-auto justify-center">
                    <Button color="blue" label="Start Learning Free" href="#" />
                    <Button color="red" label="See the Learning Path" href="#" />
                </div>
            </div>
        </section>
    )
}

export default Discover
