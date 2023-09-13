import styles from './index.module.css'

import Meta from "../components/meta"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import PGSetting from "../components/setting/setting"
import { PGList } from "../components/playground-list/playground-list"
import { useEffect, useRef, useState } from 'react'
import { TState } from '../utils/types'
import { INTERNAL_STATE, PLAYGROUND_IFRAME_ID, URL_PLAYGROUND, initState } from '../utils/constants'
import { useRouter } from 'next/router'
import PGPwn from '../components/playground-pwn/playground-pwn'
import LocalStorage from '../utils/localStorage'

export default function Index() {

    const [isPlaygroundView, setPlaygroundView] = useState(false)
    const [urlPlayground, setUrlPlayground] = useState(URL_PLAYGROUND)
    const [state, setState] = useState<TState>(initState);
    const iframeRef = useRef(null)
    const router = useRouter()

    useEffect(() => {
        setState(LocalStorage.get(INTERNAL_STATE, initState))
    }, [])

    useEffect(() => {
        console.log(`${JSON.stringify(state)}`)
        LocalStorage.add(INTERNAL_STATE, state)  // Save state to local storage
    }, [state])

    useEffect(() => {
        console.log(router)
        if (!router.asPath.includes('#playground')) {
            setPlaygroundView(false)
            return
        }
        const query = {
            name: router.query.name as string,
            csp: router.query.csp as string,
        }
        
        setUrlPlayground(`${router.basePath}/${URL_PLAYGROUND}?${new URLSearchParams(query)}`)
        setPlaygroundView(true)
    }, [router.query])

    const backButtonHandler = () => {
        router.push('/')
    }

    const constructorNode = <>
        <PGSetting state={state} setState={setState} />
        <PGList state={state} setState={setState} />
    </>

    const pgViewNode = <>
        <div className={styles.container}>
            <div className={styles.container1}>
                <PGPwn iframeRef={iframeRef} />
                <iframe ref={iframeRef} src={urlPlayground} width={'500px'}></iframe>
            </div>
            <button className={styles['btn-back']} onClick={backButtonHandler}>Back to home</button>
        </div>
    </>

    return (
        <>
            <Meta />
            <div className={styles.root}>
                <Header />
                <main className={styles.setting}>
                    { 
                        !isPlaygroundView && constructorNode || pgViewNode
                    }
                </main>
                <Footer />
            </div>
        </>
    )
}