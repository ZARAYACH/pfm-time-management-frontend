import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Non Trouvée</h1>
      <p className="mb-8">La page que vous recherchez nexiste pas.</p>
      <Link href="/public" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
        Retour à laccueil
      </Link>
    </div>
  );
};

export default NotFoundPage;