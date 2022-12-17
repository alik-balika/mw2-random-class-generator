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
  const [numAttachments, setNumAttachments] = useState(-1);
  const [overkillAlwaysOn, setOverkillAlwaysOn] = useState(false);

  const randomizeClass = () => {
    const perks = randomizePerks(overkillAlwaysOn);
    setPerks(perks);
    setTactical(randomizeTactical());
    setLethal(randomizeLethal());
    setFieldUpgrades(randomizeFieldUpgrades());
    setKillStreaks(randomizeKillStreaks());

    const copy = JSON.parse(JSON.stringify(allWeapons));

    let randomWeaponAndAttachments = randomizeWeapon(
      copy.primary,
      numAttachments
    );
    setPrimaryWeapon(randomWeaponAndAttachments[0]);
    setPrimaryAttachments(randomWeaponAndAttachments[1]);

    let secondaryWeaponClass = null;
    if (perks.includes("Overkill")) {
      secondaryWeaponClass = copy.primary;
    } else {
      secondaryWeaponClass = copy.secondary;
    }

    randomWeaponAndAttachments = randomizeWeapon(
      secondaryWeaponClass,
      numAttachments
    );
    setSecondaryWeapon(randomWeaponAndAttachments[0]);
    setSecondaryAttachments(randomWeaponAndAttachments[1]);
  };

  const onChangeNumAttachments = (event) => {
    setNumAttachments(event.target.value);
  };

  const onChangeOverkill = (event) => {
    console.log(event.target.checked);
    setOverkillAlwaysOn(event.target.checked);
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

            {/* Drop Down Menu for number of attachments */}
            <div className="flex flex-col mt-10 p-8 text-center text-white bg-gradient-to-b from-topGray/80 to-bottomGray/90 rounded-sm">
              <h1 className="p-2 max-w-lg text-xl text-center text-white font-bold">
                Number of attachments:
              </h1>
              <div className="relative w-full lg:max-w-sm">
                <select
                  onChange={onChangeNumAttachments}
                  className="w-full text-center p-2.5 text-gray-500 bg-white  border rounded-sm shadow-sm outline-none appearance-none focus:border-indigo-600"
                >
                  <option value={-1}>Random</option>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              {/* Checkbox for Overkill always on */}
              <div className="flex flex-row items-center justify-center mt-5">
                <label
                  class="form-check-label inline-block text-white"
                  for="flexCheckDefault"
                >
                  Overkill always on:
                </label>
                <input
                  class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left ml-2 cursor-pointer"
                  type="checkbox"
                  value={false}
                  checked={overkillAlwaysOn}
                  onChange={onChangeOverkill}
                />
              </div>
            </div>

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

          {/* Drop Down Menu for number of attachments */}
          <div className="flex flex-col mt-10 p-8 text-center text-white bg-gradient-to-b from-topGray/80 to-bottomGray/90 rounded-sm">
            <h1 className="p-2 max-w-lg text-xl text-center text-white font-bold">
              Number of attachments:
            </h1>
            <div className="relative w-full lg:max-w-sm">
              <select
                onChange={onChangeNumAttachments}
                className="w-full text-center p-2.5 text-gray-500 bg-white  border rounded-sm shadow-sm outline-none appearance-none focus:border-indigo-600"
              >
                <option value={-1}>Random</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>

            {/* Checkbox for Overkill always on */}
            <div className="flex flex-row items-center justify-center mt-5">
              <label
                class="form-check-label inline-block text-white"
                for="flexCheckDefault"
              >
                Overkill always on:
              </label>
              <input
                class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left ml-2 cursor-pointer"
                type="checkbox"
                value={false}
                checked={overkillAlwaysOn}
                onChange={onChangeOverkill}
              />
            </div>
          </div>

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

          {/* Perks */}
          <div className="flex flex-col p-8 text-center text-white bg-gradient-to-b from-topGray/80 to-bottomGray/90 rounded-sm">
            <h1 className="text-2xl">
              <span className="font-bold">Perks:</span>
            </h1>
            <div className="flex flex-col min-w-full text-center space-y-3 justify-center mt-3 items-stretch">
              {perks.map((perk) => (
                <h2 key={perk} className="font-bold text-l">
                  {perk}
                </h2>
              ))}
            </div>
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
