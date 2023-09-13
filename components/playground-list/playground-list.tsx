import { FC } from 'react'
import Link from 'next/link'
import styles from './playground-list.module.css'
import { TState } from '../../utils/types'
import LocalStorage from '../../utils/localStorage'
import { INTERNAL_STATE, initState } from '../../utils/constants'

type TItemProps = {
    name: string,
    csp: string
}

const PGItem: FC<TItemProps> = ({name, csp}) => {

    const query = new URLSearchParams({name, csp})

    return (
        <li className={styles.item}>
            <Link className={styles.link} href={`/?${query}#playground`}>{name}</Link>
        </li>
    )
}

type TProps = {
    state: TState
    setState: any
}

export const PGList: FC<TProps> = ({state, setState}) => {

    const clearPGListHandler = () => {
        setState(initState)
    }

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                { state.playgrounds.map((item, index) => <PGItem key={index} name={item.name} csp={item.csp} />) }
            </ul>
            <button className={styles['btn-clear']} onClick={clearPGListHandler}>Clear</button>
        </div>
    )
}