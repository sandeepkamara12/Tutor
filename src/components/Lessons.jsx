import React, { useState } from 'react'
import Button from './ui/Button'

const Lessons = () => {

    const lessons = [
        {
            id: 1,
            preview: "А Б В",
            badge: "Free",
            category: "Alphabet",
            title: "Meet the Cyrillic Alphabet",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            level: "Beginner",
            duration: "12 min",
            learners: "1.2k",
            rating: "4.9",
            price: "Free",
            instructor: "I",
            href: "#",
        },
        {
            id: 2,
            preview: "Кофе",
            badge: null,
            category: "Conversation",
            title: "Ordering in a Cafe",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            level: "Elementary",
            duration: "15 min",
            learners: "540",
            rating: "4.9",
            price: "Members",
            instructor: "I",
            href: "#",
        },
    ];

    const qs = [
        {
            q: "How do you say Thank You in Russian?",
            d: (
                <>
                    <span className="text-green-700 font-semibold">
                        Спасибо
                    </span>{" "}
                    is the common Russian word for{" "}
                    <span className="font-semibold">Thank You</span>,
                    used in everyday conversations.
                </>
            ),
            o: ["Здравствуйте", "Спасибо", "Пожалуйста", "До свидания"],
            a: 1,
        },
        {
            q: 'Which letter is pronounced like "ya"?',
            d: (
                <>
                    The Russian letter{" "}
                    <strong className="text-green-700">Я</strong> is
                    pronounced like "Ya" in English, as in "yard".
                </>
            ),
            o: ["Ю", "Е", "Я", "Ё"],
            a: 2,
        },
        {
            q: 'What does "Привет" mean?',
            d: (
                <>
                    <strong>Привет</strong> is a common informal Russian
                    greeting that means "Hi". It is used with friends and
                    people you know.
                </>
            ),
            o: ["Goodbye", "Please", "Sorry", "Hi"],
            a: 3,
        },
    ];

    const [qi, setQi] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [finished, setFinished] = useState(false);

    const current = qs[qi];
    const answered = selected !== null;

    const progress = finished
        ? 100
        : (qi / qs.length) * 100;

    function handleAnswer(index) {
        if (answered || finished) return;

        setSelected(index);

        if (index === current.a) {
            setScore((prev) => prev + 1);
        }
    }

    function handleNext() {
        if (!answered) return;

        if (qi === qs.length - 1) {
            setFinished(true);
            return;
        }

        setQi((prev) => prev + 1);
        setSelected(null);
    }

    function handleRetry() {
        setQi(0);
        setScore(0);
        setSelected(null);
        setFinished(false);
    }

    return (
        <section id="featured-lessons">
            <div className="custom-container relative z-40 py-16 lg:py-24">
                <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-end">
                    <div>
                        <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-start xl:w-2/3">
                            <p className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">Featured
                                Lessons & Quizzes</p>
                            <h1 className="heading">Learn, test and <span className="text-russian-red">remember it.</span></h1>
                            <p>Pick a short lesson that fits your level, then check what you remember with a quick quiz. Every lesson
                                takes only 10 to 15 minutes, so you can learn on a coffee break, on your commute, or whenever you have a
                                free moment.</p>
                            <div className="flex flex-wrap flex-col sd:flex-row gap-2 sd:gap-4 w-full sd:w-auto">
                                <Button color="blue" label="Start Learning Free" href="#" />
                                <Button color="red" label="Browse all lessons" href="#" />
                            </div>
                        </div>

                        <div
                            id="lessons"
                            className="grid sm:grid-cols-2 gap-6 mt-10"
                        >

                            {lessons.map((lesson) => (
                                <article
                                    key={lesson.id}
                                    className="bg-white border border-gray-200 rounded-md flex flex-col overflow-hidden group"
                                >
                                    {/* Preview */}
                                    <div className="relative h-56 flex items-center justify-center font-bold text-4xl text-white bg-russian-dark-blue">
                                        {lesson.preview}

                                        {lesson.badge && (
                                            <span className="text-xs absolute top-2.5 left-2.5 z-10 font-semibold uppercase py-1 px-2 rounded text-white bg-green-600">
                                                {lesson.badge}
                                            </span>
                                        )}

                                        <span className="text-xs absolute top-2.5 right-2.5 z-10 font-semibold uppercase py-1 px-2 rounded text-white bg-russian-red">
                                            {lesson.category}
                                        </span>

                                        <div className="absolute bottom-2.5 left-2.5 z-10 font-semibold text-sm text-white flex items-center gap-2">
                                            <span className="font-bold text-sm flex items-center justify-center bg-white text-russian-dark-blue rounded-full size-6">
                                                {lesson.instructor}
                                            </span>
                                            Instructor
                                        </div>
                                    </div>

                                    {/* Lesson details */}
                                    <div className="bg-white p-4 flex flex-col relative gap-1 items-start">
                                        <p className="font-bold text-lg text-russian-dark-blue lowercase first-letter:capitalize group-hover:text-russian-red cursor-pointer">
                                            {lesson.title}
                                        </p>

                                        <p>{lesson.description}</p>

                                        <div className="w-full grid grid-cols-2 items-center justify-between gap-1 text-gray-500 pt-2">
                                            <span className="flex items-center gap-1">
                                                <i className="fa-solid fa-graduation-cap"></i>
                                                <span>{lesson.level}</span>
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <i className="fa-solid fa-clock"></i>
                                                <span>{lesson.duration}</span>
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <i className="fa-solid fa-user"></i>
                                                <span>{lesson.learners} Learners</span>
                                            </span>

                                            <span className="text-[#e5a100]">
                                                ★ {lesson.rating}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 text-sm text-russian-dark-blue">
                                        <span className="font-semibold">{lesson.price}</span>

                                        <Button
                                            href={lesson.href}
                                            color="red"
                                            label="Start lesson"
                                            classes="py-2"
                                        />
                                    </div>
                                </article>
                            ))}

                        </div>
                    </div>
                    <aside className="rounded bg-white border border-gray-200 overflow-hidden transition-all p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold tracking-widest uppercase text-russian-red">
                                Quick quiz
                            </span>

                            <span className="text-xs font-medium text-gray-600">
                                {finished
                                    ? "Done"
                                    : `Question ${qi + 1} of ${qs.length}`}
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-1.5 rounded-full mb-8 bg-gray-200 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-300 bg-russian-red"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Quiz content */}
                        <div className="flex flex-col gap-2">
                            {finished ? (
                                <>
                                    <p className="text-4xl font-bold text-russian-red mb-2">
                                        {score}/{qs.length}
                                    </p>

                                    <p className="text-gray-600">
                                        {score === qs.length
                                            ? "Perfect score!"
                                            : "Nice effort, try again to improve."}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="font-semibold text-russian-dark-blue mb-1">
                                        Q: {current.q}
                                    </p>

                                    <p className="text-gray-600 mb-3">
                                        <span className="text-russian-dark-blue font-semibold">
                                            Hint:
                                        </span>{" "}
                                        {current.d}
                                    </p>

                                    {current.o.map((option, index) => {
                                        const isCorrect = index === current.a;
                                        const isSelected = index === selected;

                                        let optionStyle =
                                            "border-gray-200 text-gray-500 hover:border-russian-blue";

                                        if (answered && isCorrect) {
                                            optionStyle =
                                                "border-green-700 bg-green-50 text-green-700 good";
                                        } else if (isSelected && !isCorrect) {
                                            optionStyle =
                                                "border-russian-red bg-red-50 text-russian-red bad";
                                        }

                                        return (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => handleAnswer(index)}
                                                disabled={answered}
                                                aria-pressed={isSelected}
                                                className={`w-full py-2 px-4 border rounded font-medium lg:text-15 text-start transition-colors duration-150 flex items-center justify-between gap-3 ${optionStyle} ${answered ? "cursor-default" : "cursor-pointer"
                                                    }`}
                                            >
                                                <span>{option}</span>

                                                {answered && isCorrect && (
                                                    <i
                                                        className="fa-solid fa-circle-check"
                                                        aria-label="Correct answer"
                                                    />
                                                )}

                                                {isSelected && !isCorrect && (
                                                    <i
                                                        className="fa-solid fa-circle-xmark"
                                                        aria-label="Incorrect answer"
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </>
                            )}
                        </div>

                        {/* Feedback */}
                        <p
                            aria-live="polite"
                            className={`text-xs mt-5 mb-2 font-semibold min-h-4 ${!finished && answered
                                    ? selected === current.a
                                        ? "text-green-700"
                                        : "text-russian-red"
                                    : ""
                                }`}
                        >
                            {!finished && answered
                                ? selected === current.a
                                    ? "Correct!"
                                    : "No, the right answer is highlighted."
                                : ""}
                        </p>

                        {/* Next / Retry */}
                        <button
                            type="button"
                            onClick={finished ? handleRetry : handleNext}
                            disabled={!answered && !finished}
                            className={`button button-russian-blue w-full ${!answered && !finished
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                                }`}
                        >
                            <span>
                                {finished
                                    ? "Try again"
                                    : qi === qs.length - 1
                                        ? "See result"
                                        : "Next question"}
                            </span>
                        </button>

                        <a
                            href="#"
                            className="block text-center mt-4 text-sm font-semibold text-russian-red"
                        >
                            More quizzes →
                        </a>
                    </aside>
                </div>
            </div>
        </section>
    )
}

export default Lessons
