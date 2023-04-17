import React from "react";

export const Search = ({ data }) => {
  return (
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">CodItem</th>
          <th scope="col">Referencia</th>
          <th scope="col">Descripcion</th>
        </tr>
      </thead>
      <tbody>
        {data.map((element) => (
          <tr>
            <th scope="row">{element[0]}</th>
            <td>{element[1]}</td>
            <td>{element[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
