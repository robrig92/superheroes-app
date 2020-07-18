import React from 'react'
import Rating from 'react-rating'

const Score = ({ heroe, mode, scoreForm, setScoreForm, isRateable }) => {
    const getScore = (scores) => {
        if (scores.length === 0) {
            return 0
        }

        return (scores.reduce((sum, score) => sum + score.score, 0) / scores.length).toFixed(2)
    }

    if (mode !== 'scores') {
        return <></>
    }

    if (isRateable) {
        return (
            <div className="text-center mt-2">
                <Rating
                    name="score"
                    onClick={(value) => setScoreForm({...scoreForm, score: value})}
                    initialRating={scoreForm.score || undefined}
                    fractions={2}
                />
            </div>
        )
    }

    return (
        <div className="text-center mt-2">
            <Rating
                name="score"
                initialRating={getScore(heroe.scores)}
                readonly
            />
        </div>
    )
}

export default Score
