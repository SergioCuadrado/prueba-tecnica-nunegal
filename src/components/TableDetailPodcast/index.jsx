import { Link } from 'react-router-dom'

import './styles.css'

export const TableDetailPodcast = ({ details }) => {
  return (
    <section>
      <div>
        <h2>Episodes: {details.length}</h2>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {details.length > 0
              ? details.map(detail => (
                <tr key={detail.id}>
                  <td><Link to='/'>{detail.title}</Link></td>
                  <td>{detail.date}</td>
                  <td>{detail.duration}</td>
                </tr>
              ))
              : null}
          </tbody>
        </table>
      </div>

    </section>

  )
}
