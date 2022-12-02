export {};

const input = await Deno.readTextFile("day-2/input.txt");
const data: string[] = input.split("\n");

const elfShapeMap = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
};

const yourPickMap = {
  X: "Rock",
  Y: "Paper",
  Z: "Scissors",
};

const scorePerYourPick = {
  X: 1,
  Y: 2,
  Z: 3,
};

const scoreFromResults = {
  lost: 0,
  draw: 3,
  win: 6,
};

const getMatchResult = (
  elfPick: keyof typeof elfShapeMap,
  yourPick: keyof typeof yourPickMap
) => {
  const elfShape = elfShapeMap[elfPick];
  const yourShape = yourPickMap[yourPick];

  if (elfShape === yourShape) {
    return "draw" as const;
  }
  if (
    (elfShape === "Rock" && yourShape === "Paper") ||
    (elfShape === "Paper" && yourShape === "Scissors") ||
    (elfShape === "Scissors" && yourShape === "Rock")
  ) {
    return "win" as const;
  }
  return "lost" as const;
};

const totalScore = data.reduce<number>((acc, curr, index) => {
  if (curr) {
    const [elfPick, yourPick] = curr.split(" ") as [
      keyof typeof elfShapeMap,
      keyof typeof yourPickMap
    ];

    const matchResult = getMatchResult(elfPick, yourPick);
    const resultScore = scoreFromResults[matchResult];
    const yourPickScore = scorePerYourPick[yourPick];

    return acc + resultScore + yourPickScore;
  }
  return acc;
}, 0);

console.log("data: ", totalScore);
