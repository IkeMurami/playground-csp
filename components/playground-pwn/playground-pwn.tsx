import { FC, useEffect, useState } from 'react'
import styles from './playground-pwn.module.css'
import { PLAYGROUND_IFRAME_ID } from '../../utils/constants'


type TInputProps = {
    value: string
    setValue: any
}

const HrefPayload: FC<TInputProps> = ({value, setValue}) => {
    return (
        <div className={styles['payload-href']}>
            <p>href payload</p>
            <input value={value} placeholder={`javascript:alert(document.domain)`} onChange={e => setValue(e.target.value)} type="text" className={styles['input-payload']} />
        </div>
    )
}
const JSPayload: FC<TInputProps> = ({value, setValue}) => {
    return (
        <div className={styles['payload-js']}>
            <p>js payload</p>
            <input value={value} placeholder={`4');alert(document.domain+'`} onChange={e => setValue(e.target.value)} type="text" className={styles['input-payload']} />
        </div>
    )
}
const ContentPayload: FC<TInputProps> = ({value, setValue}) => {
    return (
        <div className={styles['payload-content']}>
            <p>content payload</p>
            <input value={value} placeholder={`<img src=x onerror=alert(document.domain)>`} onChange={e => setValue(e.target.value)} type="text" className={styles['input-payload']} />
        </div>
    )
}

type TProps = {
    iframeRef: any
}

const PGPwn: FC<TProps> = ({iframeRef}) => {

    const [hrefPayload, setHrefPayload] = useState('')
    const [jsPayload, setJSPayload] = useState('')
    const [contentPayload, setContentPayload] = useState('')

    useEffect(() => {
        if (!iframeRef.current) return
        iframeRef.current.contentWindow.postMessage(
            {hrefPayload, jsPayload, contentPayload},
            '*'
        )
    }, [hrefPayload, jsPayload, contentPayload])

    return (
        <div className={styles.setting}>
            <HrefPayload value={hrefPayload} setValue={setHrefPayload} />
            <JSPayload value={jsPayload} setValue={setJSPayload} />
            <ContentPayload value={contentPayload} setValue={setContentPayload} />
        </div>
    )
}

export default PGPwn;