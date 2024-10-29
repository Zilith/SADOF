import { useState } from "react";

const ReclamationTable = () => {
  const [reclamationData, setreclamationData] = useState();

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo Relamación</th>
              <th>Localización</th>
              <th>Fecha Reclamación</th>
              <th>Alerta Fraude</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* map on reclamationData */}
            <tr>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>
                <button>Detalle</button>
              </td>
            </tr>
            <tr>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>
                <button>Detalle</button>
              </td>
            </tr>
            <tr>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>
                <button>Detalle</button>
              </td>
            </tr>
            <tr>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>
                <button>Detalle</button>
              </td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReclamationTable;
