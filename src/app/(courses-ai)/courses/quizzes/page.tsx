import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Disable static rendering for this page if quizzes change frequently

export default async function QuizzesPage() {
  // Fetch quizzes from your Supabase database
  // Replace 'quizzes' with the actual table name if different
  const { data: quizzes, error } = await supabase.from("quizzes").select("*");

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Quizzes</h1>
        <p className="text-red-500">Error fetching quizzes: {error.message}</p>
        <p className="text-sm text-gray-500 mt-4">
          Make sure your Supabase environment variables are set correctly in
          .env.local
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Available Quizzes</h1>

      {!quizzes || quizzes.length === 0 ? (
        <p>No quizzes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              {/* Adjust these fields based on your actual database schema */}
              <h2 className="text-xl font-semibold mb-2">
                {quiz.title || `Quiz ${quiz.id}`}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {quiz.description || "No description available."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
