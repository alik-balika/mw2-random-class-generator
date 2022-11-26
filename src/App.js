import React, { useState, useEffect } from "react";
import {
  allWeapons,
  allPerks,
  allTacticals,
  allLethals,
  allFieldUpgrades,
  allKillstreaks,
} from "./util/data";

function App() {
  const [primaryWeapon, setPrimaryWeapon] = useState("");
  const [secondaryWeapon, setSecondaryWeapon] = useState("");
  const [primaryAttachments, setPrimaryAttachments] = useState([]);
  const [secondaryAttachments, setSecondaryAttachments] = useState([]);
  const [tactical, setTactical] = useState("");
  const [lethal, setLethal] = useState("");
  const [perks, setPerks] = useState([]);
  const [fieldUpgrades, setFieldUpgrades] = useState([]);
  const [killStreaks, setKillStreaks] = useState([]);

  const randomizeClass = () => {
    const perks = randomizePerks();
    randomizeTactical();
    randomizeLethal();
    randomizeFieldUpgrades();
    randomizeKillStreaks();

    const copy = JSON.parse(JSON.stringify(allWeapons));
    console.log(perks);
    randomizeWeapon(copy.primary, true);
    if (perks.includes("Overkill")) {
      console.log("Overkill included");
      randomizeWeapon(copy.primary, false);
    } else {
      console.log("Overkill not included");
      randomizeWeapon(copy.secondary, false);
    }
    console.log(primaryWeapon);
    console.log(secondaryWeapon);
    console.log(copy.primary);
  };

  const randomizeWeapon = (weapons, primary) => {
    let keys = Object.keys(weapons);
    let randomIndex = Math.floor(Math.random() * keys.length);

    const weaponClass = weapons[keys[randomIndex]];
    keys = Object.keys(weaponClass);
    randomIndex = Math.floor(Math.random() * keys.length);

    const weapon = weaponClass[keys[randomIndex]];

    delete weaponClass[keys[randomIndex]];

    if (primary) {
      setPrimaryWeapon(weapon.name);
    } else {
      setSecondaryWeapon(weapon.name);
    }

    randomizeAttachments(weapon, primary);
  };

  const randomizeAttachments = (weapon, primary) => {
    const userAttachments = [];

    const weaponAttachments = weapon.attachments.slice();

    for (let i = 0; i < 5 && weaponAttachments.length !== 0; i++) {
      // There is a 50% chance that an attachment can be chosen
      const chance = Math.floor(Math.random() * 2);
      if (chance == 0) {
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
    }

    if (primary) {
      setPrimaryAttachments(userAttachments);
    } else {
      setSecondaryAttachments(userAttachments);
    }
  };

  const randomizeKillStreaks = () => {
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

    setKillStreaks(userKillstreaks);
  };

  const randomizeFieldUpgrades = () => {
    const userFieldUpgrades = [];

    const copy = allFieldUpgrades.slice();
    let randomIndex = Math.floor(Math.random() * copy.length);
    userFieldUpgrades.push(copy[randomIndex]);
    copy.splice(randomIndex, 1);
    randomIndex = Math.floor(Math.random() * copy.length);
    userFieldUpgrades.push(copy[randomIndex]);

    setFieldUpgrades(userFieldUpgrades);
  };

  const randomizeLethal = () => {
    const randomIndex = Math.floor(Math.random() * allLethals.length);
    setLethal(allLethals[randomIndex]);
  };

  const randomizeTactical = () => {
    const randomIndex = Math.floor(Math.random() * allTacticals.length);
    setTactical(allTacticals[randomIndex]);
  };

  const randomizePerks = () => {
    const userPerks = [];

    const basePerks = allPerks.base.slice();
    let randomIndex = Math.floor(Math.random() * basePerks.length);
    userPerks.push(basePerks[randomIndex]);
    basePerks.splice(randomIndex, 1);
    randomIndex = Math.floor(Math.random() * basePerks.length);
    userPerks.push(basePerks[randomIndex]);

    const bonusPerks = allPerks.bonus.slice();
    randomIndex = Math.floor(Math.random() * bonusPerks.length);
    userPerks.push(bonusPerks[randomIndex]);

    const ultimatePerks = allPerks.ultimate.slice();
    randomIndex = Math.floor(Math.random() * ultimatePerks.length);
    userPerks.push(ultimatePerks[randomIndex]);

    setPerks(userPerks);
    return userPerks;
  };

  return (
    <div>
      <h1>
        Primary: <span className="font-bold">{primaryWeapon}</span>
      </h1>
      <div className="flex">
        <h2>Primary Attachments:&nbsp;</h2>
        {primaryAttachments.map((att) => (
          <h2
            key={att.name}
            className="font-bold"
          >{`${att.name} - ${att.attachment}, `}</h2>
        ))}
      </div>
      <h1>
        Secondary: <span className="font-bold">{secondaryWeapon}</span>
      </h1>
      <div className="flex">
        <h2>Secondary Attachments:&nbsp;</h2>
        {secondaryAttachments.map((att) => (
          <h2
            key={att.name}
            className="font-bold"
          >{`${att.name} - ${att.attachment}, `}</h2>
        ))}
      </div>
      <h1>
        Tactical: <span className="font-bold">{tactical}</span>
      </h1>
      <h1>
        Lethal: <span className="font-bold">{lethal}</span>
      </h1>
      <div className="flex">
        <h1>Perks:&nbsp;</h1>
        {perks.map((perk) => (
          <h1 key={perk} className="font-bold">
            {`${perk},`}&nbsp;
          </h1>
        ))}
      </div>
      <h1>
        Field Upgrades:
        {fieldUpgrades.length !== 0 ? (
          <span className="font-bold">
            {` ${fieldUpgrades[0]}, ${fieldUpgrades[1]}`}
          </span>
        ) : (
          ""
        )}
      </h1>
      <h1>
        Killstreaks:
        {killStreaks.length !== 0 ? (
          <span className="font-bold">
            {` ${killStreaks[0].streak}, ${killStreaks[1].streak}, ${killStreaks[2].streak}`}
          </span>
        ) : (
          ""
        )}
      </h1>
      <button
        className="bg-black text-white rounded-full p-3 m-5 hover:bg-red-700"
        type="button"
        onClick={() => {
          randomizeClass();
        }}
      >
        Randomize
      </button>
    </div>
  );
}

export default App;
