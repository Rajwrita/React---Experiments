import React, { useEffect, useReducer, useState } from "react";
import "./Quiz.scss";
import Quizes from "./QuizData"

const responsesDefaultState = [];

function reducer(state = responsesDefaultState, action) {
    switch(action.type) {
        case 'FILTER': 
        return state.filter(el =>  el.id !== action.id)
        case 'ADD': 
        return [...state, action.response]
        default: 
        return state
    }
}

const Quiz = () => {
    const max = Quizes.length - 1;
    const [current, setCurrent] = useState(0);
    // console.log(current, max)
    const [quiz, setQuiz] = useState(true);

    // eslint-disable-next-line
    const [isDisabled, setIsDisabled] = useState(false);

    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(false);
    const [correct, setCorrect] = useState();
    const [responseTaken, setresponseTaken] = useState();
    const [score, setScore] = useState(0);
    // const [responses, setResponses] = useState([])
    const [responses, dispatch] = useReducer(reducer, responsesDefaultState);
    console.log("Responses:", responses)

    const next = () => {
        setCorrect()
        setresponseTaken()
        // setIsDisabled(p => !p)

        // if(current === max-1) {
        //     setIsNextDisabled(true)
        //     // or maybe change next to submit
        // } else {
        //     setIsNextDisabled(false)
        // }
        if (current < max) {
            setCurrent(current + 1);
        }
    };
    const previous = () => {
        setCorrect()
        setresponseTaken()
        //   setIsDisabled(p => !p)

        // if(current === 0) {
        //     setIsPrevDisabled(true)
        // } else {
        //     setIsPrevDisabled(false)
        // }
        if (current > 0) {
            setCurrent(current - 1);
            // call function to say(1st Question)
        }
    };

    const calcScore = () => {
        responses.forEach(el => {
            if(el.DidUserMarkCorrect) {
                setScore(p => p+1)
            }
        })
    }

    const checkAns = (e) => {
        e.preventDefault();

        const correctAnswer = Quizes[current].answers.find((el) => {
            if (el.value === e.target.innerHTML && el.isCorrect) return el;
            return false;
        });

        const iresponse = {
            id: Quizes[current].id,
            question: Quizes[current].question,
            answers: [
                { value: Quizes[current].answers[0].value, isCorrect: Quizes[current].answers[0].isCorrect },
                { value: Quizes[current].answers[1].value, isCorrect: Quizes[current].answers[1].isCorrect },
                { value: Quizes[current].answers[2].value, isCorrect: Quizes[current].answers[2].isCorrect },
                { value: Quizes[current].answers[3].value, isCorrect: Quizes[current].answers[3].isCorrect },
            ],
            userResponse: e.target.innerHTML,
            DidUserMarkCorrect: undefined
        }
        // setIsDisabled(true)
        const responseExists = responses.find(el => el.id === Quizes[current].id)
        console.log(responseExists)
        if(responseExists) {
            dispatch({type: 'FILTER', id: responseExists.id})
        }


        if (correctAnswer) {
            // setCorrect(true);
            setresponseTaken(true)
            iresponse.DidUserMarkCorrect = true
            dispatch({type: 'ADD', response: iresponse})
        } else {
            iresponse.DidUserMarkCorrect = false
            dispatch({type: 'ADD', response: iresponse})
            setresponseTaken(true)
        }
    };

    const submit = () => {
        setQuiz(false)
        calcScore();
    }

    useEffect(() => {
        if (current === 0) {
            setIsPrevDisabled(true);
        } else {
            setIsPrevDisabled(false);
        }

        if (current === max) {
            setIsNextDisabled(true);
            // or maybe change next to submit
        } else {
            setIsNextDisabled(false);
        }
    }, [current, max]);

    return (
        <>
        {quiz && (<div className="quiz">
            <h3 className="question">{Quizes[current].question}</h3>
            <div className="answers">
                {Quizes[current].answers.map((answer, index) => (
                    <button
                        key={index}
                        className="btn btn-answer"
                        value={answer.value}
                        onClick={checkAns}
                        disabled={isDisabled}
                    >
                        {answer.value}
                    </button>
                ))}
            </div>
            <div className="traversal-buttons">
                <button disabled={isPrevDisabled} onClick={previous}>
                    PREVIOUS
        </button>
                <button disabled={isNextDisabled} onClick={next}>
                    NEXT
        </button>
            </div>
            {correct === true && <p className="msg correct">Correct Answer</p>}
            {responseTaken === true && <p className="msg taken">Response Recorded</p>}
            {correct === false && <p className="msg wrong">Wrong Answer</p>}
            {current === max && <button onClick={submit} className="btn btn-submit">Submit</button>}
        </div>)}
            {quiz === false && <p className="msg score">Total Score : {score}</p>}
            {quiz === false && <div className="quiz">
            {responses.map((quiz, index) => (
                <div className="marg-top" key={index}>
                <h3 className="question">{quiz.question}</h3>
                <div className="answers">
                    {quiz.answers.map((answer, index) => (
                        <>
                        <button
                            key={index}
                            className={`btn btn-answer ${answer.isCorrect && "answer-correct"} ${answer.value === quiz.userResponse && "wrong"}`}
                            value={answer.value}
                            disabled={isDisabled}
                        >
                            {answer.value}
                        </button>
                    </>
                    ))}
                </div>
                </div>
            ))}
                </div>}
    </>
    );
};



export default Quiz;
