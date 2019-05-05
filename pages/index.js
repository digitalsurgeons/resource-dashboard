import workloads from '../data.json'

function Index() {
  return (
    <div>
      <h1 className="title">Resourcing Dashboard</h1>
      <div className="grid">
        <div className="grid__col">
          <div className="grid__cell" />
          {Object.keys(workloads[Object.keys(workloads)[0]]).map(dept => {
            return <div className="grid__cell grid__cell--heading">{dept}</div>
          })}
        </div>
        {Object.keys(workloads).map(week => {
          return <Column week={week} />
        })}
      </div>
      <style jsx global>{`
        body {
          font-family: Menlo;
          padding: 20px;
        }

        .grid {
          border-left: solid 1px #000;
          border-top: solid 1px #000;
          display: inline-flex;
          margin-top: 20px;
        }

        .grid__col {
          border-right: solid 1px #000;
          width: 180px;
        }

        .grid__cell {
          align-items: center;
          border-bottom: solid 1px #000;
          display: flex;
          padding: 20px;
          height: 20px;
        }

        .grid__cell--heading {
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

function Column({ week }) {
  return (
    <div className="grid__col">
      <div className="grid__cell grid__cell--heading">{week}</div>
      {Object.keys(workloads[week]).map(dept => {
        return (
          <div className="grid__cell">{`${workloads[week][dept].total}hrs / ${
            workloads[week][dept].resourced
          }%`}</div>
        )
      })}
    </div>
  )
}

export default Index
