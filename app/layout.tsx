import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cosy Coffi Cwtch Corner | A Sanctuary in Cardiff',
  description: 'A sanctuary from the South Wales rain. Enjoy locally roasted beans, fresh bara brith, and a warm hearth side.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=JetBrains+Mono:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#121315] text-[#F7F4EF] font-sans antialiased selection:bg-[#E5A93C] selection:text-[#121315]">
        {children}
      </body>
    </html>
  );
}