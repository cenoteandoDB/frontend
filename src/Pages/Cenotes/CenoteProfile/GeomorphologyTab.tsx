import React from 'react'

export const GeomorphologyTab = () => {
  return (
    <div>
     <div className="content-microcuenca">
     <p className="title-color title-weight title-size">  Zona de captación de agua (Microcuenca)</p>
      <div className='measurement-item d-flex'>
      <div>  <img src="/src/assets/Images/geomorphology/microcuenca.png" alt="" width={100} /> </div>
        <div className='variable-name '>
        
          <p className='ml-3 text-info simple-text-size'>Tipo de microcuenca</p>
        </div>
        <div className='measurement-value'>
          <p className='simple-text-size'><strong>Volcán</strong></p>
        </div>
      </div>
    </div>
  </div>
  )
}
