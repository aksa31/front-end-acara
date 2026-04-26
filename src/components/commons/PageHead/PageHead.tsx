import Head from "next/head";

interface PropType {
    title?: string;
}

const PageHead = (props: PropType) => {
    const { title = "Acara" } = props;
    return (
        <Head>
            <title>{title}</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
    )
}

export default PageHead;

