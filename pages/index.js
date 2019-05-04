import workloads from '../data.json'

function Index() {
  return (
    <div>
      <h1>Resourcing Dashboard</h1>
      <div className="grid">
        <div className="grid__col">
          <div className="grid__cell">department</div>
          {Object.keys(workloads[Object.keys(workloads)[0]]).map(dept => {
            return <div className="grid__cell">{dept}</div>
          })}
        </div>
        {Object.keys(workloads).map(week => {
          return <Column week={week} />
        })}
      </div>
    </div>
  )
}

function Column({ week }) {
  return (
    <div className="grid__col">
      <div className="grid__cell">{week}</div>
      {Object.keys(workloads[week]).map(dept => {
        return <div className="grid__cell">{workloads[week][dept].total}</div>
      })}
    </div>
  )
}

export default Index
