
// client component - still prerendered before being sent to client 
'use client'

import dynamic from 'next/dynamic'
import { Provider } from 'react-redux'
import store from '../../store'

const App = dynamic(() => import('../../App'), { ssr: false }) // disables prerendering 

export function ClientOnly() {
    return (
        <Provider store={store}>
            <App />
        </Provider>

    )
}