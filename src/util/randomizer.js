import {
  allPerks,
  allFieldUpgrades,
  allLethals,
  allTacticals,
  allKillstreaks,
} from "./data";

export const randomizeWeapon = (weapons, numAttachments) => {
  let keys = Object.keys(weapons);
  let randomIndex = Math.floor(Math.random() * keys.length);

  const weaponClass = weapons[keys[randomIndex]];
  keys = Object.keys(weaponClass);
  randomIndex = Math.floor(Math.random() * keys.length);

  const weapon = weaponClass[keys[randomIndex]];

  delete weaponClass[keys[randomIndex]];

  return [weapon.name, randomizeAttachments(weapon, numAttachments)];
};

const randomizeAttachments = (weapon, numAttachments) => {
  const userAttachments = [];

  const weaponAttachments = weapon.attachments.slice();

  if (numAttachments == -1) {
    numAttachments = Math.floor(Math.random() * 6);
  }

  for (let i = 0; i < numAttachments && weaponAttachments.length !== 0; i++) {
    let randomIndex = Math.floor(Math.random() * weaponAttachments.length);

    const attachmentClass = weaponAttachments[randomIndex];

    weaponAttachments.splice(randomIndex, 1);

    randomIndex = Math.floor(Math.random() * attachmentClass.items.length);
    const randomAttachment = attachmentClass.items[randomIndex];

    userAttachments.push({
      name: attachmentClass.name,
      attachment: randomAttachment,
    });
  }

  return userAttachments;
};

export const randomizePerks = (overkillAlwaysOn) => {
  const userPerks = [];

  const basePerks = allPerks.base.slice();
  let randomIndex = 0;
  if (overkillAlwaysOn) {
    const overkillIndex = basePerks.indexOf("Overkill");
    userPerks.push(basePerks[overkillIndex]);
    basePerks.splice(overkillIndex, 1);
  } else {
    randomIndex = Math.floor(Math.random() * basePerks.length);
    userPerks.push(basePerks[randomIndex]);
    basePerks.splice(randomIndex, 1);
  }

  randomIndex = Math.floor(Math.random() * basePerks.length);
  userPerks.push(basePerks[randomIndex]);

  const bonusPerks = allPerks.bonus.slice();
  randomIndex = Math.floor(Math.random() * bonusPerks.length);
  userPerks.push(bonusPerks[randomIndex]);

  const ultimatePerks = allPerks.ultimate.slice();
  randomIndex = Math.floor(Math.random() * ultimatePerks.length);
  userPerks.push(ultimatePerks[randomIndex]);

  return userPerks;
};

export const randomizeFieldUpgrades = () => {
  const userFieldUpgrades = [];

  const copy = allFieldUpgrades.slice();
  let randomIndex = Math.floor(Math.random() * copy.length);
  userFieldUpgrades.push(copy[randomIndex]);
  copy.splice(randomIndex, 1);
  randomIndex = Math.floor(Math.random() * copy.length);
  userFieldUpgrades.push(copy[randomIndex]);

  return userFieldUpgrades;
};

export const randomizeLethal = () => {
  const randomIndex = Math.floor(Math.random() * allLethals.length);
  return allLethals[randomIndex];
};

export const randomizeTactical = () => {
  const randomIndex = Math.floor(Math.random() * allTacticals.length);
  return allTacticals[randomIndex];
};

export const randomizeKillStreaks = () => {
  const userKillstreaks = [];

  const copy = allKillstreaks.slice();
  let randomIndex = Math.floor(Math.random() * copy.length);
  let streaks = copy[randomIndex].streaks;
  userKillstreaks.push({
    streak: streaks[Math.floor(Math.random() * streaks.length)],
    kills: copy[randomIndex].kills,
  });

  copy.splice(randomIndex, 1);
  randomIndex = Math.floor(Math.random() * copy.length);
  streaks = copy[randomIndex].streaks;
  userKillstreaks.push({
    streak: streaks[Math.floor(Math.random() * streaks.length)],
    kills: copy[randomIndex].kills,
  });

  copy.splice(randomIndex, 1);
  randomIndex = Math.floor(Math.random() * copy.length);
  streaks = copy[randomIndex].streaks;
  userKillstreaks.push({
    streak: streaks[Math.floor(Math.random() * streaks.length)],
    kills: copy[randomIndex].kills,
  });

  userKillstreaks.sort((a, b) => a.kills - b.kills);

  return userKillstreaks;
};
