import { useState } from "react";

function App() {
  // RESPONSIVE
  const isMobile =
    window.innerWidth < 768;

  // TEAM TEMPLATE
  const createTeam = (name) => ({
    name,
    score: 0,
    wickets: 0,
    balls: 0,
    extras: 0,
    wides: 0,
    noBalls: 0,
    oversHistory: [[]],
  });

  // STATES
  const [team1, setTeam1] = useState(
    createTeam("Team A")
  );

  const [team2, setTeam2] = useState(
    createTeam("Team B")
  );

  const [innings, setInnings] =
    useState(1);

  // EXTRA POPUP
  const [showExtraPopup, setShowExtraPopup] =
    useState(false);

  const [extraType, setExtraType] =
    useState("");

  // CURRENT TEAM
  const currentTeam =
    innings === 1 ? team1 : team2;

  const setCurrentTeam =
    innings === 1 ? setTeam1 : setTeam2;

  // OVERS
  const calculateOvers = (balls) => {
    const over = Math.floor(
      balls / 6
    );

    const remaining = balls % 6;

    return `${over}.${remaining}`;
  };

  // RUN RATE
  const runRate = (score, balls) => {
    if (balls === 0) return "0.00";

    return (
      score /
      (balls / 6)
    ).toFixed(2);
  };

  // STRIKE RATE
  const strikeRate = (
    score,
    balls
  ) => {
    if (balls === 0) return "0.00";

    return (
      (score / balls) * 100
    ).toFixed(2);
  };

  // ADD EVENT
  const addEvent = (
    type,
    runs = 0
  ) => {
    setCurrentTeam((prev) => {
      let score = prev.score;
      let wickets = prev.wickets;
      let balls = prev.balls;

      let extras = prev.extras;
      let wides = prev.wides;
      let noBalls = prev.noBalls;

      let event = "";

      let overs = [
        ...prev.oversHistory,
      ];

      let currentOver =
        Math.floor(prev.balls / 6);

      if (!overs[currentOver]) {
        overs[currentOver] = [];
      }

      // NORMAL RUN
      if (type === "RUN") {
        score += runs;
        balls += 1;
        event = runs.toString();
      }

      // DOT
      else if (type === "DOT") {
        balls += 1;
        event = ".";
      }

      // NR
      else if (type === "NR") {
        balls += 1;
        event = "NR";
      }

      // WICKET
      else if (type === "W") {
        wickets += 1;
        balls += 1;
        event = "W";
      }

      // WIDE
      else if (type === "WD") {
        /*
          0 -> no run wide
          1 -> normal wide
          2 -> wide + 1
        */

        score += runs;
        extras += runs;

        if (runs === 0) {
          event = "WD0";
        } else if (runs === 1) {
          wides += 1;
          event = "WD";
        } else {
          wides += 1;
          event = `WD+${runs - 1}`;
        }
      }

      // NO BALL
      else if (type === "NB") {
        /*
          0 -> no run nb
          1 -> normal nb
          2 -> nb + 1
        */

        score += runs;
        extras += runs;

        if (runs === 0) {
          event = "NB0";
        } else if (runs === 1) {
          noBalls += 1;
          event = "NB";
        } else {
          noBalls += 1;
          event = `NB+${runs - 1}`;
        }
      }

      // ADD TO HISTORY
      overs[currentOver] = [
        ...overs[currentOver],
        event,
      ];

      return {
        ...prev,
        score,
        wickets,
        balls,
        extras,
        wides,
        noBalls,
        oversHistory: overs,
      };
    });
  };

  // NEXT INNINGS
  const nextInnings = () => {
    if (innings === 1) {
      setInnings(2);
    }
  };

  // RESET MATCH
  const resetMatch = () => {
    setTeam1(createTeam("Team A"));
    setTeam2(createTeam("Team B"));
    setInnings(1);
  };

  // BUTTON STYLE
  const btnStyle = {
    padding: isMobile
      ? "10px"
      : "12px",

    border: "none",

    borderRadius: "12px",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: isMobile
      ? "14px"
      : "16px",
  };

  // CARD STYLE
  const cardStyle = {
    background:
      "linear-gradient(145deg,#1e293b,#0f172a)",

    padding: isMobile
      ? "15px"
      : "20px",

    borderRadius: "20px",

    boxShadow:
      "0px 0px 20px rgba(0,0,0,0.3)",

    flex: "1",

    minWidth: isMobile
      ? "100%"
      : "300px",
  };

  // EXTRA OPTIONS
  const extraOptions = [
    { label: "0", value: 0 },

    { label: "1", value: 1 },

    { label: "1+1", value: 2 },

    { label: "1+2", value: 3 },

    { label: "1+3", value: 4 },

    { label: "1+4", value: 5 },

    { label: "1+6", value: 7 },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(to right,#020617,#0f172a)",

        padding: isMobile
          ? "10px"
          : "20px",

        color: "white",

        fontFamily: "Arial",

        overflowX: "hidden",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          textAlign: "center",

          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            color: "#38bdf8",

            fontSize: isMobile
              ? "30px"
              : "40px",
          }}
        >
          Cricket Scoreboard
        </h1>

        <h2
          style={{
            color: "#facc15",
          }}
        >
          Innings {innings}
        </h2>
      </div>

      {/* TOP SECTION */}
      <div
        style={{
          display: isMobile
            ? "block"
            : "flex",

          gap: isMobile
            ? "10px"
            : "20px",
        }}
      >
        {/* SCORECARD */}
        <div style={cardStyle}>
          <h2
            style={{
              color: "#38bdf8",
            }}
          >
            {currentTeam.name}
          </h2>

          <h1
            style={{
              fontSize: isMobile
                ? "38px"
                : "55px",
            }}
          >
            {currentTeam.score}/
            {currentTeam.wickets}
          </h1>

          <div
            style={{
              marginTop: "20px",

              lineHeight: "2",
            }}
          >
            <h3>
              Overs:{" "}
              {calculateOvers(
                currentTeam.balls
              )}
            </h3>

            <h3>
              Extras:{" "}
              {currentTeam.extras}
            </h3>

            <h3>
              Wides:{" "}
              {currentTeam.wides}
            </h3>

            <h3>
              No Balls:{" "}
              {currentTeam.noBalls}
            </h3>

            <h3>
              Run Rate:{" "}
              {runRate(
                currentTeam.score,
                currentTeam.balls
              )}
            </h3>

            <h3>
              Strike Rate:{" "}
              {strikeRate(
                currentTeam.score,
                currentTeam.balls
              )}
            </h3>
          </div>
        </div>

        {/* CONTROLS */}
        <div
          style={{
            ...cardStyle,

            marginTop: isMobile
              ? "15px"
              : "0px",
          }}
        >
          <h2
            style={{
              color: "#38bdf8",
            }}
          >
            Match Controls
          </h2>

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                isMobile
                  ? "repeat(2,1fr)"
                  : "repeat(auto-fit,minmax(90px,1fr))",

              gap: "12px",

              marginTop: "20px",
            }}
          >
            {/* DOT */}
            <button
              style={{
                ...btnStyle,

                background: "#64748b",
              }}
              onClick={() =>
                addEvent("DOT")
              }
            >
              Dot
            </button>

            {/* NR */}
            <button
              style={{
                ...btnStyle,

                background: "#475569",
              }}
              onClick={() =>
                addEvent("NR")
              }
            >
              NR
            </button>

            {/* RUNS */}
            {[1, 2, 3, 4, 6].map(
              (run) => (
                <button
                  key={run}
                  style={{
                    ...btnStyle,

                    background:
                      "#22c55e",
                  }}
                  onClick={() =>
                    addEvent(
                      "RUN",
                      run
                    )
                  }
                >
                  {run}
                </button>
              )
            )}

            {/* WIDE */}
            <button
              style={{
                ...btnStyle,

                background: "orange",
              }}
              onClick={() => {
                setExtraType("WD");

                setShowExtraPopup(
                  true
                );
              }}
            >
              Wide
            </button>

            {/* NO BALL */}
            <button
              style={{
                ...btnStyle,

                background: "#3b82f6",
              }}
              onClick={() => {
                setExtraType("NB");

                setShowExtraPopup(
                  true
                );
              }}
            >
              No Ball
            </button>

            {/* WICKET */}
            <button
              style={{
                ...btnStyle,

                background: "red",
              }}
              onClick={() =>
                addEvent("W")
              }
            >
              Wicket
            </button>
          </div>

          {/* MATCH BUTTONS */}
          <div
            style={{
              display: "flex",

              gap: "15px",

              marginTop: "25px",

              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                ...btnStyle,

                background: "purple",

                flex: 1,
              }}
              onClick={nextInnings}
            >
              Next Innings
            </button>

            <button
              style={{
                ...btnStyle,

                background: "#ef4444",

                flex: 1,
              }}
              onClick={resetMatch}
            >
              Reset Match
            </button>
          </div>
        </div>
      </div>

      {/* OVER HISTORY */}
      <div
        style={{
          marginTop: "30px",

          ...cardStyle,
        }}
      >
        <h2
          style={{
            color: "#38bdf8",
          }}
        >
          Over Wise History
        </h2>

        {currentTeam.oversHistory.map(
          (over, overIndex) => (
            <div
              key={overIndex}
              style={{
                marginTop: "25px",
              }}
            >
              <h3>
                Over {overIndex + 1}
              </h3>

              <div
                style={{
                  display: "flex",

                  gap: "10px",

                  flexWrap: "wrap",

                  marginTop: "10px",
                }}
              >
                {over.map(
                  (ball, ballIndex) => (
                    <div
                      key={ballIndex}
                      style={{
                        minWidth:
                          isMobile
                            ? "45px"
                            : "60px",

                        height:
                          isMobile
                            ? "45px"
                            : "60px",

                        borderRadius:
                          "50%",

                        display: "flex",

                        justifyContent:
                          "center",

                        alignItems:
                          "center",

                        fontWeight:
                          "bold",

                        background:
                          ball === "W"
                            ? "#ef4444"
                            : ball.includes(
                                "WD"
                              )
                            ? "#f59e0b"
                            : ball.includes(
                                "NB"
                              )
                            ? "#3b82f6"
                            : "#22c55e",

                        padding: "5px",
                      }}
                    >
                      {ball}
                    </div>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* EXTRA POPUP */}
      {showExtraPopup && (
        <div
          style={{
            position: "fixed",

            top: 0,

            left: 0,

            width: "100%",

            height: "100%",

            background:
              "rgba(0,0,0,0.7)",

            display: "flex",

            justifyContent:
              "center",

            alignItems:
              "center",

            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#1e293b",

              padding: "30px",

              borderRadius: "20px",

              width: isMobile
                ? "90%"
                : "330px",

              textAlign: "center",
            }}
          >
            <h2>
              {extraType === "WD"
                ? "Wide Ball"
                : "No Ball"}
            </h2>

            <p
              style={{
                marginTop: "10px",
              }}
            >
              Choose runs
            </p>

            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(3,1fr)",

                gap: "10px",

                marginTop: "20px",
              }}
            >
              {extraOptions.map(
                (item) => (
                  <button
                    key={item.value}
                    style={{
                      padding: "12px",

                      border: "none",

                      borderRadius:
                        "10px",

                      background:
                        "#38bdf8",

                      color: "white",

                      fontWeight:
                        "bold",

                      cursor: "pointer",
                    }}
                    onClick={() => {
                      addEvent(
                        extraType,
                        item.value
                      );

                      setShowExtraPopup(
                        false
                      );
                    }}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>

            <button
              style={{
                marginTop: "20px",

                padding: "12px",

                width: "100%",

                border: "none",

                borderRadius: "10px",

                background: "red",

                color: "white",

                cursor: "pointer",
              }}
              onClick={() =>
                setShowExtraPopup(
                  false
                )
              }
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;