const STORAGE_KEY = "vantastats.scoreboard.v1";

const defaultState = {
  matchPoint: 16,
  teams: {
    alpha: { name: "Team Alpha", score: 0, kills: 0 },
    omega: { name: "Team Omega", score: 0, kills: 0 },
  },
};

const state = loadState();
const teamCards = document.querySelectorAll("[data-team]");
const leaderText = document.querySelector("#leader-text");
const matchPointInput = document.querySelector("#match-point");
const resetButton = document.querySelector("#reset-button");
const winnerDialog = document.querySelector("#winner-dialog");
const winnerTitle = document.querySelector("#winner-title");
const winnerSummary = document.querySelector("#winner-summary");
const closeWinnerButton = document.querySelector("#close-winner");

function loadState() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return structuredClone(defaultState);
  }

  try {
    const parsedState = JSON.parse(savedState);

    return {
      ...structuredClone(defaultState),
      ...parsedState,
      teams: {
        ...structuredClone(defaultState.teams),
        ...parsedState.teams,
      },
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clampStat(value) {
  return Math.max(0, value);
}

function updateTeam(teamId, stat, delta) {
  state.teams[teamId][stat] = clampStat(state.teams[teamId][stat] + delta);
  render();
  checkWinner(teamId);
}

function renameTeam(teamId) {
  const currentName = state.teams[teamId].name;
  const nextName = window.prompt("Drop the new team name:", currentName)?.trim();

  if (!nextName) {
    return;
  }

  state.teams[teamId].name = nextName.slice(0, 28);
  render();
}

function resetBoard() {
  Object.values(state.teams).forEach((team) => {
    team.score = 0;
    team.kills = 0;
  });

  if (winnerDialog.open) {
    winnerDialog.close();
  }

  render();
}

function getLeaderMessage() {
  const { alpha, omega } = state.teams;

  if (alpha.score === omega.score) {
    return "Dead even";
  }

  const leader = alpha.score > omega.score ? alpha : omega;
  const margin = Math.abs(alpha.score - omega.score);
  return `${leader.name} by ${margin}`;
}

function checkWinner(teamId) {
  const team = state.teams[teamId];

  if (team.score < state.matchPoint || winnerDialog.open) {
    return;
  }

  winnerTitle.textContent = `${team.name} takes the dub`;
  winnerSummary.textContent = `${team.score} points and ${team.kills} kills. Certified aura secured.`;
  winnerDialog.showModal();
}

function render() {
  matchPointInput.value = state.matchPoint;
  leaderText.textContent = getLeaderMessage();

  teamCards.forEach((card) => {
    const teamId = card.dataset.team;
    const team = state.teams[teamId];

    card.querySelector("[data-action='rename']").textContent = team.name;
    card.querySelector("[data-stat='score']").textContent = team.score;
    card.querySelector("[data-stat='kills']").textContent = team.kills;
  });

  saveState();
}

teamCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) {
      return;
    }

    const teamId = card.dataset.team;
    const action = button.dataset.action;

    const actions = {
      "score-up": () => updateTeam(teamId, "score", 1),
      "score-down": () => updateTeam(teamId, "score", -1),
      "kills-up": () => updateTeam(teamId, "kills", 1),
      "kills-down": () => updateTeam(teamId, "kills", -1),
      rename: () => renameTeam(teamId),
    };

    actions[action]?.();
  });
});

matchPointInput.addEventListener("input", (event) => {
  state.matchPoint = Math.max(1, Number(event.target.value) || defaultState.matchPoint);
  render();
});

resetButton.addEventListener("click", resetBoard);
closeWinnerButton.addEventListener("click", resetBoard);

render();
