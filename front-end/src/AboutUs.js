import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // fetch data from the API about this site
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        setAboutData(response.data.about)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  return (
    <>
      <div className="AboutUs">
        <h1>About Us</h1>
        {error && <p className="error">{error}</p>}
        {!loaded && <p>Loading...</p>}
        {aboutData && (
          <div className="about-content">
            <img src={aboutData.imageUrl} alt={aboutData.name} className="profile-image" />
            <h2>{aboutData.name}</h2>
            <p className="bio">{aboutData.bio}</p>
            <p className="education"><strong>Education:</strong> {aboutData.education}</p>
            <div className="interests">
              <strong>Interests:</strong>
              <ul>
                {aboutData.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AboutUs