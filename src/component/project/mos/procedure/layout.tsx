import React, { ReactNode } from 'react'

const ProcedureLayout = (props: {
    desc: string,
    equipment: ReactNode,
    circuit: ReactNode,
}) => {
  return (
    <div>
        <p>{props.desc}</p>
        <h2>I. Equipment used</h2>
        {props.equipment}
        <h2>II. Circuit connection</h2>
        {props.circuit}
    </div>
  )
}

export default ProcedureLayout