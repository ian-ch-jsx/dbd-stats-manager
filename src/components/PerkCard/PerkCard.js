import './PerkCard.css';

export default function PerkCard({ name, image }) {
  return (
    <>
      <img alt={name} src={`${process.env.PUBLIC_URL}/assets/${image}`} />
      <p className="name">{name}</p>
    </>
  );
}
