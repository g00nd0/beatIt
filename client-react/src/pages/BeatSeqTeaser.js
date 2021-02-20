import React from 'react';
import DrumMachine from '../component/hypebeats/DrumMachine'
import { useState, useEffect } from "react";

const BeatSeqTeaser = () => {
    const [isNameChange, setIsNameChange] = useState(false);
    const [isSaved, setIsSaved] = useState(false)

    const handleNameChange = (status) => {
        console.log("handleNameChange in BeatSeqTeaser, status is", status);
        setIsNameChange(status)
    }

    const handleSave = (status) => {
        setIsSaved(status);
        console.log("handleSave in BeatSeq, status is", status)
    }

    const initialStepState = {
        Kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Sub1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Sub2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Clap: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        HiHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        OpenHiHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    return (
        <div>
            <div class="form-h1">
                <h1>Teaser</h1>
            </div>

            <div>
                <DrumMachine oneBeatSeq={{ _id: "", beatGrid: initialStepState, name: "Untitled", tempo: 65 }}

                    handleSave={handleSave}

                    handleNameChange={handleNameChange}
                />
            </div>
        </div>
    )
}

export default BeatSeqTeaser

//     < DrumMachine
// oneBeatSeq = { retrievedSeq }
// handleNameChange = { handleNameChange }
// handleSave = { handleSave } />