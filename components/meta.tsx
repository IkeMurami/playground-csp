import Head from 'next/head'
import { FC } from 'react'

type TProps = {
    csp?: string
}

const Meta: FC<TProps> = ({csp}) => {
    return (
        <Head>
            <meta 
                name="description"
                content={`Your CSP playground`}
            />
            {csp && <meta
                http-equiv="Content-Security-Policy"
                content={csp}
            />}
        </Head>
    )
}

export default Meta;