export default function HeroSwitch() {
  return (
    <div className="heroswitch" id="heroswitch" role="group" aria-label="Escolher versão do hero">
      <span className="heroswitch__lbl">Hero</span>
      <button data-go="a">A</button>
      <button data-go="b" className="active">B</button>
      <button data-go="c">C</button>
    </div>
  );
}
