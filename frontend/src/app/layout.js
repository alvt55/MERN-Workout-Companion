

export const metadata = {
    title: 'React App',
    description: 'Web site created with Next.js.',
}

export default function RootLayout({ children }) {
    return (

        <html lang="en">
            <head>
                {/* <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> */}
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Web site created using create-react-app"
                />
                {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}

                <title>React App</title>
            </head>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root">{children}</div>

            </body>
        </html>

    )
}