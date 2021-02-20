import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import { Delete } from "@material-ui/icons"

//show only the name and date updated
const BeatSeqOneCard = (props) => {
    const bsName = props.name
    const bsUpdatedAt = props.updatedAt
    const bsId = props.id

    const history = useHistory();

    const newDate = new Date(bsUpdatedAt)
    const corrMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const year = newDate.getFullYear()
    const month = corrMonth[newDate.getMonth()]
    const date = newDate.getDate()
    const hour = newDate.getHours()
    const min = newDate.getMinutes()
    const formattedTime = date + "-" + month + "-" + year + ", " + hour + ":" + min
    console.log("formattedTiem", formattedTime)

    const handleSelectBeatSeqClick = (e, bsId) => {
        e.stopPropagation();
        console.log("selected a beatSeq", bsId);
    }

    const handleDeleteBeatSeqClick = (e) => {
        e.stopPropagation();
        console.log("deleted beatSeq", bsId)
        // ask for confirmation to delete
        //axios here
        axios
            .put(`/api/beatsequence/${bsId}/sdelete`)
            .then((response) => {
                console.log("deactivated beatseq", bsId)
                props.setRefreshList(true)
                return history.push(`/beatseq`);
            })
            .catch((error) => {
                console.log('error', error)
            })
        //render beatSeqlist again
    }

    return (
        <div id="beatseqonecard" class="row no-gutters d-flex justify-content-around">
            {/* beatseqonecard */}
            <div class="py-1" id="onecard-cont">

                <div class="d-flex card-block" id="onecardcard">
                    <div class="" id="cardtext-wrap">
                        <Link to={`/beatseq/${bsId}`}
                            id="" class="btn btn-light p-1"
                            onClick={(e) => handleSelectBeatSeqClick(e, bsId)}>
                            <h6 class="card-title">{bsName}</h6>
                            <p class="card-text">
                                Last saved: {formattedTime}
                            </p>
                        </ Link>
                    </div>
                    {/* cardblock */}
                </div>
            </div>

            <div class="d-flex align-items-center" id="deletebtn">
                {/* button class="btn btn-info p-1 font-weight-bold w-100" */}
                <div>
                    <button class="btn btn-dark p-1 font-weight-bold w-100"
                        id=""
                        onClick={(e) => handleDeleteBeatSeqClick(e, bsId)}
                    >
                        <Delete />
                    </button>
                </div>
            </div>

        </div>

    )
}

export default BeatSeqOneCard