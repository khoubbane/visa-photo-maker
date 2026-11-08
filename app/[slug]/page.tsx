import { visaData } from '../../data/visas';
import { notFound } from 'next/navigation';
import PhotoCropper from './PhotoCropper';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const countryCode = slug.replace('-visa-photo', '');
  const visa = visaData.find((v) => v.country === countryCode);
  
  if (!visa) return { title: 'Not Found' };

  return {
    title: `Free ${visa.title} Photo Maker & Resizer Online`,
    description: visa.description,
    keywords: `${visa.title} photo maker, ${visa.country} visa picture size, resize photo for ${visa.title} free`,
  };
}

export async function generateStaticParams() {
  return visaData.map((visa) => ({
    slug: `${visa.country}-visa-photo`,
  }));
}

export default async function VisaPage({ params }: Props) {
  const { slug } = await params;
  const countryCode = slug.replace('-visa-photo', '');
  const visa = visaData.find((v) => v.country === countryCode);
  
  if (!visa) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 dark:bg-gray-900 relative">
      
      {/* Bouton "Back to Home" */}
      <div className="w-full max-w-4xl mx-auto flex justify-start mb-6">
        <Link href="/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 bg-white hover:bg-blue-50 border border-gray-200 rounded-lg shadow-sm transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to All Countries
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Free {visa.title} Photo Maker
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {visa.description}
        </p>
      </div>
      
      {/* L-Outil dyalna */}
      <PhotoCropper targetWidth={visa.width} targetHeight={visa.height} targetAspect={visa.aspect} />

      {/* SEO Content: FAQ Dynamique */}
      <div className="max-w-3xl w-full mt-16 text-left bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions about {visa.title} Photos
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              What is the exact photo size required for {visa.title}?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              The official government photo size required for a {visa.title} is exactly <strong>{visa.width}x{visa.height} pixels</strong>. Our free online tool automatically crops, resizes, and formats your image to meet these strict requirements without losing quality.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Can I take my {visa.country.toUpperCase()} visa photo at home with a smartphone?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes, absolutely! You can take your picture against a plain white or off-white background using your smartphone. Just make sure your face is well-lit, look straight into the camera, and upload the photo here. Our tool will handle the {visa.width}x{visa.height} px formatting.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Is it safe to upload my photo to this website?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. This {visa.title} photo maker operates 100% on the client-side (directly in your browser). Your personal photos are <strong>never</strong> uploaded, stored, or saved on any external servers, ensuring complete privacy and security for your documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
