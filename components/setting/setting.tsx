import { FC, useRef, useState } from 'react'
import { TState } from '../../utils/types'
import styles from './setting.module.css'
import { TEXT_CSP_SETTING, TEXT_PLAYGROUND_NAME } from '../../utils/constants'

type TInputProps = {
    value: string
    setValue: any
}

const ConfigName: FC<TInputProps> = ({value, setValue}) => {
    return (
        <div className={styles['config-name']}>
            <p>Playground name</p>
            <input type="text" value={value} className={styles['input-payload']} onChange={e => setValue(e.target.value)} />
        </div>
    )
}

const CSPSetting: FC<TInputProps> = ({value, setValue}) => {
    return (
        <div className={styles['csp-setting']}>
            <p>Setup CSP</p>
            <textarea value={value} onChange={e => setValue(e.target.value)} className={styles['input-payload']} name="csp-setting" cols={30} rows={10}></textarea>
        </div>
    )
}

type TProps = {
    state: TState
    setState: any
}

const PGSetting: FC<TProps> = ({state, setState}) => {

    const [name, setName] = useState(TEXT_PLAYGROUND_NAME)
    const [cspSetting, setCSPSetting] = useState(TEXT_CSP_SETTING)

    const createPlaygroundHandler = () => {
        if (name && cspSetting) {
            console.log(`Create pg: ${name} ${cspSetting}`)
            
            setState({
                playgrounds: [...state.playgrounds.filter((item) => item.name !== name), {name, csp: cspSetting}]
            })
        }
    }

    return (
        <div className={styles.setting}>
            <ConfigName value={name} setValue={setName} />
            <CSPSetting value={cspSetting} setValue={setCSPSetting} />
            <button className={styles['btn-create']} onClick={createPlaygroundHandler}>Create playground</button>
        </div>
    )
}

export default PGSetting;