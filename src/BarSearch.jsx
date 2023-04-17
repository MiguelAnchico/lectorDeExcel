import React, { useEffect, useState } from "react";
import "./BarSearch.css";
import closeIcon from "./assets/cerrar.png";

export const BarSearch = ({ filtros }) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const agregarFiltro = (e) => {
    e.preventDefault();
    setData([...data, value]);
    setValue("");
  };

  const deleteLabel = (index) => {
    let etiquetas = [...data];
    etiquetas.splice(index, 1);

    setData(etiquetas);
  };

  useEffect(() => {
    if (filtros) {
      filtros(data);
    }
  }, [data]);

  return (
    <div className="barsearch">
      <form onSubmit={agregarFiltro}>
        <b>La descripcion contiene:</b>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Etiqueta"
        />
      </form>
      <div className="contenedorEtiquetas">
        {data?.map((etiqueta, index) => (
          <label className="etiqueta" key={index}>
            {etiqueta}{" "}
            <img src={closeIcon} onClick={(e) => deleteLabel(index)} />
          </label>
        ))}
      </div>
    </div>
  );
};
