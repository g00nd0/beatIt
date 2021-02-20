// import React from 'react'
const Home = () => {
  return (
    <div className="homeText">
      <div id="home-onlyText">
        <p style={{ fontSize: "45px", fontWeight: "bold" }}>BeatIT!</p>
        <p style={{ fontSize: "20px" }}>Drop the beat anytime, anywhere.</p>
        <p style={{ fontSize: "20px" }}>
          Lay down some sick grooves on the go.
        </p>
      </div>
      <div className="demoGif" />
      {/* <img
        src="/img/beatSeq.gif"
        alt="Girl in a jacket"
        width="500"
        height="600"
      /> */}
      <div>
        Icons made by
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div>
        Repos used:
        <a
          href="https://github.com/kenwheeler/hooks-drum-machine"
          title="Hooks-Drum-Machine"
        >
          Hooks Drum Machine by Ken Wheeler
        </a>
        ,
        <a href="https://github.com/dabit3/hype-beats" title="hype-beats">
          Hypebeats by dabit3
        </a>
      </div>
    </div>
  );
};

export default Home;
