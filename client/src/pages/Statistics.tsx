import React, { useEffect } from 'react'

const Statistics = () => {

  useEffect(() => {
    document.title = "Statistics | TYD";
  }, []);

  return (
    <>
      <div>Statistics</div>
    </>
  )
}

export default Statistics