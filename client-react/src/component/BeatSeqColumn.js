import axios from 'axios'
import { useState } from 'react'
import { Redirect, useHistory } from "react-router-dom";
import BeatSeqList from './BeatSeqList'
const BeatSeqColumn = () => {
    const [machineCreated, setMachineCreated] = useState(false)
    const [newMachineId, setNewMachineId] = useState("")
    // const userId = sessionStorage.getItem("userId");
    const userId = "user1";
    const history = useHistory()

    const handleAddMachineClick = () => {
        setMachineCreated(false);
        console.log("add new machine");
        const newMachineUser = {
            username: userId
        };
        axios
            .post("/api/beatSequence", newMachineUser)
            .then((response) => {
                console.log("posted a new machine to MongoDB", response)
                //get the new object_id
                setNewMachineId(response.data._id);
                setMachineCreated(true);
            })
            .catch((error) => {
                console.log("add new machine error/error", error);
                // console.log("add new machine error/response", error.response.data.error);
            });
    }

    if (machineCreated === true) {
        return history.push(`/beatseq/${newMachineId}`);
        // return <Redirect to={`/beatseq/${newMachineId}`} />;
    }

    return (
        <div id="beatSeqCol">
            beatSeqColumn
            <BeatSeqList newMachineCreated={machineCreated} />
            {/* above doesnt seem to work, probably need useEffect */}

            <button
                onClick={() => handleAddMachineClick()}
            >Add</button>
        </div>
    )
}

export default BeatSeqColumn