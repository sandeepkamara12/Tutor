import React from 'react'

const Why = () => {
    const reasons = [
        {
            id: 1,
            title: "Widely spoken",
            description:
                "One of the most spoken languages in Eastern Europe & Asia.",
            color: "russian-red",
        },
        {
            id: 2,
            title: "Career and travel",
            description:
                "Stand out in business, science, tourism & travel.",
            color: "russian-dark-blue",
        },
        {
            id: 3,
            title: "Rich culture",
            description:
                "Read literature, enjoy films & music in the original.",
            color: "russian-red",
        },
        {
            id: 4,
            title: "Easier than it looks",
            description:
                "Learn 33 letters in days. Words are read as written.",
            color: "russian-dark-blue",
        },
    ];
    return (
        <section
            className="z-40 relative"
            id="why"
        >
            <div className="custom-container">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 lg:grid-cols-4 gap-4 -mt-10 lg:-mt-16">
                    {reasons.map((item) => (
                        <div
                            key={item.id}
                            className={`card bg-white p-6 rounded flex flex-col relative items-center md:items-start text-center md:text-start gap-1 border-t-4 border-${item.color} shadow-lg`}
                        >
                            <span
                                className={`bg-${item.color} size-8 absolute -top-4 rounded-full text-15 leading-[18px] font-medium text-white flex items-center justify-center shadow-2xl`}
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
            </div>
        </section>
    )
}

export default Why
