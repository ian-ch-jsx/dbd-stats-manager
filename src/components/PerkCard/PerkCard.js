import './PerkCard.css';

export default function PerkCard({ name, image }) {
  return (
    <>
      <p className="name">{name}</p>
      <img alt={name} src={`${process.env.PUBLIC_URL}/assets/${image}`} />
    </>
  );
}
