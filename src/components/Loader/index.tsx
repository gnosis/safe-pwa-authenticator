import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const centerStyle = {
  margin: 'auto 0',
}

const Loader = () => <CircularProgress style={centerStyle} size={60} />

export default Loader
