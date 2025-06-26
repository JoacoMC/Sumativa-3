export default function Post({ titulo, descripcion, importancia, onDelete }) {
  function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function post_it(importancia) {
    const rotaciones = ["rotate-1", "rotate-2", "rotate-3"];
    const index = numeroAleatorio(0, rotaciones.length);
    const color = importancia === "on" ? "red-bg" : "lazur-bg";
    return `${rotaciones[index]} ${color}`;
  }

  return (
    <div className={`${post_it(importancia)} position-relative p-3 postit`}>
      <button
        onClick={onDelete}
        className="btn-close position-absolute top-0 end-0 m-2"
        aria-label="Close"
      ></button>
      <h4>{titulo}</h4>
      <p>{descripcion}</p>
    </div>
  );
}



    