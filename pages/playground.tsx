import styles from './index.module.css'

import Meta from "../components/meta"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'


export default function Playground() {
    const [hrefPayload, setHrefPayload] = useState('')
    const [jsPayload, setJSPayload] = useState('123')
    const [contentPayload, setContentPayload] = useState('')

    const router = useRouter()
    const query = new URLSearchParams(router.asPath.replaceAll('/playground?', ''))
    const name = query.get('name')
    const csp = query.get('csp')
    const mainRef = useRef(null)

    useEffect(() => {
        console.log(`(iframe) Playground: ${csp}, ${name}`)
        window.addEventListener('message', (e) => {
            console.log(e.data)
            const href = e.data.hrefPayload
            const js = e.data.jsPayload
            const content = e.data.contentPayload

            setHrefPayload(href)
            setJSPayload(js)
            setContentPayload(content)
        })
    }, [])

    useEffect(() => {
        // console.log(`Update internal state: ${hrefPayload}, ${jsPayload}, ${contentPayload}`)
    }, [hrefPayload, jsPayload, contentPayload])

    useEffect(() => {

        const old = document.getElementById('bad-script')
        
        if (old) {
            document.body.removeChild(old)
        }

        const customScript = document.createElement('script')
        customScript.id = "bad-script"
        customScript.innerHTML = `console.log("Hello from Disney Land +" + '${jsPayload}');`     
        document.body.appendChild(customScript)
    }, [jsPayload])

    return (
        <>
            <Meta csp={csp as string} />
            <div className={styles.root}>
                <Header />
                <main className={styles.setting}>
                    <a href={hrefPayload}>Go to Sydney</a>
                    <div dangerouslySetInnerHTML={{ __html: contentPayload}}></div>
                </main>
                <Footer />
            </div>
        </>
    )
}