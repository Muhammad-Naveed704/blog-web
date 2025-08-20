'use client'

export default function SetupGuide() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg border border-red-200">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">⚠️ Setup Required</h1>
        <p className="text-gray-700">
          Your Supabase environment variables are not configured properly.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Quick Setup Steps:</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <strong>Create Supabase Project:</strong>
              <br />
              Go to{' '}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                supabase.com
              </a>{' '}
              and create a new project
            </li>
            <li>
              <strong>Get Your Credentials:</strong>
              <br />
              Go to Settings → API in your Supabase dashboard and copy:
              <ul className="ml-6 mt-2 list-disc">
                <li>Project URL</li>
                <li>anon/public key</li>
              </ul>
            </li>
            <li>
              <strong>Update Environment Variables:</strong>
              <br />
              Replace the values in <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code>:
              <pre className="bg-gray-800 text-green-400 p-3 rounded mt-2 text-sm overflow-x-auto">
              {`NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project.supabase.co
                NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
                NEXT_PUBLIC_SITE_URL=http://localhost:3000`}
              </pre>
            </li>
            <li>
              <strong>Set up Database:</strong>
              <br />
              Copy the SQL from <code className="bg-gray-200 px-2 py-1 rounded">src/lib/database.sql</code> and run it in your Supabase SQL Editor
            </li>
            <li>
              <strong>Restart the Development Server:</strong>
              <br />
              <code className="bg-gray-200 px-2 py-1 rounded">npm run dev</code>
            </li>
          </ol>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Need Help?</h3>
          <p className="text-blue-700">
            Check the{' '}
            <code className="bg-blue-200 px-2 py-1 rounded">QUICK_SETUP.md</code> and{' '}
            <code className="bg-blue-200 px-2 py-1 rounded">README.md</code> files for detailed instructions.
          </p>
        </div>
      </div>
    </div>
  )
}
