import { useState, useContext } from "react";
import AppContext from "../AppContext";
import StatControls from "./StatControls";
import AncestryBonus from "./AncestryBonus";

function Stat({ name }) {
  const { setPoints, scoreCosts } = useContext(AppContext);

  const [score, setScore] = useState(10);
  const [ancestryBonus, setAncestryBonus] = useState(0);

  const finalScore = score + Number(ancestryBonus);
  const modifier = Math.floor((finalScore - 10) / 2);

  const handleIncreaseScore = () => {
    setScore((current) => current + 1);
    setPoints((current) => current - scoreCosts[score + 1]);
  };

  const handleDecreaseScore = () => {
    setScore((current) => current - 1);
    setPoints((current) => current + scoreCosts[score]);
  };

  const handleChangeAncestryBonus = (newValue) => {
    if (isNaN(Number(newValue))) {
      setAncestryBonus(0);
      return;
    }
    if (newValue.length > 1) {
      setAncestryBonus(newValue.slice(0, 1));
      return;
    }
    setAncestryBonus(newValue);
  };

  return (
    <tr className="border-b border-gray-700">
      <td className="p-2 md:p-3">{name}</td>
      <StatControls
        score={score}
        onIncreaseScore={handleIncreaseScore}
        onDecreaseScore={handleDecreaseScore}
      />
      <AncestryBonus
        ancestryBonus={ancestryBonus}
        onChange={(e) => handleChangeAncestryBonus(e.target.value)}
      />
      <td className="p-3 text-center">
        {finalScore} ({modifier > 0 ? `+${modifier}` : modifier})
      </td>
    </tr>
  );
}

export default Stat;
