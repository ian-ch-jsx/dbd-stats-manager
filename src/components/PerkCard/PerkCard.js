import './PerkCard.css';

export default function PerkCard({ name, image }) {
  return (
    <div className="perk-card">
      <img alt={name} src={`${process.env.PUBLIC_URL}/assets/${image}`} />
      <p className="name">{name}</p>
      {/* <span>
        <select value={selectedPerks} onChange={(e) => setSelectedPerks(e.target.value)}>
          <option>Select...</option>
          {perks.map((perk) => (
            <option key={perk}>{perk.name}</option>
          ))}
        </select>
      </span> */}
    </div>
  );
}
