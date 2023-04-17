import { useEffect, useState } from "react";
import { read, writeFileXLSX } from "xlsx";
import "./App.css";
import { Search } from "./Search";
import { BarSearch } from "./BarSearch";

function App() {
  const [data, setData] = useState([]);
  const [arraySearch, setArraySearch] = useState([]);
  const [filtros, setFiltros] = useState([]);

  const handleFileAsync = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = read(data);

    /* DO SOMETHING WITH workbook HERE */
    const ws = workbook.Sheets[workbook.SheetNames[0]];

    let array = [];
    let json = {};
    let i = 0;
    for (let clave in ws) {
      if (clave[0] == "A" || clave[0] == "B" || clave[0] == "K") {
        json[i] = ws[clave]["v"];
        i++;
      }
      if (clave[0] == "K") {
        array.push(json);
        json = {};
        i = 0;
      }
    }
    array.shift();
    setData(array);
  };

  useEffect(() => {
    if (data) {
      setArraySearch(
        data.filter((registro) => {
          let filtrados = [];

          filtros.map((etiqueta) => {
            if (!registro[2].toLowerCase().includes(etiqueta.toLowerCase()))
              filtrados.push(etiqueta);
          });

          return filtrados.length > 0 ? false : true;
        })
      );
    }
  }, [data, filtros]);

  return (
    <div className="App">
      {data.length > 0 ? (
        <>
          <div>
            <h3>Cambiar excel</h3>
            <input type="file" onChange={handleFileAsync}></input>
          </div>
          <BarSearch filtros={setFiltros} />
          <Search data={arraySearch} />
        </>
      ) : (
        <>
          <h1>Ingrese el excel del inventario</h1>
          <input type="file" onChange={handleFileAsync}></input>
        </>
      )}
    </div>
  );
}

export default App;
