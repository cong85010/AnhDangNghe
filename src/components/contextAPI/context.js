import React from 'react'

const MusicPlayerContext = React.createContext({})

const MusicProvider = MusicPlayerContext.Provider
const MusicConsumer = MusicPlayerContext.Consumer
export  {MusicPlayerContext, MusicProvider}