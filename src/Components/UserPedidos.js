import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../config';

var baseUrl = global.config.i18n.route.url;
var token = localStorage.getItem('token');
var id_usuario = localStorage.getItem('idUsuario');

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Token ${token}`
};




const UserPedidos = () => {
  const [listOrder, setlistOrder] = useState([]);


  useEffect(() => {
    try {
        axios.get(baseUrl+'/orders/api/get_list_customer/' + id_usuario + '/', { headers })
        .then((response) => {
          console.log(response);
          setlistOrder(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.log(' . ', error);
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setlistOrder])

  return (
    <>
      <div className='row'>
        <div className='col-12' style={{ padding: 20 }}>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre de producto</th>
                    <th>Fecha de compra</th>
                    <th>Fecha de entrega</th>
                    <th>Estatus</th>
                </tr>
                </thead>
            <tbody>
            {listOrder.map((item) => (
              <td>
                    {
                    (item) === '' 
                    ? <img style={{width:50}} alt='' src="https://obsbucket.s3.amazonaws.com/assets/images/img-default.png"></img>
                    : <img style={{width:50}} alt='' src={'https://obsbucket.s3.amazonaws.com/'+item[1][0].image}></img>
                    }
              </td>
            ))}
            </tbody>
          </table>
        </div>

      </div>



    </>
  )

}
export default UserPedidos;