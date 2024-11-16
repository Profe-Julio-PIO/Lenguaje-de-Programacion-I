import Link from 'next/link';

export default function RootLayout({children}){
  return (<html>
    <head>
      <title>My App</title>
    </head>
    <body>
      <nav>
        <h1>Barra de navegación</h1>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/programacion">Lenguajes de programación</Link></li>
          <li><Link href="/programacion/funcional">Lenguajes de programación funcional</Link></li>
        </ul>
      </nav>
      {children}
    </body>
  </html>
  );
}
