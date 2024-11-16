import Navbar from '../components/Navbar';


export default function RootLayout({children}){
    return (
        <html>    
            <body>
                <Navbar/>                
                {children}
            </body>
        </html>
    );
  }