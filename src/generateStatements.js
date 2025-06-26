import React, { useState, useEffect } from "react";
import solver from "logic-solver";

const cell = (i, j, N) => (i * N) + j + 1;

const Statements = ({ N }) => {
  const [statement, setStatement] = useState([]);
  const [solutionText, setSolutionText] = useState("");


  useEffect(() => {
    if (!N || N < 1) {
      setStatement([]);
      setSolutionText("");
      return;
    }

    const clauses = [];

    for (let i = 0; i < N; i++) {
      let clause = '';
      for (let j = 0; j < N; j++) {
        clause += `${cell(i, j, N)} `;
      }
      clauses.push(clause + '0');
    }


    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        for (let k = j + 1; k < N; k++) {
          clauses.push(`-${cell(i, j, N)} -${cell(i, k, N)} 0`);
        }
      }
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        for (let k = j + 1; k < N; k++) {
          clauses.push(`-${cell(j, i, N)} -${cell(k, i, N)} 0`);
        }
      }
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        let p = i + 1,
          q = j + 1;
        while (p < N && q < N) {
          clauses.push(`-${cell(i, j, N)} -${cell(p, q, N)} 0`);
          p++;
          q++;
        }
        p = i + 1;
        q = j - 1;
        while (p < N && q >= 0) {
          clauses.push(`-${cell(i, j, N)} -${cell(p, q, N)} 0`);
          p++;
          q--;
        }
      }
    }

    setStatement(clauses);

    const s = new solver.Solver();

    clauses.forEach(line => {
      const nums = line
        .trim()
        .split(/\s+/)
        .map(Number)
        .filter(n => n !== 0);

      const literals = nums.map(n =>
        n > 0 ? `v${n}` : solver.not(`v${-n}`)
      );

      s.require(solver.or(...literals));
    });

    const solution = s.solve();

    if (solution) {
      let boardResult = "";
      let cnfResult = "";
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const pos = cell(i, j, N)
          const v = `v${pos}`;
          boardResult += solution.evaluate(v) ? "Q " : ". ";
          cnfResult += solution.evaluate(v) ? `${pos} ` : `-${pos} `;
        }
        boardResult += "\n";
      }
      setSolutionText(boardResult+"SATISFIABLE - \n"+cnfResult);
    } else {
      setSolutionText("UNSATISFIABLE - No solution found.");
    }
  }, [N]);

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <textarea
        readOnly
        rows={20}
        style={{ width: "70%", border: "1px solid #ccc", padding: "0.5rem", resize: "none" }}
        value={statement.join("\n")}
      />
      <textarea
        readOnly
        rows={20}
        style={{ width: "70%", border: "1px solid #ccc", padding: "0.5rem", fontFamily: "monospace", resize: "none" }}
        value={solutionText}
        placeholder="Solution will appear here"
      />
    </div>
  );
};

export default Statements;
