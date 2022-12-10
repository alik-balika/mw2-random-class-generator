import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
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

  if (!primaryWeapon) {
    return (
      <div className="flex h-screen w-full font-jura">
        <div className="flex-1 bg-hero bg-cover bg-center bg-no-repeat">
          <Header />

          <div className="flex flex-col items-center mt-10 px-20">
            <h1 className="p-8 max-w-lg text-xl text-center text-white font-bold bg-gradient-to-b from-topGray/80 to-bottomGray/90 rounded-sm">
              Hi! This website was created to allow players to randomly generate
              classes for whatever reasons they wish. Press the button below to
              generate a random class!
            </h1>
            <button
              className="bg-gradient-to-b from-topGray/80 to-bottomGray/90 text-white text-xl font-bold rounded-sm p-5 mt-10 hover:from-orange/80 hover:to-red-500/90"
              type="button"
              onClick={() => {
                randomizeClass();
              }}
            >
              RANDOMIZE
            </button>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-screen font-jura bg-hero bg-cover bg-center bg-fixed">
      <div className="flex-1 mb-5">
        <Header />

        {/* Randomize Button */}
        <div className="flex flex-col items-center px-20 mt-5 space-y-10">
          <button
            className="bg-gradient-to-b from-topGray/80 to-bottomGray/90 text-white text-xl font-bold rounded-sm p-5 hover:from-orange/80 hover:to-red-500/90"
            type="button"
            onClick={() => {
              randomizeClass();
            }}
          >
            RANDOMIZE
          </button>

          {/* Primary Weapon and Primary Attachments */}
          <div className="flex flex-col p-8 text-center text-white bg-gradient-to-b from-topGray/80 to-bottomGray/90 rounded-sm">
            <h1 className="text-2xl">
              <span className="font-bold">Primary:</span> {primaryWeapon}
            </h1>
            <div className="flex flex-col min-w-full text-center space-y-3 justify-center mt-3 items-stretch">
              {primaryAttachments.map((att) => (
                <h2
                  key={att.name}
                  className="font-bold text-l"
                >{`${att.name} - ${att.attachment} `}</h2>
              ))}
            </div>
          </div>

          {/* Secondary Weapon and Secondary Attachments */}
          <div className="flex flex-col p-8 text-center text-white bg-gradient-to-b from-topGray/80 to-bottomGray/90 rounded-sm">
            <h1 className="text-2xl">
              <span className="font-bold">Secondary:</span> {secondaryWeapon}
            </h1>
            <div className="flex flex-col min-w-full text-center space-y-3 justify-center mt-3 items-stretch">
              {secondaryAttachments.map((att) => (
                <h2
                  key={att.name}
                  className="font-bold text-l"
                >{`${att.name} - ${att.attachment} `}</h2>
              ))}
            </div>
          </div>

          {/* Tactical */}
          <div className="flex flex-col p-8 text-center text-white bg-gradient-to-b from-topGray/80 to-bottomGray/90 rounded-sm">
            <h1 className="text-2xl">
              <span className="font-bold">Tactical:</span> {tactical}
            </h1>
          </div>

          {/* Lethal */}
          <div className="flex flex-col p-8 text-center text-white bg-gradient-to-b from-topGray/80 to-bottomGray/90 rounded-sm">
            <h1 className="text-2xl">
              <span className="font-bold">Lethal:</span> {lethal}
            </h1>
          </div>

          {/* Field Upgrades */}
          <div className="flex flex-col p-8 text-center text-white bg-gradient-to-b from-topGray/80 to-bottomGray/90 rounded-sm">
            <h1 className="text-2xl">
              <span className="font-bold">Field Upgrades:</span>
            </h1>
            <h2 className="font-bold text-l">{fieldUpgrades[0]}</h2>
            <h2 className="font-bold text-l">{fieldUpgrades[1]}</h2>
          </div>

          {/* KillStreaks */}
          <div className="flex flex-col p-8 text-center text-white bg-gradient-to-b from-topGray/80 to-bottomGray/90 rounded-sm">
            <h1 className="text-2xl">
              <span className="font-bold">Killstreaks:</span>
            </h1>
            <h2 className="font-bold text-l">{killStreaks[0].streak}</h2>
            <h2 className="font-bold text-l">{killStreaks[1].streak}</h2>
            <h2 className="font-bold text-l">{killStreaks[2].streak}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
