
import ClientOnly from '@Components/Utils/ClientOnly';

export const Explorer = ({url}: {url: string}):JSX.Element =>{
    return <>
        <ClientOnly>
            <iframe
                sandbox={'allow-same-origin allow-scripts'}
                style={{ width: '100vw', height: '100vh' }}
                src={url}
            />
        </ClientOnly>
    </>
}