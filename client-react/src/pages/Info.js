import React from "react";
import { VolumeUp, Backspace } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

//need to adust positioning for each popover

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const Info = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popNum, setPopNum] = React.useState(-1);

  const renderButton = (num) => {
    return (
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        size="small"
        onClick={(e) => handleClick(e, num)}
      >
        {num}.
      </Button>
    );
  };

  const handleClick = (event, itemNum) => {
    setAnchorEl(event.currentTarget);
    setPopNum(itemNum);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopNum(-1);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="pageContent">
      <div className="pageTitle">
        <h1>Info & Help Page</h1>
      </div>
      <p>
        Click on the numbered buttons below for more info on using the
        Sequencer.
      </p>
      <div className="infoHelper">
        <Grid
          container
          spacing={10}
          className="flexGrow"
          align="center"
          alignItems="center"
          justify="center"
        >
          <Grid container item xs={16} spacing={3} className="infoButtonsRow">
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              {renderButton(1)}
            </Grid>
            {/* <Grid item xs={4}></Grid> */}
            <Grid item xs={3}>
              {renderButton(2)}
            </Grid>
            <Grid item xs={1}>
              {renderButton(3)}
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <Grid container item xs={16} spacing={3} className="infoButtonsRow">
            <Grid item xs={5}>
              {renderButton(4)}
            </Grid>
            <Grid item xs={7}></Grid>
          </Grid>
          <Grid container item xs={16} spacing={3} className="infoButtonsRow">
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              {renderButton(5)}
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <Grid container item xs={16} spacing={3} className="infoButtonsRow">
            <Grid item xs={12}></Grid>
          </Grid>
          <Grid container item xs={12} spacing={3} className="infoButtonsRow">
            <Grid item xs={12}></Grid>
          </Grid>
          <Grid container item xs={12} spacing={3} className="infoButtonsRow">
            <Grid item xs={1}>
              {renderButton(6)}
            </Grid>
            <Grid item xs={11}></Grid>
          </Grid>
          <Grid container item xs={12} spacing={3} className="infoButtonsRow">
            <Grid item xs={8}></Grid>
            <Grid item xs={2}>
              {renderButton(7)}
            </Grid>
            <Grid item xs={2}>
              {renderButton(8)}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          {popNum === 1 && (
            <>
              <p>
                <b>
                  <u>Edit Title</u>
                </b>
              </p>
              <p>
                Click on the Edit button to change the name of the currently
                selected sequence.
              </p>
              <p>
                Changes will be saved automatically after clicking away from the
                titlebar.
              </p>
            </>
          )}

          {popNum === 2 && (
            <>
              <p>
                <b>
                  <u>Tempo Adjust</u>
                </b>
              </p>
              <p>Change the tempo of your sequence.</p>
            </>
          )}
          {popNum === 3 && (
            <>
              <p>
                <b>
                  <u>Play</u>
                </b>{" "}
              </p>
              <p>Play your grid sequence.</p>
            </>
          )}
          {popNum === 4 && (
            <>
              {" "}
              <VolumeUp />
              <p>
                <b>
                  <u>Preview Instrument</u>
                </b>
              </p>
              <p>
                Click on the icon to get an audio preview of the instrument.
              </p>
              <br />
              <Backspace />
              <p>
                <b>
                  <u>Clear Row </u>
                </b>
              </p>
              <p>Reset the selected instrument's grid row.</p>
            </>
          )}
          {popNum === 5 && (
            <>
              <p>
                <b>
                  <u>Grid Selector </u>
                </b>{" "}
              </p>
              <p>
                <u>Click Once:</u>
                <br />
                Instrument will play on the selected grid element.
                <br />
                <br />
                <u>SHIFT + Click:</u>
                <br />
                Instrument will play a three-note roll on the selected grid.
              </p>
            </>
          )}
          {popNum === 6 && (
            <>
              {" "}
              <p>
                <b>
                  <u>Audio Track Row </u>
                </b>
              </p>
              <p>
                <u>Click and hold:</u>
                <br />
                Plays a continuous audio track until button is released.
              </p>
            </>
          )}
          {popNum === 7 && (
            <>
              {" "}
              <p>
                <b>
                  <u>Clear Grid </u>
                </b>{" "}
              </p>
              <p>Reset all the instruments on the current grid page.</p>
            </>
          )}
          {popNum === 8 && (
            <>
              <p>
                <b>
                  <u>Save </u>
                </b>{" "}
              </p>
              <p>Save your grid sequence to your account.</p>
            </>
          )}
          {popNum === 9 && (
            <>
              <p>Tempo Adjust </p>
              <p>Change the tempo of your sequence.</p>
            </>
          )}
          {popNum === 10 && <> </>}
        </Typography>
      </Popover>
    </div>
  );
};

export default Info;
