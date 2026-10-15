import { useState } from "react";
import ContentArea from "./common/ContentArea"
import Button from "./ui/Button";

const LearningPath = () => {
    const steps = [
        {
            title: "Your route to",
            highlight: "real conversations",
            tag: "Alphabet",
            points: [
                "All 33 letters",
                "Reading & handwriting",
                "Spot common words",
            ],
            desc: "No guesswork, no overwhelm. Just one clear step at a time, from your first letter to your first conversation.",
            study: "#lesson-alphabet",
            video: "https://www.youtube.com/",
        },
        {
            title: "Learn and master the",
            highlight: "cyrillic alphabet",
            tag: "Alphabet",
            points: [
                "All 33 letters",
                "Reading & handwriting",
                "Spot common words",
            ],
            desc: "Get comfortable with all 33 letters and read your first Russian words in days. Practice printed and handwritten forms, and spot familiar words.",
            study: "#lesson-alphabet",
            video: "https://www.youtube.com/",
        },
        {
            title: "Master russian",
            highlight: "pronunciation & sounds",
            tag: "Pronunciation",
            points: [
                "Master hard & soft sounds, word stress, and tricky letters.",
            ],
            desc: "Sound natural from the start. Learn hard and soft consonants, vowel reduction, word stress, and the sounds English speakers find hardest.",
            study: "#lesson-pronunciation",
            video: "https://www.youtube.com/",
        },
        {
            title: "Build your everyday",
            highlight: "russian vocabulary",
            tag: "Vocabulary",
            points: [
                "Topic-based words",
                "Flashcards & audio",
                "Spaced repetition",
            ],
            desc: "Learn the words you'll actually use, grouped by topic: greetings, numbers, family, food, and travel, reinforced with spaced-repetition review.",
            study: "#lesson-vocabulary",
            video: "https://www.youtube.com/",
        },
        {
            title: "Build a solid foundation in",
            highlight: "russian grammar",
            tag: "Grammar",
            points: [
                "Master noun gender, plurals, and tenses, then move through the six cases one at a time.",
            ],
            desc: "Grammar explained in plain language, with examples before rules. Noun gender, verb tenses, and the six cases, one step at a time.",
            study: "#lesson-grammar",
            video: "https://www.youtube.com/",
        },
        {
            title: "Train your listening with",
            highlight: "native audio",
            tag: "Listening",
            points: [
                "Train your ear with native audio and full transcripts for every lesson.",
            ],
            desc: "Get used to how Russian really sounds at natural speed, with slow dialogues, transcripts, and native speaker recordings.",
            study: "#lesson-listening",
            video: "https://www.youtube.com/",
        },
        {
            title: "Sharpen your listening through",
            highlight: "real conversations",
            tag: "Listening",
            points: [
                "Train your ear with native audio and full transcripts for every lesson.",
            ],
            desc: "Get used to how Russian really sounds at natural speed, with slow dialogues, transcripts, and native speaker recordings.",
            study: "#lesson-listening",
            video: "https://www.youtube.com/",
        },
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const activeStep = steps[activeIndex];

    return (
        <section
            id="learning-path"
            className="w-full flex flex-col relative w-full overflow-hidden bg-gray-50"
        >
            <div className="custom-container flex flex-col xl:flex-row relative z-40 h-full items-center py-24">

                <div
                    className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-start w-full xl:w-2/5 xl:pe-6 justify-center"
                >
                    <p
                        id="active-num"
                        className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm"
                    >{activeIndex === 0
                        ? "Learning path"
                        : `Step ${String(activeIndex).padStart(2, "0")}`}</p>
                    <h1 id="active-title" className="heading">{activeStep.title}
                        <span className="block text-russian-red">
                            {activeStep.highlight}
                        </span></h1>
                    <p id="active-desc" className="">
                        {activeStep.desc}
                    </p>
                    <div className="flex flex-wrap flex-col sd:flex-row gap-2 sd:gap-4 w-full sd:w-auto">
                        <Button color="blue" label={'Start Learning Free'} href="#" />
                        <Button color="red" label={'What students say'} href="#" />
                    </div>
                </div>
                <div className="w-full xl:w-3/5 xl:ps-6 pt-10 xl:pt-0" id="timeline-scroll">
                    <div className="relative grid grid-cols-1 md:grid-cols-3 xl:grid-cols-[1fr_28px_1fr] gap-x-4 sm:gap-x-6" id="timeline">
                        <div className="absolute bottom-2 left-1/2 top-2 z-10 hidden -translate-x-1/2 border-l-2 border-dashed border-russian-red xl:block" />
                           
                            {steps.slice(1).map((step, index) => {
                                const stepIndex = index + 1;
                                const isRight = index % 2 === 1;
                                const isActive = activeIndex === stepIndex;

                                const content = (
                                    <>
                                        <p className="text-lg font-bold text-russian-red">
                                            {String(stepIndex).padStart(2, "0")}
                                        </p>

                                        <p className={`text-base font-bold text-russian-dark-blue group-hover:text-russian-red transition-all duration-500 ${isActive && 'text-russian-red'}`}>
                                            {step.tag}
                                        </p>

                                        <p className="mt-1">
                                            {step.points.join(", ")}
                                        </p>
                                    </>
                                );
                                
                                return (
                                    <div
                                        key={step.tag + stepIndex}
                                        className={`step-row flex flex-col gap-4 group xl:contents ${isActive ? "active" : ""
                                            }`}
                                    >
                                        {/* Left side */}
                                        <button
                                            type="button"
                                            onClick={() => setActiveIndex(stepIndex)}
                                            className={`step-content cursor-pointer w-full py-1.5 ${isRight
                                                    ? "xl:invisible xl:order-none hidden xl:flex"
                                                    : "text-start md:text-center lg:text-start xl:text-right"
                                                }`}
                                            aria-pressed={isActive}
                                        >
                                            {isRight ? null : content}
                                        </button>

                                        {/* Timeline dot */}
                                        <div className="hidden items-center justify-center py-1.5 xl:flex">
                                            <button
                                                type="button"
                                                onClick={() => setActiveIndex(stepIndex)}
                                                aria-label={`Show step ${stepIndex}`}
                                                aria-pressed={isActive}
                                                className="relative z-20 flex size-4 items-center justify-center rounded-full bg-russian-dark-blue"
                                            >
                                                <span
                                                    className={`size-2 group-hover:bg-russian-red transition-all duration-500 rounded-full ${isActive
                                                            ? "bg-russian-red"
                                                            : "bg-white"
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        {/* Right side */}
                                        <button
                                            type="button"
                                            onClick={() => setActiveIndex(stepIndex)}
                                            className={`step-content cursor-pointer w-full py-1.5 xl:order-none ${!isRight
                                                    ? "xl:invisible hidden xl:flex"
                                                    : "text-end md:text-center lg:text-start xl:text-left"
                                                }`}
                                            aria-pressed={isActive}
                                        >
                                            {isRight ? content : null}
                                        </button>
                                    </div>
                                );
                            })}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default LearningPath
