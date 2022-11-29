import React, { useState } from "react";
import { allWeapons } from "./util/data";
import {
  randomizePerks,
  randomizeFieldUpgrades,
  randomizeLethal,
  randomizeTactical,
  randomizeKillStreaks,
  randomizeWeapon,
} from "./util/randomizer";

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
    setPerks(perks);
    setTactical(randomizeTactical());
    setLethal(randomizeLethal());
    setFieldUpgrades(randomizeFieldUpgrades());
    setKillStreaks(randomizeKillStreaks());

    const copy = JSON.parse(JSON.stringify(allWeapons));

    let randomWeaponAndAttachments = randomizeWeapon(copy.primary);
    setPrimaryWeapon(randomWeaponAndAttachments[0]);
    setPrimaryAttachments(randomWeaponAndAttachments[1]);

    let secondaryWeaponClass = null;
    if (perks.includes("Overkill")) {
      secondaryWeaponClass = copy.primary;
    } else {
      secondaryWeaponClass = copy.secondary;
    }

    randomWeaponAndAttachments = randomizeWeapon(secondaryWeaponClass);
    setSecondaryWeapon(randomWeaponAndAttachments[0]);
    setSecondaryAttachments(randomWeaponAndAttachments[1]);
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
        className="bg-white text-black font-bold rounded-full p-3 m-5 hover:bg-red-700"
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
