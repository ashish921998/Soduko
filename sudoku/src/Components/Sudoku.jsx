import React, { useEffect, useState } from "react";

let arr = [
  [0, 4, 0, 0, 0, 0, 1, 7, 9],
  [0, 0, 2, 0, 0, 8, 0, 5, 4],
  [0, 0, 6, 0, 0, 5, 0, 0, 8],
  [0, 8, 0, 0, 7, 0, 9, 1, 0],
  [0, 5, 0, 0, 9, 0, 0, 3, 0],
  [0, 1, 9, 0, 6, 0, 0, 4, 0],
  [3, 0, 0, 4, 0, 0, 7, 0, 0],
  [5, 7, 0, 1, 0, 0, 2, 0, 0],
  [9, 2, 8, 0, 0, 0, 0, 6, 0],
];

let backup = JSON.parse(JSON.stringify([...arr]));

function Sudoku() {
  let [board, setBoard] = useState(arr);

  let list = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        let m = [i, j];
        list.push(m);
      }
    }
  }

  function check(x, y, m) {
    let row = Math.floor(x / 3) * 3;
    let clm = Math.floor(y / 3) * 3;
    for (let i = row; i < row + 3; i++) {
      for (let j = clm; j < clm + 3; j++) {
        if (board[i][j] === m) {
          return false;
        }
      }
    }
    for (let i = 0; i < 9; i++) {
      if (board[i][y] === m) {
        return false;
      }
    }
    for (let j = 0; j < 9; j++) {
      if (board[x][j] === m) {
        return false;
      }
    }
    return true;
  }

  function sudokuSolver(curr) {
    if (curr === list.length) {
      return true;
    } else {
      let [i, j] = list[curr];
      for (let m = 1; m < 10; m++) {
        let k = check(i, j, m);
        if (k) {
          board[i][j] = m;
          let possible = sudokuSolver(curr + 1);
          if (possible) {
            return true;
          }
          board[i][j] = 0;
        }
      }
      return false;
    }
  }

  const solve = () => {
    let possible = sudokuSolver(0);
    console.log(possible);
    if (possible) {
      setBoard([...board]);
      //   setBoard(board.map((item) => item));
    } else {
      alert("Please try Again, Wrong answer");
      console.log(-1);
    }
  };

  const onChangeHandler = (e) => {
    let { id } = e.target;
    console.log(id);
    board[id[0]][id[2]] = +e.target.value;
    setBoard([...board]);
  };

  const userSolve = () => {
    solve();
    // let flag = true;
    // for (let i = 0; i < 9; i++) {
    //   for (let j = 0; j < 9; j++) {
    //     if (board[i][j] === 0) {
    //       flag = false;
    //       break;
    //     }
    //   }
    // }

    // if (flag) {
    //   solve();
    //   console.log(board);
    // } else {
    //   alert("Please fill all the squares");
    // }
  };

  useEffect(() => {
    // console.log(backup, "backup");
  }, [board]);

  //submitting user problem

  let [problem, setProblem] = useState("");
  const submitProblem = () => {
    let inp = problem.trim().split(/[\r\n]+/);
    let problemArr = [];
    for (let i = 0; i < inp.length; i++) {
      let m = inp[i].trim().split(" ").map(Number);
      problemArr.push(m);
    }
    setBoard([...problemArr]);
  };

  //Resetting problem

  const resetHandler = () => {
    setBoard([...backup]);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ maxWidth: "50%" }}>
        <h1>Sudoku Solver</h1>
        {board.map((item, i) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {item.map((mini, h) => (
              <input
                style={{ width: "8%", height: "40px" }}
                // type="number"
                onChange={(e) => onChangeHandler(e)}
                max="1"
                value={mini}
                id={[i, h]}
              />
            ))}
          </div>
        ))}
        <button onClick={() => userSolve()}>Solve it</button>
        <button onClick={() => solve()}>Get Solution</button>
        <button onClick={() => resetHandler()}>Reset</button>
      </div>
      <div style={{ margin: "auto" }}>
        <br />
        <textarea
          style={{ height: "150px", width: "150px" }}
          rows="9"
          onChange={(e) => {
            console.log(e.target.value);
            setProblem(e.target.value);
          }}
        />
        <br />
        <button onClick={() => submitProblem()}>submit input</button>
      </div>
    </div>
  );
}

export default Sudoku;
