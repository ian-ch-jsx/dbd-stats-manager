import './Main.css';
import SurvivorRandomizer from '../../views/Randomizer/SurvivorRandomizer';
import KillerRandomizer from '../../views/Randomizer/KillerRandomizer';

export default function Main({ killer = false }) {
  if (killer)
    return (
      <div className="main">
        <KillerRandomizer />
      </div>
    );
  return (
    <div className="main">
      <SurvivorRandomizer />
    </div>
  );
}
