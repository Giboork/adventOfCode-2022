export {};

const input = await Deno.readTextFile("day-2/input.txt");
const data: string[] = input.split("\n");

const shapeMap = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
};

const desiredResultMap = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const scorePerYourPick = {
  A: 1,
  B: 2,
  C: 3,
};

const scoreFromResults = {
  lost: 0,
  draw: 3,
  win: 6,
};

const getNeededShape = (
  elfPick: keyof typeof shapeMap,
  desiredResult: string
) => {
  const elfShape = shapeMap[elfPick];

  if (desiredResult === "win") {
    if (elfShape === "Rock") {
      return "B";
    }
    if (elfShape === "Paper") {
      return "C";
    }
    if (elfShape === "Scissors") {
      return "A";
    }
  }
  if (desiredResult === "lose") {
    if (elfShape === "Rock") {
      return "C";
    }
    if (elfShape === "Paper") {
      return "A";
    }
    if (elfShape === "Scissors") {
      return "B";
    }
  }

  return elfPick;
};

const alteredData = data.map((line) => {
  const [elfPick, result] = line.split(" ") as [
    keyof typeof shapeMap,
    keyof typeof desiredResultMap
  ];
  const desiredResult = desiredResultMap[result];
  const neededSymbol = getNeededShape(elfPick, desiredResult);

  if (elfPick) {
    return `${elfPick} ${neededSymbol}`;
  }
  return "";
});

const getMatchResult = (
  elfPick: keyof typeof shapeMap,
  yourPick: keyof typeof shapeMap
) => {
  const elfShape = shapeMap[elfPick];
  const yourShape = shapeMap[yourPick];

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

const totalScore = alteredData.reduce<number>((acc, curr) => {
  if (curr) {
    const [elfPick, yourPick] = curr.split(" ") as [
      keyof typeof shapeMap,
      keyof typeof shapeMap
    ];

    const matchResult = getMatchResult(elfPick, yourPick);
    const resultScore = scoreFromResults[matchResult];
    const yourPickScore = scorePerYourPick[yourPick];

    return acc + resultScore + yourPickScore;
  }
  return acc;
}, 0);

console.log("data: ", totalScore);
