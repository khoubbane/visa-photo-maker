import { visaData } from '../../data/visas';
import { notFound } from 'next/navigation';
import PhotoCropper from './PhotoCropper';

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. Zidna hadi bach n-forciw Next.js y-générer kolchi statique l-SEO bla mochkil dyal Suspense
export const dynamicParams = false;

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 dark:bg-gray-900">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Free {visa.title} Photo Maker
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {visa.description}
        </p>
      </div>
      
      <PhotoCropper targetWidth={visa.width} targetHeight={visa.height} targetAspect={visa.aspect} />
    </div>
  );
}